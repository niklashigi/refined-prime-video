export default function (): void {
  // primevideo.com's navigation doesn't need to be cleaned up
  if (location.origin.endsWith('primevideo.com')) return

  // Some sites (like amazon.co.jp) still use the old navigation bar
  // This feature only works with the newer navigation bar
  if (!document.querySelector('.av-retail-m-nav-container')) return

  document.documentElement.classList.add('rpv-inav')
  console.info('[RPV] Enabled improved navigation.')
}
