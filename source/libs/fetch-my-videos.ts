import regions from './regions'
import settings from './settings'

let baseUrl = null

export default async function fetchMyVideos() {
  const storefront = await fetchStorefront()

  const collection = storefront.collections.filter(c => c.edit)[0]
  if (!collection) throw new Error('No videos found!')

  return collection.items.map(parseCollectionItem)
}

async function fetchStorefront() {
  baseUrl = await getBaseUrl()
  const endpointUrl = `${baseUrl}/gp/video/api/storefront`
  return (await (await fetch(endpointUrl)).json()) as Storefront
}

function parseCollectionItem(item: Item) {
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
  const { domainSuffix } = regions[region]
  return `https://www.amazon.${domainSuffix}`
}

const TITLE_PATTERN = /^(.+?)(?:[:\- ]+((?:Season|Staffel) \d+))?(?: (\[.+\]|\(.+\)))?$/

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
