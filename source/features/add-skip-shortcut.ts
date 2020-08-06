const BUTTON_SELECTORS = [
  /* Pre-roll ad */ '.adSkipButton.skippable',
  /* Recap or intro */ '.skipElement',
  /* Next episode countdown */ '.nextUpCard',
]

function skip(): void {
  const button = findSkipButton()

  if (button) {
    button.click()
    console.log('[RPV] Simulated click on skip button!', button)
  } else {
    console.log('[RPV] No skip button found!')
  }
}

function findSkipButton(): HTMLElement | undefined {
  for (const selector of BUTTON_SELECTORS) {
    const button = document.querySelector<HTMLElement>(selector)
    if (button) return button
  }
}

export default function(): void {
  window.addEventListener('keydown', ({ code }) => {
    if (code === 'KeyS') skip()
  })
}
