const BUTTON_SELECTORS = [
  // May 2019 (still most users)
  /* Pre-roll ad */ '.adSkipButton.skippable',
  /* Recap or intro */ '.skipElement',
  /* Next episode countdown */ '.nextUpCard',

  // November 2020 (slow rollout)
  /* Recap or intro */ '.atvwebplayersdk-skipelement-button',
  /* Next episode countdown */ '.atvwebplayersdk-nextupcard-wrapper',

  // TODO: Figure out new selector for pre-roll ads
  // See https://github.com/shroudedcode/refined-prime-video/issues/10
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

export default function (): void {
  window.addEventListener('keydown', event => {
    // If the user is currently typing (for example in the Prime Video search
    // bar), we don't want to trigger the skip shortcut.
    const isTyping = document.activeElement?.tagName === 'INPUT'
    if (isTyping) return

    if (event.code === 'KeyS') {
      event.preventDefault()
      skip()
    }
  })
}
