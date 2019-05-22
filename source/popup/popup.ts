import fetchMyVideos from '../libs/fetch-my-videos'

document.write('Loading your videos…')

fetchMyVideos().then(videos => {
  document.write('<ul>' + videos.map(video => {
    const url = `https://www.amazon.de/gp/video/detail/${video.id}?autoplay=1`
    return `<li><a href="${url}">${video.title}</a></li>`
  }).join('') + '</ul>')
})
