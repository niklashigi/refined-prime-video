export default async function trackEvent(
  type: string,
  data?: Record<string, string>,
): Promise<void> {
  await browser.runtime.sendMessage({
    event: { type, data },
  })
}
