// Generated with https://quicktype.io/

export interface LandingPageContainer {
  containerType: string
  entities: Entity[]
  entitlementCues: TopLevelEntitlementCues
  estimatedTotal: number
  impressionData: string
  journeyIngressContext: string
  text: string
  webUid: string
  facetText?: string
  title?: string
  paginationServiceToken?: string
  paginationStartIndex?: number
  paginationTargetId?: string
  seeMore?: SeeMore
  seeMoreDescription?: string
  seeMoreLink?: Link
  notExpandable?: boolean
}

export interface Entity {
  buyBoxActions: any[]
  categorizedGenres?: CategorizedGenres
  contentMaturityRating?: ContentMaturityRating
  degradations: any[]
  displayTitle: string
  entitlementCues?: EntityEntitlementCues
  entitlements: Entitlement[]
  entityType?: EntityType
  filterEntitled: boolean
  hasSubtitles: boolean
  hideThisAction?: HideThisAction
  hoverInfo: HoverInfo
  images: Images
  itemAnalytics: ItemAnalytics
  link: BackgroundImage
  maturityRatingBadge?: MaturityRatingBadge
  messages: Messages
  overflowMenu?: OverflowMenu
  playbackAction?: PlaybackAction
  playbackActions: PlaybackAction[]
  properties: Properties
  refMarker: string
  releaseYear?: string
  synopsis?: string
  title?: string
  titleID?: string
  watchlistAction?: Action
  widgetType: WidgetType
  alternateText?: string
  runtime?: string
  prerolls?: Prerolls
  customerReviews?: CustomerReviews
  progress?: Progress
}

export interface CategorizedGenres {
  primaryGenre: string
  secondaryGenres?: string[]
}

export interface ContentMaturityRating {
  locale?: Locale
  rating: string
  title: DescriptionEnum
}

export enum Locale {
  De = 'de',
}

export enum DescriptionEnum {
  SuitableFor6YearsAndOlder = 'Suitable for 6 years and older',
  SuitableForAges12AndOlder = 'Suitable for ages 12 and older',
  SuitableForAges16AndOlder = 'Suitable for ages 16 and older',
  SuitableForAges18AndOlder = 'Suitable for ages 18 and older',
  WithoutAgeLimitation = 'Without age limitation',
  YoungAdults = 'Young Adults.',
}

export interface CustomerReviews {
  count: number
  countFormatted: string
  customerReviewsText: CustomerReviewsTextClass
  link: string
  value: number
}

export interface CustomerReviewsTextClass {
  attrs: Record<string, unknown>
  string: string
}

export interface EntityEntitlementCues {
  compactFocusMessage: Message
  entitlementType: EntitlementType
  focusMessage: Message
  glanceMessage: Message
  highValueMessage: Message
  providerLogo: Record<string, unknown>
  titleMetadataBadge: Record<string, unknown>
}

export interface Message {
  icon?: Icon
  message?: string
}

export enum Icon {
  EntitledIcon = 'ENTITLED_ICON',
  OfferIcon = 'OFFER_ICON',
  TrendingIcon = 'TRENDING_ICON',
}

export enum EntitlementType {
  Entitled = 'Entitled',
  Unentitled = 'Unentitled',
}

export enum Entitlement {
  Prime = 'prime',
}

export enum EntityType {
  Movie = 'Movie',
  TVShow = 'TV Show',
}

export interface HideThisAction {
  endpoint: HideThisActionEndpoint
  hasTimer: boolean
  tag: HideThisActionTag
  text: HideThisActionText
}

export interface HideThisActionEndpoint {
  partialURL: PartialURL
  query: PurpleQuery
}

export enum PartialURL {
  GpVideoAPIHideThisRefAtvExfbHTSfHideMv = '/gp/video/api/hideThis/ref=atv_exfb_ht_sf_hide_mv',
  GpVideoAPIHideThisRefAtvExfbHTSfHideSeas = '/gp/video/api/hideThis/ref=atv_exfb_ht_sf_hide_seas',
}

export interface PurpleQuery {
  tag: HideThisActionTag
  titleId: string
  token: string
  titleType: PurpleTitleType
}

export enum HideThisActionTag {
  Hide = 'Hide',
}

export enum PurpleTitleType {
  Movie = 'Movie',
  Season = 'Season',
}

export enum HideThisActionText {
  HideThisMovie = 'Hide this movie',
  HideThisSeason = 'Hide this season',
}

export interface HoverInfo {
  canHover: boolean
}

export interface Images {
  hero?: Hero
  providerLogo?: BackgroundImage
  titleLogo?: BackgroundImage
  cover?: BackgroundImage
  poster2x3?: BackgroundImage
}

export interface BackgroundImage {
  url: string
}

export interface Hero {
  alternateText?: string
  height?: number
  url: string
  width?: number
}

export interface ItemAnalytics {
  refMarker: string
  itemProducerID?: ItemProducerID
}

export enum ItemProducerID {
  AwarenessDome = 'awareness-dome',
  SuperHeroGrabbagManualSubscription = 'SuperHero-Grabbag-Manual-subscription',
  SuperHeroGrabbagManualTvod = 'SuperHero-Grabbag-Manual-tvod',
  SuperheroSonataPinnedNontitle = 'Superhero-Sonata-Pinned-nontitle',
}

export interface MaturityRatingBadge {
  __type: MaturityRatingBadgeType
  countryCode?: CountryCode
  description: DescriptionEnum
  displayText: string
  id: string
  simplifiedId?: string
}

export enum MaturityRatingBadgeType {
  AtvWpsAmazonMaturityRatingBadge = 'atv.wps#AmazonMaturityRatingBadge',
  AtvWpsLocalRatingBadge = 'atv.wps#LocalRatingBadge',
}

export enum CountryCode {
  De = 'DE',
}

export interface Messages {
  infoboxes: any[]
  offers: any[]
}

export interface OverflowMenu {
  items: Item[]
  title: OverflowMenuTitle
}

export interface Item {
  __type: ItemType
  action: Action
  itemType: ItemTypeEnum
  text: ItemText
}

export enum ItemType {
  AtvWpsOverflowMenuWatchlistItem = 'atv.wps#OverflowMenuWatchlistItem',
}

export interface Action {
  ajaxEnabled: boolean
  endpoint: WatchlistActionEndpoint
  formatCode: FormatCode
  tag: WatchlistActionTag
  text: CustomerReviewsTextClass
}

export interface WatchlistActionEndpoint {
  partialURL: string
  query: FluffyQuery
}

export interface FluffyQuery {
  returnUrl: ReturnURL
  tag: WatchlistActionTag
  titleType: FluffyTitleType
  titleID: string
  token: string
}

export enum ReturnURL {
  GpVideoStorefrontRefAtvHmWtlSignInHov = '/gp/video/storefront/ref=atv_hm_wtl_sign_in_hov',
}

export enum WatchlistActionTag {
  Add = 'Add',
}

export enum FluffyTitleType {
  Movie = 'movie',
  Season = 'season',
}

export enum FormatCode {
  Mv = 'mv',
  Seas = 'seas',
}

export enum ItemTypeEnum {
  WatchlistAction = 'WatchlistAction',
}

export enum ItemText {
  AddSeasonToWatchlist = 'Add Season to Watchlist',
  AddToWatchlist = 'Add to Watchlist',
}

export enum OverflowMenuTitle {
  YourWatchlist = 'Your Watchlist',
}

export interface PlaybackAction {
  appFallbackUrl: unknown
  disableJs: boolean
  fallbackUrl: string
  label: Label
  refMarker: unknown
  sessionID: unknown
  titleID: string
  videoMaterialType: VideoMaterialType
  resumeTime?: number
}

export enum Label {
  Play = 'Play',
}

export enum VideoMaterialType {
  Feature = 'Feature',
}

export interface Prerolls {
  disableUnmute: boolean
  mediaFile: string
  textMap: TextMap
  trackingEvents: Record<string, unknown>
}

export interface TextMap {
  enterFullscreen: string
  exitFullscreen: string
  muteButton: string
  unmuteButton: string
}

export interface Progress {
  isLive: boolean
  percentage: number
}

export interface Properties {
  isIdPlayable?: boolean
  leavingSoonOnWatchNext?: boolean
}

export enum WidgetType {
  HeroTitle = 'HeroTitle',
  ImageTextLink = 'ImageTextLink',
  TitleCard = 'TitleCard',
}

export interface TopLevelEntitlementCues {
  entitledCarousel: string
  offerType: string
}

export interface SeeMore {
  displayPlacement: string
  link: Link
  backgroundImage?: BackgroundImage
  contentId?: string
  refMarker?: string
}

export interface Link {
  label: string
  url: string
}
