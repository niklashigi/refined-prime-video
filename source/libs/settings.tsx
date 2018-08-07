import {h} from 'dom-chef'
import elementReady from 'element-ready'

import SettingsStore from './settings-store'
import createDropdown from './ui/dropdown'

export interface Settings {
  show_spoilers: 'always' | 'on_hover' | 'never'
}

const settings = new SettingsStore<Settings>('settings')

export function setupSettings() {
  return settings.setup({
    defaults: {
      show_spoilers: 'on_hover',
    } as Settings,
  })
}

export async function addSettingsBar() {
  const settingsBar = await elementReady('.aiv-wrapper ~ .a-section')

  const optionsForm = (
    <form id='rpv-options'>
      {
        createDropdown(
          'show_spoilers',
          [
            ['never', 'Never show spoilers'],
            ['on_hover', 'Show spoilers on hover'],
            ['always', 'Always show spoilers'],
          ],
          settings.cache.show_spoilers,
          'This setting determines when the thumbnail and description of unwatched episodes are shown.',
        )
      }
    </form>
  ) as HTMLFormElement

  settingsBar.appendChild(optionsForm)
  settings.connectForm(optionsForm)
}

export default settings
