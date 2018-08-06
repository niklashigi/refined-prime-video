export default function waitForNav(callback) {
  let frameHandler

  function checkNav() {
    if (document.querySelector('.av-retail-m-nav-container')) {
      callback()
    } else {
      frameHandler = requestAnimationFrame(checkNav)
    }
  }

  checkNav()

  document.onload = () => {
    cancelAnimationFrame(frameHandler)
  }
}
