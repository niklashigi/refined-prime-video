import elementReady from 'element-ready'

import settings from '../libs/settings'

function checkEpisode(episode: HTMLDivElement) {
  return episode.classList.toggle(
    'rpv-watched',
    !!episode.querySelector('.dv-episode-playback-title span[role="progressbar"]'),
  )
}

function markWatchedEpisodes(episodeList: HTMLOListElement) {
  const episodes: NodeListOf<HTMLDivElement> = episodeList.querySelectorAll('.js-node-episode-container')
  for (const episode of episodes) checkEpisode(episode)
}

export default async function() {
  const episodeList: HTMLOListElement = await elementReady('#js-node-btf ol')
  markWatchedEpisodes(episodeList)

  new MutationObserver(() => {
    markWatchedEpisodes(episodeList)
  }).observe(episodeList, {
    childList: true, subtree: true,
  })

  settings.onChange(({ showSpoilers }) => {
    episodeList.dataset.rpvSpoilers = showSpoilers
  })
}
