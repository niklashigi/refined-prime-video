<template>
  <div class="h-full flex flex-col">
    <div class="flex-grow overflow-hidden">
      <div
        class="h-full flex"
        v-if="videos.length === 0"
      >
        <div class="m-auto px-8 text-center font-italic text-gray-300">
          <template v-if="!settings.region">
            <div class="mx-auto mb-3 h-12 w-12 rounded-full flex bg-carbon-500">
              <map-pin-icon class="m-auto text-gray-400"/>
            </div>
            <div class="text-base mb-1">
              No region selected!
            </div>
            <div>
              In order to use the <em>Continue watching</em> feature, select a region in the settings.
              You can open them by clicking on the icon in the top right.
            </div>
          </template>

          <template v-else-if="failed">
            <div class="mx-auto mb-3 h-12 w-12 rounded-full flex bg-carbon-500">
              <alert-triangle-icon class="m-auto text-gray-400"/>
            </div>
            <div class="text-base">
              Loading videos failed!
            </div>
            <div class="mt-1">
              Check your internet connection and make sure you're logged in on
              <a
                :href="`https://${currentRegion.domain}`"
                class="underline"
              >{{ currentRegion.domain }}</a>.
            </div>
          </template>

          <template v-else>
            <spinner/>
          </template>
        </div>
      </div>
      <div
        v-else
        class="h-full overflow-y-auto"
        :class="{ 'opacity-50': replacing }"
        style="transition: opacity .2s"
      >
        <a
          v-for="video in videos"
          :key="video.id"
          class="flex p-3 border-b border-carbon-600 hover:bg-carbon-600 items-center group"
          :class="{ 'cursor-wait': replacing }"
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
    <div
      v-if="failed && videos.length"
      class="z-10 bg-carbon-900 px-4 py-2 border-t border-black flex items-center"
    >
      <alert-triangle-icon class="flex-shrink-0 text-gray-500"/>
      <div class="ml-4">
        <div class="font-semibold">Updating videos failed!</div>
        <div class="text-gray-300">
          Check your internet connection and make sure you're logged in on
          <a
            :href="`https://${currentRegion.domain}`"
            class="underline"
          >{{ currentRegion.domain }}</a>.
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { MapPinIcon, AlertTriangleIcon } from 'vue-feather-icons'
import Spinner from '../components/spinner.vue'

import fetchMyVideos, { getCachedVideos } from '../../libs/fetch-my-videos'
import regions from '../../libs/regions'

export default {
  props: ['settings'],
  components: { MapPinIcon, AlertTriangleIcon, Spinner },
  data: () => ({
    videos: [],
    failed: false,
    replacing: false,
  }),
  computed: {
    currentRegion() {
      return regions[this.settings.region]
    },
  },
  created() {
    if (!this.settings.region) return

    getCachedVideos().then(videos => this.videos = videos)

    fetchMyVideos()
      .then(videos => {
        const videosUnchanged = this.videos.every((video, i) => videos[i].id === video.id)
        if (videosUnchanged) return this.videos = videos

        this.replacing = true
        setTimeout(() => {
          this.videos = videos
          this.replacing = false
        }, 500)
      })
      .catch(error => {
        this.failed = true
        console.error('[RPV] Loading videos failed!', error)
      })
  },
}
</script>
