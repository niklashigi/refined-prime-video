const navA = !!document.querySelector('.av-retail-m-nav-container')
const navB = !!document.querySelector('#nav-subnav[data-category="instant-video"]')

const bodyClasses = document.body.classList
bodyClasses.toggle('rpv-inav', navA || navB)
bodyClasses.toggle('rpv-inav-a', navA)
bodyClasses.toggle('rpv-inav-b', navB)
