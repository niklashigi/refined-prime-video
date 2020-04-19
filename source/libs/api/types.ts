export interface Storefront {
  collections: Collection[]
}

export interface Collection {
  text: string
  items: CollectionItem[]
  edit?: any
}

export interface CollectionItem {
  link: Image
  image: Image
  title: string
  titleID: string
  edit?: any
}

export interface Image {
  url: string
}
