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

function createSettingsForm() {
  const showSpoilersOptions = ['never', 'onHover', 'always'].map(
    value => [value, _(`settings_showSpoilers_options_${value}`)],
  ) as any

  return (
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
}

export async function insertSettingsForm() {
  const settingsForm = createSettingsForm()

  const episodeList = await elementReady('#dv-episode-list');
  // TODO: Remove this hack once `ParentNode.prepend` is in the DOM type definitions
  (episodeList as any).prepend(settingsForm)

  settings.connectForm(settingsForm)
}

export default settings
