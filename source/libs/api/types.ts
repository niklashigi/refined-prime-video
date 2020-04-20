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
  playbackAction?: PlaybackAction
  runtime?: string
  edit?: any
}

export interface PlaybackAction {
  label: string
}

export interface Image {
  url: string
}
