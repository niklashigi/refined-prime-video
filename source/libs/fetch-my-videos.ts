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
    ...parseTitle(item.title),
    image: item.image.url,
  }
}

const TITLE_PATTERN = /^(?<title>.+?)(?:[:\- ]+(?<season>(?:Season|Staffel) \d+))?(?: (?<titleSuffix>\[.+\]|\(.+\)))?$/

function parseTitle(title: string) {
  return TITLE_PATTERN.exec(title).groups as {
    title: string,
    season?: string,
    titleSuffix?: string,
  }
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
