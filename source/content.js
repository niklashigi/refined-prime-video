let frameHandler

function checkNav() {
  if (document.querySelector('.av-retail-m-nav-container')) {
    document.body.classList.add('rpv-inav')
    console.log('[Refined Prime Video] Improved navigation enabled.')
  } else {
    frameHandler = requestAnimationFrame(checkNav)
  }
}

checkNav()

document.onload = () => {
  cancelAnimationFrame(frameHandler)
}
