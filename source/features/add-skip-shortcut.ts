const BUTTON_SELECTORS = [
  /* Pre-roll ad */ '.adSkipButton.skippable',
  /* Recap or intro */ '.skipElement',
  /* Next episode countdown */ '.nextUpCard',
]

function skip() {
  for (const selector of BUTTON_SELECTORS) {
    const button: HTMLElement = document.querySelector(selector)
    if (button) return button.click()
  }
}

export default function() {
  window.addEventListener('keydown', ({ code }) => {
    if (code === 'KeyS') skip()
  })
}
