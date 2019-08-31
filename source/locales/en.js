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
      title: "What site do you visit to use Prime Video?",
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
  support: {
    title: 'Do you enjoy using Refined Prime Video?',
    description: "Here are some things you can do to support the project. Your help is greatly appreciated.",
    actions: {
      review: {
        title: 'Leave a review',
        description: 'Tell others what you think.',
      },
      github: {
        title: 'Check out the GitHub repo',
        description: 'Look at the source code and leave a star.',
      },
      twitter: {
        title: 'Follow the author on Twitter',
        description: 'Stay up to date on all sorts of projects.',
      },
    },
  },
}
