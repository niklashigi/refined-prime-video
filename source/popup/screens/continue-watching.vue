<template>
  <div class="h-full overflow-y-auto">
    <div
      v-if="videos.length === 0"
      class="p-8 text-center font-italic text-gray-300"
    >
      <template v-if="!settings.region">
        <div class="text-base mb-1">
          No region selected!
        </div>
        In order to use the <em>Continue watching</em> feature, select a region in the settings.
        You can open them by clicking on the icon in the top right.
      </template>

      <template v-else-if="error">
        <div class="text-base mb-1">
          No videos found!
        </div>
        Make sure you've selected the correct region in the settings and are logged in on
        <a
          :href="`https://${currentRegion.domain}`"
          class="underline"
        >{{ currentRegion.domain }}</a>.
      </template>

      <template v-else>
        Loading videos…
      </template>
    </div>
    <div v-else>
      <a
        v-for="video in videos"
        :key="video.id"
        class="flex p-3 border-b border-carbon-600 hover:bg-carbon-600 items-center group"
        :href="video.continueWatchingUrl"
      >
        <img
          class="block mr-3 bg-carbon-900 flex-shrink-0 rounded-sm"
          loading="lazy"
          style="width: 90px; height: 50.59px"
          :src="video.image"
        >
        <div class="truncate flex-grow">
          <div class="truncate text-base font-medium">
            {{ video.title }}
          </div>
          <div
            class="truncate text-sm text-gray-400"
          >
            <template v-if="video.season">
              {{ video.season }}
            </template>
            <template v-else>Movie</template>
          </div>
        </div>
        <div class="hidden group-hover:flex ml-2 mr-1 flex-shrink-0 h-10 w-10 rounded-full bg-prime-500 items-center justify-center">
          <svg class="ml-1 w-4 h-4 fill-current text-white" viewBox="0 0 20 20"><path d="M1.79 19.73c-.99.5-1.79.02-1.79-1.1V1.3C0 .19.8-.3 1.79.2L19.2 9.06c1 .5 1 1.31 0 1.82L1.8 19.73z"/></svg>
        </div>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import fetchMyVideos from '../../libs/fetch-my-videos'
import regions from '../../libs/regions'

export default {
  props: ['settings'],
  data: () => ({
    videos: [],
    error: false,
  }),
  computed: {
    currentRegion() {
      return regions[this.settings.region]
    },
  },
  created() {
    if (!this.settings.region) return

    fetchMyVideos()
      .then(videos => this.videos = videos)
      .catch(() => this.error = true)
  },
}
</script>
