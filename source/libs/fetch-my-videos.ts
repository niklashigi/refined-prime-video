import regions from './regions'
import settings from './settings'
import { Storefront, CollectionItem } from './api/types'

let baseUrl = null

export default async function fetchMyVideos(): Promise<Video[]> {
  const storefront = await fetchStorefront()

  const collection = storefront.collections.find(c => c.edit)
  if (!collection) throw new Error('No videos found!')

  browser.storage.local.set({ [await getCacheKey()]: collection.items as any })

  return parseCollectionItems(collection.items)
}

export async function getCachedVideos(): Promise<Video[]> {
  const key = await getCacheKey()
  const { [key]: items } = await browser.storage.local.get([key])
  if (!items) return []

  return parseCollectionItems(items as any)
}

async function getCacheKey(): Promise<string> {
  const { region } = await settings.getAll()
  return `cachedVideoItems-${region}`
}

async function fetchStorefront(): Promise<Storefront> {
  baseUrl = await getBaseUrl()
  const endpointUrl = `${baseUrl}/gp/video/api/storefront`
  return (await (await fetch(endpointUrl)).json()) as Storefront
}

function parseCollectionItems(items: CollectionItem[]): Video[] {
  return items
    .filter(item => item.playbackAction)
    .map(parseCollectionItem)
}

function parseCollectionItem(item: CollectionItem): Video {
  const id = item.titleID

  const titleInfo = parseTitle(item.title)
  const playbackInfo = parsePlaybackAction(item.playbackAction.label)

  return {
    id,
    title: titleInfo.title,
    titleSuffix: titleInfo.titleSuffix,
    season: playbackInfo?.season,
    episode: playbackInfo?.episode,
    runtime: item.runtime,
    image: item.image.url,
    continueWatchingUrl: `${baseUrl}/gp/video/detail/${id}?autoplay=1`,
  }
}

async function getBaseUrl(): Promise<string> {
  const { region } = await settings.getAll()
  const { domain } = regions[region]
  return `https://www.${domain}`
}

const TITLE_PATTERN = /^(.+?)(?:[:\- ]+(\S+? \d+))?(?: (\[.+\]|\(.+\)))?$/
const PLAYBACK_ACTION_PATTERN = /Play S(\d+) E(\d+)/

interface TitleInfo {
  title: string
  season: string
  titleSuffix: string
}

function parseTitle(sourceTitle: string): TitleInfo {
  const [, title, season, titleSuffix] = TITLE_PATTERN.exec(sourceTitle)
  return { title, season, titleSuffix }
}

interface PlaybackInfo {
  season: number
  episode: number
}

function parsePlaybackAction(playbackAction: string): PlaybackInfo {
  const match = PLAYBACK_ACTION_PATTERN.exec(playbackAction)
  if (!match) return

  const [, season, episode] = PLAYBACK_ACTION_PATTERN.exec(playbackAction)
  return { season: parseInt(season), episode: parseInt(episode) }
}

interface Video {
  image: string
  continueWatchingUrl: string
  title: string
  titleSuffix: string
  season?: number
  episode?: number
  runtime?: string
  id: string
}
