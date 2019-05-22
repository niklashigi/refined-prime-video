<template>
  <div>
    <div
      v-if="videos.length === 0"
      class="p-5 text-center font-italic text-gray-600"
    >
      Loading your videos…
    </div>
    <ul v-else>
      <li v-for="video in videos">
        <a
          class="flex hover:bg-gray-100 p-2 border-b"
          :href="getContinueWatchingUrl(video)"
          @click="continueWatching(video)"
        >
          <img
            class="mr-2 h-10 block rounded-sm"
            :src="video.image"
          >
          <div class="font-bold">
            {{ video.title }}
          </div>
        </a>
      </li>
    </ul>
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
