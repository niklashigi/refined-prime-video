import elementReady from 'element-ready'

import settings from '../libs/settings'

function checkEpisode(episode: Element) {
  return episode.classList.toggle(
    'rpv-watched',
    !!episode.querySelector('.dv-linear-progress'),
  )
}

function markWatchedEpisodes(episodes: NodeListOf<Element>) {
  for (const episode of episodes) {
    if (!checkEpisode(episode)) {
      const observer = new MutationObserver(() => {
        if (checkEpisode(episode)) observer.disconnect()
      })
      observer.observe(
        episode.querySelector('.dv-el-status-wrapper'),
        { childList: true, subtree: true },
      )
    }
  }
}

export default async function() {
  const episodeList: HTMLElement = await elementReady('#dv-episode-list .dv-episode-wrap:not(.dv-el-bonus-expander)')
  markWatchedEpisodes(episodeList.querySelectorAll('.dv-episode-container'))
  settings.onChange(({showSpoilers}) => {
    episodeList.dataset.rpvSpoilers = showSpoilers
  })
}
