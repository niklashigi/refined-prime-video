// Based on:
// https://github.com/bfred-it/webext-options-sync

type ChangeListener<Settings> = (settings: Settings) => void

interface Config<Settings> {
  defaults?: Settings
  migrations?: Array<(settings: any, defaults: any) => void>
}

export default class SettingsStore<Settings> {

  public static migrations = {
    removeUnused(settings, defaults) {
      for (const key of Object.keys(settings)) {
        if (!(key in defaults)) {
          delete settings[key]
        }
      }
    },
  }

  public cache: Settings
  private storageName: string
  private changeListeners = new Set<ChangeListener<Settings>>()

  constructor(storageName = 'settings') {
    this.storageName = storageName
  }

  public async setup(config: Config<Settings>) {
    config = {
      defaults: {} as Settings,
      migrations: [],
      ...config,
    }

    await this.applyConfig(config)
    return this.cache
  }

  public getAll() {
    return browser.storage.sync.get(this.storageName)
      .then(keys =>  keys[this.storageName] || {})
      .then(this.parseNumbers)
  }

  public async set(newSettings) {
    const settings = await this.getAll()
    this.setAll({ ...settings, ...newSettings })
  }

  public setAll(newSettings) {
    return browser.storage.sync.set({
      [this.storageName]: newSettings,
    }).then(() => {
      this.cache = newSettings
      this.applyNewSettings()
    })
  }

  public connectForm(form: HTMLFormElement) {
    form.addEventListener('input', e => this.handleFormUpdates(e))
    form.addEventListener('change', e => this.handleFormUpdates(e))
  }

  public onChange(listener: ChangeListener<Settings>) {
    this.changeListeners.add(listener)
    listener(this.cache)
  }

  private async applyConfig(config) {
    const settings = {
      ...config.defaults,
      ...(await this.getAll()),
    }

    console.info('[RPV] Loaded settings:', settings)
    if (config.migrations.length > 0) {
      config.migrations.forEach(migrate => migrate(settings, config.defaults))
    }

    await this.setAll(settings)
  }

  private applyNewSettings() {
    for (const listener of this.changeListeners) {
      listener(this.cache)
    }
  }

  private handleFormUpdates({target}) {
    const el = target as HTMLInputElement

    const {name} = el
    if (!name || !el.validity.valid) return

    const value = el.type === 'checkbox' ? el.checked : el.value
    const change = { [name]: value }
    console.info('[RPV] Saving change to settings:', change)
    this.set(change)
  }

  private parseNumbers(settings) {
    for (const name of Object.keys(settings)) {
      if (settings[name] === String(Number(settings[name]))) {
        settings[name] = Number(settings[name])
      }
    }
    return settings
  }

}
