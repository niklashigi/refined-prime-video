import elementReady from 'element-ready'

import settings from '../libs/settings'

function checkEpisode(episode: HTMLElement): boolean {
  const progressBarShown = !!episode.querySelector('[role="progressbar"]')
  return episode.classList.toggle('rpv-watched', progressBarShown)
}

function markWatchedEpisodes(episodeList: HTMLElement): void {
  const episodes: NodeListOf<HTMLElement> =
    episodeList.querySelectorAll('.js-node-episode-container')
  for (const episode of episodes) checkEpisode(episode)

  console.log('[RPV] Updated watched episodes.')
}

export default async function(): Promise<void> {
  const episodeList =
    await elementReady<HTMLElement>('.DVWebNode-detail-btf-wrapper')
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
