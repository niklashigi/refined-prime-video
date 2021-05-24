import SettingsStore from './settings-store'

export interface Settings {
  showSpoilers: 'always' | 'onHover' | 'never'
  region: string | null
  uid: string | null
}

const settings = new SettingsStore<Settings>('settings')

const createRandomId = () => Math.random().toString(36).substr(2, 9)
const generateUid = (settings: any) => {
  if (!settings.uid) settings.uid = createRandomId()
}

settings.setup({
  defaults: {
    showSpoilers: 'onHover',
    region: null,
    uid: null,
  },
  migrations: [SettingsStore.migrations.removeUnused, generateUid],
})

export default settings
