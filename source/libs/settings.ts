import SettingsStore from './settings-store'

export interface Settings {
  showSpoilers: 'always' | 'onHover' | 'never'
  region: string | null
}

const settings = new SettingsStore<Settings>('settings')

settings.setup({
  defaults: {
    showSpoilers: 'onHover',
    region: null,
  },
  migrations: [SettingsStore.migrations.removeUnused],
})

export default settings
