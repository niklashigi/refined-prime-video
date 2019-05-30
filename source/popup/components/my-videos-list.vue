<template>
  <div>
    <div
      v-if="videos.length === 0"
      class="p-8 text-center font-italic text-gray-300"
    >
      <template v-if="!settings.region">
        <div class="font-semibold mb-1">
          {{ $('continueWatching_noRegion_title') }}
        </div>
        <div v-html="$('continueWatching_noRegion_description')"/>
      </template>
      <template v-else-if="error">
        <h3 class="font-semibold mb-1">
          {{ $('continueWatching_noVideos_title') }}
        </h3>
        <div v-html="$('continueWatching_noVideos_description')"/>
      </template>
      <template v-else>
        {{ $('continueWatching_loadingVideos') }}
      </template>
    </div>
    <div v-else>
      <a
        v-for="video in videos"
        :key="video.id"
        class="flex p-3 border-b border-carbon-600 hover:bg-carbon-600 items-center group"
        :href="video.continueWatchingUrl"
        @click="continueWatching(video)"
      >
        <img
          class="bg-grey-900 mr-3 w-20 block rounded-sm flex-shrink"
          style="height: 45px"
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
            <span
              v-else
              class="italic"
            >
              {{ $('continueWatching_movie') }}
            </span>
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

export default {
  props: ['settings'],
  data: () => ({
    videos: [],
    error: false,
  }),
  methods: {
    continueWatching(video) {
      browser.tabs.create({
        url: video.continueWatchingUrl,
      })
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
