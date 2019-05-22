const STOREFRONT_ENDPOINT_URL = 'https://www.amazon.de/gp/video/api/storefront'

export default async function fetchMyVideos() {
  const storefront = await fetchStorefront()

  const collection = storefront.collections.filter(c => c.edit)[0]
  if (!collection) throw new Error('No videos found!')

  return collection.items.map(parseCollectionItem)
}

async function fetchStorefront() {
  return (await (await fetch(STOREFRONT_ENDPOINT_URL)).json()) as Storefront
}

function parseCollectionItem(item: Item) {
  return {
    id: item.titleID,
    ...sanitizeTitle(item.title),
    isPrime: item.entitlements.includes('prime'),
    hasSubtitles: item.hasSubtitles === '1',
    maturityRating: item.maturityRating ? parseInt(item.maturityRating.rating) : undefined,
    image: item.image.url,
  }
}

const TITLE_PATTERN = /^(?<title>[^[(\n]*)(?<titleSuffix>.+)?$/

function sanitizeTitle(title: string) {
  return TITLE_PATTERN.exec(title).groups as { title: string, titleSuffix?: string }
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
  hasSubtitles: string
  entitlements: 'prime'[]
  maturityRating?: MaturityRating
  image: Image
  title: string
  titleID: string
  edit?: any
}

interface Image {
  url: string
}

interface MaturityRating {
  rating: string
}
