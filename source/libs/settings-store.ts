// Based on:
// https://github.com/bfred-it/webext-options-sync

type ChangeListener<Settings> = (settings: Settings) => void

interface Config<Settings> {
  defaults: Settings
  migrations: Array<(settings: any, defaults: any) => void>
}

export default class SettingsStore<Settings> {

  public static migrations = {
    removeUnused(settings: any, defaults: any) {
      for (const key of Object.keys(settings)) {
        if (!(key in defaults)) {
          delete settings[key]
        }
      }
    },
  }

  private cache: Settings | undefined
  private changeListeners = new Set<ChangeListener<Settings>>()

  constructor(private storageName: string) {
    this.storageName = storageName
  }

  public async setup(config: Config<Settings>): Promise<void> {
    await this.applyConfig(config)

    browser.storage.onChanged.addListener((changes, areaName) => {
      if (areaName !== 'sync' || !changes[this.storageName]) return

      const newSettings = changes[this.storageName].newValue

      for (const listener of this.changeListeners) listener(newSettings)
      this.cache = newSettings
    })

    for (const listener of this.changeListeners) listener(this.cache!)
  }

  public async getAll(): Promise<Settings> {
    const storage = await browser.storage.sync.get(this.storageName)

    return storage[this.storageName] as any
  }

  public async setAll(newSettings: Settings): Promise<void> {
    await browser.storage.sync.set({
      [this.storageName]: newSettings as any,
    })

    this.cache = newSettings
  }

  public onChange(listener: ChangeListener<Settings>): void {
    this.changeListeners.add(listener)
    if (this.cache) listener(this.cache)
  }

  private async applyConfig(config: Config<Settings>): Promise<void> {
    const settings = {
      ...config.defaults,
      ...(await this.getAll()),
    }

    for (const migrate of config.migrations) migrate(settings, config.defaults)

    console.info('[RPV] Loaded settings:', settings)
    await this.setAll(settings)
  }

}
