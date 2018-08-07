import {h} from 'dom-chef'
import elementReady from 'element-ready'

import _ from './i18n'
import SettingsStore from './settings-store'
import createDropdown from './ui/dropdown'

export interface Settings {
  showSpoilers: 'always' | 'onHover' | 'never'
}

const settings = new SettingsStore<Settings>('settings')

export function setupSettings() {
  return settings.setup({
    defaults: {
      showSpoilers: 'onHover',
    } as Settings,
    migrations: [SettingsStore.migrations.removeUnused],
  })
}

export async function addSettingsBar() {
  const settingsBar = await elementReady('.aiv-wrapper ~ .a-section')

  const showSpoilersOptions = ['never', 'onHover', 'always'].map(
    value => [value, _(`settings_showSpoilers_options_${value}`)],
  ) as any

  const settingsForm = (
    <form id='rpv-settings'>
      {
        createDropdown(
          'showSpoilers',
          showSpoilersOptions,
          settings.cache.showSpoilers,
          _('settings_showSpoilers_title'),
        )
      }
    </form>
  ) as HTMLFormElement

  settingsBar.appendChild(settingsForm)
  settings.connectForm(settingsForm)
}

export default settings
