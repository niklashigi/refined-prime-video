const BUTTON_SELECTORS = [
  /* Pre-roll ad */ '.adSkipButton.skippable',
  /* Recap or intro */ '.skipElement',
  /* Next episode countdown */ '.nextUpCard',
]

function skip(): void {
  const button = findSkipButton()

  if (button) {
    button.click()
    console.log('[RPV] Skip button click simulated!', button)
  } else {
    console.log('[RPV] No skip button found!')
  }
}

function findSkipButton(): HTMLElement | undefined {
  for (const selector of BUTTON_SELECTORS) {
    const button: HTMLElement = document.querySelector(selector)
    if (button) return button
  }
}

export default function(): void {
  window.addEventListener('keydown', ({ code }) => {
    if (code !== 'KeyS') return

    console.log('[RPV] Skip shortcut triggered!')
    skip()
  })

  console.log('[RPV] Registered skip shortcut.')
}
