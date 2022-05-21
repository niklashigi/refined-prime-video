<template>
  <a
    class="flex p-3 border-b border-carbon-600 bg-carbon-700 hover:bg-carbon-600 items-center group"
    :href="video.continueWatchingUrl"
    @click="trackEvent('continue-video')"
  >
    <img
      class="block mr-3 bg-carbon-900 flex-shrink-0 rounded-sm"
      loading="lazy"
      style="width: 90px; height: 50.59px"
      :src="video.image"
    />
    <div class="truncate flex-grow">
      <div class="truncate text-base font-medium">
        {{ video.title }}
      </div>
      <div class="truncate text-sm text-gray-400">
        <template v-if="video.season">
          Season <strong class="font-medium">{{ video.season }}</strong
          ><span class="text-gray-600"> / </span>Ep.
          <strong class="font-medium">{{ video.episode }}</strong>
        </template>
        <template v-else>
          Movie<span class="text-gray-600"> / </span>{{ video.runtime }}
        </template>
      </div>
    </div>
    <div
      class="hidden group-hover:flex ml-2 mr-1 flex-shrink-0 h-10 w-10 rounded-full bg-prime-500 items-center justify-center"
    >
      <svg class="ml-1 w-4 h-4 fill-white" viewBox="0 0 20 20">
        <path
          d="M1.79 19.73c-.99.5-1.79.02-1.79-1.1V1.3C0 .19.8-.3 1.79.2L19.2 9.06c1 .5 1 1.31 0 1.82L1.8 19.73z"
        />
      </svg>
    </div>
  </a>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { Video } from '../../libs/fetch-my-videos'
import trackEvent from '../../libs/track-event'

export default defineComponent({
  props: {
    video: {
      type: Object as PropType<Video>,
      required: true,
    },
  },
  setup() {
    return { trackEvent }
  },
})
</script>
