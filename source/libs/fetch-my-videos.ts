import regions from './regions'
import settings from './settings'

let baseUrl = null

export default async function fetchMyVideos() {
  const storefront = await fetchStorefront()

  const collection = storefront.collections.filter(c => c.edit)[0]
  if (!collection) throw new Error('No videos found!')

  browser.storage.local.set({ [await getCacheKey()]: collection.items as any })

  return collection.items.map(parseCollectionItem)
}

export async function getCachedVideos(): Promise<Video[]> {
  const key = await getCacheKey()
  const { [key]: items } = await browser.storage.local.get([key])
  if (!items) return []

  return (items as any).map(parseCollectionItem)
}

async function getCacheKey() {
  const { region } = await settings.getAll()
  return `cachedVideoItems-${region}`
}

async function fetchStorefront() {
  baseUrl = await getBaseUrl()
  const endpointUrl = `${baseUrl}/gp/video/api/storefront`
  return (await (await fetch(endpointUrl)).json()) as Storefront
}

function parseCollectionItem(item: Item): Video {
  const id = item.titleID

  return {
    id,
    ...parseTitle(item.title),
    image: item.image.url,
    continueWatchingUrl: `${baseUrl}/gp/video/detail/${id}?autoplay=1`,
  }
}

async function getBaseUrl() {
  const { region } = await settings.getAll()
  const { domain } = regions[region]
  return `https://www.${domain}`
}

const TITLE_PATTERN = /^(.+?)(?:[:\- ]+(\S+? \d+))?(?: (\[.+\]|\(.+\)))?$/

function parseTitle(sourceTitle: string) {
  const [_, title, season, titleSuffix] = TITLE_PATTERN.exec(sourceTitle)
  return { title, season, titleSuffix }
}

interface Storefront {
  collections: Collection[]
}

interface Collection {
  text: string
  items: Item[]
  edit?: any
}

interface Item {
  link: Image
  image: Image
  title: string
  titleID: string
  edit?: any
}

interface Image {
  url: string
}

interface Video {
  image: string
  continueWatchingUrl: string
  title: string
  season: string
  titleSuffix: string
  id: string
}
