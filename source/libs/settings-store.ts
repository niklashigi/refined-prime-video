// Based on:
// https://github.com/bfred-it/webext-options-sync

type ChangeListener<Settings> = (settings: Settings) => void

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

  private forms = new Set<HTMLFormElement>()
  private updatingForms = new Set<HTMLFormElement>()
  private formUpdated = false

  constructor(storageName = 'settings') {
    this.storageName = storageName
  }

  public async setup(defs) {
    defs = {
      defaults: {},
      migrations: [],
      ...defs,
    }

    if (browser.runtime.onInstalled) {
      browser.runtime.onInstalled.addListener(() => this.applyDefinition(defs))
    } else {
      this.applyDefinition(defs)
    }

    return this.cache = await this.getAll()
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
    this.cache = newSettings
    return browser.storage.sync.set({
      [this.storageName]: newSettings,
    })
  }

  public connectForm(form: HTMLFormElement) {
    this.forms.add(form)

    form.addEventListener('input', e => this.handleFormUpdates(e))
    form.addEventListener('change', e => this.handleFormUpdates(e))

    browser.storage.onChanged.addListener((changes, namespace) => {
      if (namespace === 'sync') {
        for (const key of Object.keys(changes)) {
          if (key === this.storageName) {
            if (this.formUpdated) {
              this.formUpdated = false
              return
            }
            const {newValue} = changes[key]
            this.update(newValue)
            return
          }
        }
      }
    })
  }

  public onChange(listener: ChangeListener<Settings>) {
    this.changeListeners.add(listener)
    listener(this.cache)
  }

  private async applyDefinition(defs) {
    const settings = {
      ...defs.defaults,
      ...(await this.getAll()),
    }

    console.group('Appling definitions')
    console.info('Current settings:', settings)
    if (defs.migrations.length > 0) {
      console.info('Running', defs.migrations.length, 'migrations')
      defs.migrations.forEach(migrate => migrate(settings, defs.defaults))
    }
    console.groupEnd()

    this.setAll(settings)
  }

  private update(changes = {}, updateForms = true) {
    this.cache = { ...this.cache as any, ...changes }
    for (const listener of this.changeListeners) {
      listener(this.cache)
    }
    if (updateForms) {
      this.updateForms(changes)
    }
  }

  private updateForms(settings: object) {
    for (const form of this.forms) {
      this.updateForm(form, settings)
    }
  }

  private updateForm(form, settings) {
    if (this.updatingForms.has(form)) return
    this.updatingForms.add(form)

    console.group('Updating form')
    for (const name of Object.keys(settings)) {
      const els = form.querySelector(`[name='${name}']`)
      const [field] = els
      if (field) {
        console.info(name, ':', settings[name])
        switch (field.type) {
          case 'checkbox':
            field.checked = settings[name]
            break
          case 'radio': {
            const [selected] = [...els].filter(el => el.value === settings[name])
            if (selected) {
              selected.checked = true
            }
            break
          }
          default:
            field.value = settings[name]
            break
        }
        field.dispatchEvent(new Event('change'))
      } else {
        console.warn('Stored setting {', name, ':', settings[name], '} was not found on the page')
      }
    }
    console.groupEnd()

    this.updatingForms.delete(form)
  }

  private handleFormUpdates({target}) {
    this.formUpdated = true
    const el = target as HTMLInputElement

    const {name} = el
    if (!name || !el.validity.valid) return

    const value = el.type === 'checkbox' ? el.checked : el.value
    console.info('Saving setting', name, 'to', value)
    const change = { [name]: value }
    this.set(change)
    this.update(change, false)
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
