function cleanUrl(urlString: string): string {
  const url = new URL(urlString)

  url.search = cleanQueryParams(url.search)

  // The `ref` parameter can also appear as part of the path
  url.pathname = url.pathname
    .split('/')
    .filter(part => !part.startsWith('ref='))
    .join('/')

  return url.toString()
}

const MESSY_QUERY_PARAMS = [
  // Used to track how the user came to the page
  'ref',
  'ref_',

  // Information about the user's last search query
  'keywords',
  'qid', // "Query ID"
  'refinements', // Filters
  'rnid', // "Refinement ID"
  'sr', // "Search result"
  's', // "Section"

  // Also related to search but unsure of the meaning
  'crid',
  'dib',
  'dib_tag',
  'sprefix',
]

function cleanQueryParams(searchString: string): string {
  const params = new URLSearchParams(searchString)

  for (const key of MESSY_QUERY_PARAMS) {
    params.delete(key)
  }

  return params.toString()
}

export default function (): void {
  const pageUrl = location.href
  const cleanedUrl = cleanUrl(location.href)

  if (pageUrl === cleanedUrl) return

  history.replaceState(null, '', cleanedUrl)

  console.groupCollapsed('[RPV] Cleaned up page URL.')
  console.info(`Before: ${pageUrl}`)
  console.info(`After:  ${cleanedUrl}`)
  console.groupEnd()
}
