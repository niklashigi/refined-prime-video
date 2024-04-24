import regions from './regions'
import settings from './settings'
import { Entity, LandingPageContainer } from './api/types'

let baseUrl: string | null = null

export default async function fetchMyVideos(): Promise<Video[]> {
  const landingPageContainers = await fetchLandingPageContainers()

  const container = landingPageContainers.find(
    c =>
      // This looks like it could be a locale-independent way to identify the
      // container but it's not guaranteed to work.
      c.webUid === '7a702492' ||
      // Let's fall back to checking the title of the container instead.
      c.title?.toLowerCase() === 'continue watching',
  )
  if (!container) throw new Error('No videos found!')

  browser.storage.local.set({
    [await getCacheKey()]: container.entities as any,
  })

  return parseContainerEntities(container.entities)
}

export async function getCachedVideos(): Promise<Video[]> {
  const key = await getCacheKey()
  const { [key]: items } = await browser.storage.local.get([key])
  if (!items) return []

  return parseContainerEntities(items as any)
}

async function getCacheKey(): Promise<string> {
  const { region } = await settings.getAll()
  return `cachedLandingPageVideoEntities-${region}`
}

async function fetchLandingPageContainers(): Promise<LandingPageContainer[]> {
  const storefrontSsrState = await fetchPageSsrState('/gp/video/storefront')

  return storefrontSsrState.props.body[0].props.landingPage
    .containers as LandingPageContainer[]
}

/**
 * Amazon has removed the API endpoint that we used to fetch the storefront
 * contents, so we now fetch the HTML of the storefront page instead and extract
 * the "SSR state" (the initial state passed to the page's components during
 * server-side rendering).
 */
async function fetchPageSsrState(url: string): Promise<any> {
  baseUrl = await getBaseUrl()
  const endpointUrl = `${baseUrl}${url}`
  const response = await fetch(endpointUrl)
  const pageHtml = await response.text()

  const pageDocument = new DOMParser().parseFromString(pageHtml, 'text/html')

  // The element we need does not have any additional attributes we can use to
  // identify it (it's exactly `<script type="text/template">`) and there are
  // multiple `<script>` elements with the same type, so we detect the correct
  // one based on the content below.
  const templateScripts = pageDocument.querySelectorAll(
    'script[type="text/template"]',
  )

  for (const templateScript of templateScripts) {
    try {
      const json = templateScript.textContent!

      // This will fail sometimes because some of the scripts are HTML-encoded
      // and some are not. The one we care about is not.
      const jsonData = JSON.parse(json!)

      // The element containing the SSR state of the page is the only one
      // containing `props.body`, so we can use that to identify it.
      if (jsonData.props?.body) return jsonData
    } catch (error) {
      console.debug(
        'Failed to parse JSON from template script tag:',
        templateScript,
      )
    }
  }

  throw new Error('SSR state not found in page HTML!')
}

function parseContainerEntities(items: Entity[]): Video[] {
  return items.filter(item => item.playbackAction).map(parseContainerEntity)
}

function parseContainerEntity(entity: Entity): Video {
  const id = entity.titleID
  if (!id) throw new Error('No title ID found in entity!')

  const coverUrl = entity.images.cover?.url
  if (!coverUrl) throw new Error('No cover image found in entity!')

  return {
    id,
    displayTitle: decodeHtmlEntities(entity.displayTitle),
    type: entity.entityType ?? null,
    coverUrl: coverUrl,
    continueWatchingUrl: `${baseUrl}/gp/video/detail/${id}?autoplay=1`,
  }
}

async function getBaseUrl(): Promise<string> {
  const { region } = await settings.getAll()
  const { domain } = regions[region!]
  return `https://www.${domain}`
}

export interface Video {
  id: string
  displayTitle: string
  type: string | null

  coverUrl: string
  continueWatchingUrl: string
}

function decodeHtmlEntities(html: string): string {
  const textarea = document.createElement('textarea')
  textarea.innerHTML = html
  return textarea.value
}
