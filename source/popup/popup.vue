<template>
  <div class="flex flex-col h-screen">
    <div class="z-10 border-b border-blue-300 bg-blue-200 text-blue-800 p-3 shadow">
      What do you want to <strong>continue watching</strong>?
    </div>
    <div
      v-if="videos.length === 0"
      class="p-5 text-center font-italic text-gray-600"
    >
      Loading your videos…
    </div>
    <div v-else class="flex-grow overflow-y-auto">
      <a
        v-for="video in videos"
        class="flex p-3 border-b hover:bg-gray-100 items-center"
        :href="getContinueWatchingUrl(video)"
        @click="continueWatching(video)"
      >
        <img
          class="bg-grey-900 mr-3 w-24 block rounded-sm flex-shrink"
          style="height: 54px"
          :src="video.image"
        >
        <div class="truncate">
          <div class="truncate">
            <span class="text-sm font-medium">
              {{ video.title }}
            </span>
            <span
              v-if="video.titleSuffix"
              class="text-xs text-gray-600"
            >
              {{ video.titleSuffix }}
            </span>
          </div>
          <div class="mt-1">
            <span
              v-if="video.isPrime"
              class="p-1 rounded-sm mr-2 bg-blue-100 text-blue-500"
            >
              Prime
            </span>
            <span
              v-if="video.hasSubtitles"
              class="p-1 rounded-sm mr-2 bg-gray-200 text-gray-600"
            >
              Has subtitles
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
