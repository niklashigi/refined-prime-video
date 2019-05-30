module.exports = {
  manifest: {
    description: 'Simplifies the Amazon Prime Video interface and adds useful features',
  },
  navigation: {
    home: 'Prime Video homepage',
    settings: 'Settings',
    done: 'Done',
  },
  screens: {
    continueWatching: 'Continue watching',
    settings: 'Extension settings',
  },
  continueWatching: {
    noRegion: {
      title: 'No region selected!',
      description: [
        'In order to use the <em>Continue watching</em> feature, select a region in the settings.',
        'You can open them by clicking on the icon in the top right.',
      ].join(' '),
    },
    noVideos: {
      title: 'No videos found!',
      description: "Make sure you've selected the correct region in the settings and are logged into Amazon.",
    },
    loadingVideos: 'Loading videos…',
    movie: 'Movie',
  },
  settings: {
    region: {
      title: "What's your Amazon region?",
      description: "This is used to fetch your <em>Continue watching</em> list.",
    },
    showSpoilers: {
      title: 'When should spoilers be displayed?',
      description: "Thumbnails and descriptions of episodes you haven't watched yet are considered spoilers.",
      options: {
        never: 'Never show spoilers',
        onHover: 'Show spoilers on hover',
        always: 'Always show spoilers',
      },
    },
  },
}
