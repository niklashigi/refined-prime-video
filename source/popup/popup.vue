<template>
  <div class="flex flex-col h-screen bg-carbon-700 text-white">
    <div class="z-10 bg-carbon-900 p-3 shadow">
      What do you want to <strong>continue watching</strong>?
    </div>
    <div
      v-if="videos.length === 0"
      class="p-5 text-center font-italic text-gray-300"
    >
      Loading your videos…
    </div>
    <div v-else class="flex-grow overflow-y-auto">
      <a
        v-for="video in videos"
        class="flex p-3 border-b border-carbon-600 hover:bg-carbon-600 items-center"
        :href="getContinueWatchingUrl(video)"
        @click="continueWatching(video)"
      >
        <img
          class="bg-grey-900 mr-3 w-20 block rounded-sm flex-shrink"
          style="height: 45px"
          :src="video.image"
        >
        <div class="truncate">
          <div class="truncate text-base font-medium">
            {{ video.title }}
          </div>
          <div
            class="truncate text-sm text-gray-400"
          >
            <template v-if="video.season">
              {{ video.season }}
            </template>
            <span
              v-else
              class="italic"
            >
              Movie
            </span>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import fetchMyVideos from '../libs/fetch-my-videos'

export default {
  data: () => ({
    videos: [],
  }),
  methods: {
    continueWatching(video) {
      browser.tabs.create({
        url: this.getContinueWatchingUrl(video)
      })
    },
    getContinueWatchingUrl(video) {
      return `https://www.amazon.de/gp/video/detail/${video.id}?autoplay=1`
    },
  },
  async created() {
    this.videos = await fetchMyVideos()
  },
}
</script>
