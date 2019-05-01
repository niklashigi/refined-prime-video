import elementReady from 'element-ready'

import settings from '../libs/settings'

function checkEpisode(episode: HTMLDivElement) {
  return episode.classList.toggle(
    'rpv-watched',
    !!episode.querySelector('.dv-linear-progress'),
  )
}

function markWatchedEpisodes(episodeList: HTMLDivElement) {
  const episodes: NodeListOf<HTMLDivElement> = episodeList.querySelectorAll('.dv-episode-container')
  for (const episode of episodes) checkEpisode(episode)
}

export default async function() {
  const episodeList: HTMLDivElement = await elementReady('#dv-episode-list .dv-episode-wrap:not(.dv-el-bonus-expander)')
  markWatchedEpisodes(episodeList)

  new MutationObserver(() => {
    markWatchedEpisodes(episodeList)
  }).observe(episodeList, {
    childList: true, subtree: true,
  })

  settings.onChange(({showSpoilers}) => {
    episodeList.dataset.rpvSpoilers = showSpoilers
  })
}
