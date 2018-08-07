import {h} from 'dom-chef'
import elementReady from 'element-ready'

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

  const settingsForm = (
    <form id='rpv-settings'>
      {
        createDropdown(
          'showSpoilers',
          [
            ['never', 'Never show spoilers'],
            ['onHover', 'Show spoilers on hover'],
            ['always', 'Always show spoilers'],
          ],
          settings.cache.showSpoilers,
          'This setting determines when the thumbnail and description of unwatched episodes are shown.',
        )
      }
    </form>
  ) as HTMLFormElement

  settingsBar.appendChild(settingsForm)
  settings.connectForm(settingsForm)
}

export default settings
