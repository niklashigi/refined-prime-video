import elementReady from 'element-ready'

export default function() {
  elementReady('.dv-episode-container').then(() => {
    for (const episode of document.querySelectorAll('.dv-episode-container')) {
      if (episode.querySelector('.dv-linear-progress')) {
        episode.classList.add('rpv-watched')
      }
    }
  })
}
