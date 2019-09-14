<template>
  <div class="-my-1 -mx-5">
    <a
      v-for="(action, actionId) in actions"
      :key="actionId"
      class="flex py-2 px-5 items-center hover:bg-carbon-500"
      :href="action.url"
    >
      <div class="text-xl mr-3">{{ action.emoji }}</div>
      <div>
        <div class="font-semibold">{{ action.title }}</div>
        <div class="text-gray-400">{{ action.description }}</div>
      </div>
    </a>
  </div>
</template>

<script lang="ts">
const reviewUrl = navigator.userAgent.includes('Firefox') ?
  'https://addons.mozilla.org/firefox/addon/refined-prime-video/'
  : 'https://chrome.google.com/webstore/detail/refined-prime-video/pieemlagbhnombolehnjdoaoojpphedd/reviews'

export default {
  data: () => ({
    actions: {
      review: {
        emoji: '⭐',
        title: 'Leave a review',
        description: 'Tell others what you think.',
        url: reviewUrl,
      },
      github: {
        emoji: '🐙',
        title: 'Check out the GitHub repo',
        description: 'Look at the source code and leave a star.',
        url: 'https://github.com/shroudedcode/refined-prime-video',
      },
      twitter: {
        emoji: '🐦',
        title: 'Follow the author on Twitter',
        description: 'Stay up to date on all sorts of projects.',
        url: 'https://twitter.com/shroudedcode',
      },
    },
  }),
}
</script>
