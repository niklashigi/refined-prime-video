<template>
  <div>
    <div class="px-5 py-3 flex items-center bg-carbon-600 border-t border-carbon-500">
      <div class="mr-3 text-gray-400">
        <span class="font-medium">Refined Prime Video</span>
        is a free and open-source project by
        <a class="underline" href="https://shroudedcode.com">Niklas Higi</a>.
      </div>
      <div class="flex-grow"/>
      <a
        title="GitHub"
        href="https://github.com/shroudedcode/refined-prime-video"
      >
        <github-icon class="flex-shrink-0 text-carbon-400 hover:text-carbon-200"/>
      </a>
      <a
        title="Twitter"
        href="https://twitter.com/shroudedcode"
      >
        <twitter-icon class="ml-3 flex-shrink-0 text-carbon-400 hover:text-carbon-200"/>
      </a>
    </div>
    <div class="px-5 py-2 border-t border-carbon-500 text-gray-500 text-center">
      ❤️ <span class="ml-1 font-medium">Love the extension?</span>
      I'd appreciate a <a
        class="underline"
        :href="reviewUrl"
      >review</a>!
    </div>
  </div>
</template>

<script lang="ts">
const reviewUrl = navigator.userAgent.includes('Firefox') ?
  'https://addons.mozilla.org/firefox/addon/refined-prime-video/'
  : 'https://chrome.google.com/webstore/detail/refined-prime-video/pieemlagbhnombolehnjdoaoojpphedd/reviews'

import { TwitterIcon, GithubIcon } from 'vue-feather-icons'

export default {
  components: { TwitterIcon, GithubIcon },
  data: () => ({ reviewUrl }),
}
</script>
