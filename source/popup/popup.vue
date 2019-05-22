<template>
  <div>
    <em v-if="videos.length === 0">
      Loading your videos…
    </em>
    <ul v-else>
      <li v-for="video in videos">
        <a :href="`https://www.amazon.de/gp/video/detail/${video.id}?autoplay=1`">
          {{ video.title }}
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
  async created() {
    this.videos = await fetchMyVideos()
  },
}
</script>
