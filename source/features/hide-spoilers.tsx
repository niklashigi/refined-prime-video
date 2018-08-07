import elementReady from 'element-ready'

import settings from '../libs/settings'

function markWatchedEpisodes() {
  for (const episode of document.querySelectorAll('.dv-episode-container')) {
    if (episode.querySelector('.dv-linear-progress')) {
      episode.classList.add('rpv-watched')
    }
  }
}

export default async function() {
  const episodeList = await elementReady('#dv-episode-list > :first-child')

  settings.onChange(({showSpoilers}) => {
    episodeList.dataset.rpvSpoilers = showSpoilers
  })

  markWatchedEpisodes()
}
