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

function domReady(): Promise<void> {
  return new Promise(resolve => document.addEventListener(
    'DOMContentLoaded', () => resolve(),
  ))
}

export default async function(): Promise<void> {
  // Amazon seems to replace the `#js-node-btf ol` element in their JavaScript
  // code which is why `elementReady` can't be used here
  await domReady()

  const episodeList: HTMLOListElement =
    document.querySelector('#js-node-btf ol')
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
