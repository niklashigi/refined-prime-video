function skip() {
  const button: HTMLDivElement = document.querySelector('.skipElement')
  if (button) button.click()
}

export default function() {
  window.addEventListener('keydown', ({ code }) => {
    if (code === 'KeyS') skip()
  })
}
