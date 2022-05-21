// Necessary because Chrome exposes its extension APIs under the non-standard
// `chrome` namespace (which is mostly equivalent to `browser`)
declare const chrome: any
if (typeof browser === 'undefined') globalThis.browser = chrome
