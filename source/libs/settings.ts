import SettingsStore from './settings-store'

export interface Settings {
  showSpoilers: 'always' | 'onHover' | 'never'
  region: 'us' | 'uk' | 'de'
}

const settings = new SettingsStore<Settings>('settings')

settings.setup({
  defaults: {
    showSpoilers: 'onHover',
    region: 'de',
  },
  migrations: [SettingsStore.migrations.removeUnused],
})

export default settings
