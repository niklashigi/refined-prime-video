function cleanUrl(urlString: string) {
  const url = new URL(urlString)

  url.search = cleanSearchParams(url.search)

  // The `ref` parameter can also appear as part of the path
  url.pathname = url.pathname
    .split('/').filter(part => !part.startsWith('ref=')).join('/')

  return url.toString()
}

function cleanSearchParams(searchString: string) {
  const params = new URLSearchParams(searchString)

  // Used to track how the user came to the page
  params.delete('ref')
  params.delete('ref_')

  // Information about the user's last search query
  params.delete('keywords')
  params.delete('qid') // "Query ID"
  params.delete('refinements') // Filters
  params.delete('rnid') // "Refinement ID"
  params.delete('sr') // "Search result"
  params.delete('s') // "Section"

  return params.toString()
}

export default function() {
  const pageUrl = location.href
  const cleanedUrl = cleanUrl(location.href)

  if (pageUrl === cleanedUrl) return

  history.replaceState(null, '', cleanedUrl)

  console.groupCollapsed('[RPV] Cleaned up page URL.')
  console.info(`Before: ${pageUrl}`)
  console.info(`After:  ${cleanedUrl}`)
  console.groupEnd()
}
