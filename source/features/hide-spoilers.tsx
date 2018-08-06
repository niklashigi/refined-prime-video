import {h} from 'dom-chef'
import elementReady from 'element-ready'

import nativeDropdown from '../lib/native-dropdown'
import options from '../lib/options'

export default async function() {
  let currentOptions = await options.getAll()

  const optionsBar = await elementReady('.aiv-wrapper ~ .a-section')
  const episodeList = await elementReady('#dv-episode-list > :first-child')

  const handleOptionsChange = () => {
    episodeList.dataset.rpvSpoilers = currentOptions.show_spoilers
  }
  handleOptionsChange()

  const optionsForm = (
    <form id="rpv-options">
      {
        nativeDropdown(
          'show_spoilers',
          [
            ['always', 'Always show spoilers'],
            ['on_hover', 'Show spoilers on hover'],
            ['never', 'Never show spoilers'],
          ],
          currentOptions.show_spoilers,
          "This option determines when the thumbnail and description of unwatched episodes are shown."
        )
      }
    </form>
  ) as HTMLFormElement

  optionsBar.appendChild(optionsForm)
  optionsForm.addEventListener('change', () => {
    setTimeout(async () => {
      currentOptions = await options.getAll()
      handleOptionsChange()
    }, 200)
  })
  options.syncForm(optionsForm)

  for (const episode of document.querySelectorAll('.dv-episode-container')) {
    if (episode.querySelector('.dv-linear-progress')) {
      episode.classList.add('rpv-watched')
    }
  }
}
