import elementReady from 'element-ready'

import settings from '../libs/settings'

function checkEpisode(episode: HTMLDivElement): boolean {
  return episode.classList.toggle(
    'rpv-watched',
    !!episode.querySelector('.dv-episode-playback-title span[role="progressbar"]'),
  )
}

function markWatchedEpisodes(episodeList: HTMLOListElement): void {
  const episodes: NodeListOf<HTMLDivElement> = episodeList.querySelectorAll('.js-node-episode-container')
  for (const episode of episodes) checkEpisode(episode)
}

export default async function(): Promise<void> {
  const episodeList: HTMLOListElement = await elementReady('#js-node-btf ol')
  if (!episodeList) return

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
