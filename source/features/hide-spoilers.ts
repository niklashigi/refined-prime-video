import elementReady from 'element-ready'

import settings from '../libs/settings'

function checkEpisode(episode: HTMLElement): boolean {
  const progressBarShown = !!episode.querySelector(
    '[data-testid="progress-bar"]',
  )
  return episode.classList.toggle('rpv-watched', progressBarShown)
}

function markWatchedEpisodes(episodesContainer: HTMLElement): void {
  const episodes = [
    ...episodesContainer.querySelectorAll<HTMLElement>(
      '[id^="av-ep-episodes-"]',
    ),
  ]
  for (const episode of episodes) checkEpisode(episode)

  console.log(`[RPV] Updated watched state for ${episodes.length} episodes.`)
}

export default async function (): Promise<void> {
  const episodesContainer = await elementReady<HTMLElement>(
    '.DVWebNode-detail-btf-wrapper',
  )
  if (!episodesContainer) return

  console.log('[RPV] Found episodes container:', episodesContainer)

  markWatchedEpisodes(episodesContainer)

  new MutationObserver(() => {
    markWatchedEpisodes(episodesContainer)
  }).observe(episodesContainer, {
    childList: true,
    subtree: true,
  })

  settings.onChange(({ showSpoilers }) => {
    episodesContainer.dataset.rpvSpoilers = showSpoilers
  })
}
