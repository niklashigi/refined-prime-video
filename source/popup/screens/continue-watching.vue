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
      <div v-else class="h-full overflow-y-auto overflow-x-hidden">
        <transition-group
          move-class="transition-transform duration-500 ease-in-out"
          enter-from-class="opacity-0 -translate-x-6"
          enter-active-class="transition duration-500 ease-out transform"
          leave-active-class="transition duration-500 ease-in transform absolute"
          leave-to-class="opacity-0 translate-x-6"
        >
          <video-item
            v-for="video in videos"
            :key="video.id"
            :video="video"
          />
        </transition-group>
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
import { defineComponent, ref, PropType, computed } from 'vue'

import MapPinIcon from '~feather-icons/map-pin.svg'
import AlertTriangleIcon from '~feather-icons/alert-triangle.svg'

import Spinner from '../components/spinner.vue'
import VideoItem from '../components/video-item.vue'

import { Settings } from '../../libs/settings'
import fetchMyVideos, { getCachedVideos, Video } from '../../libs/fetch-my-videos'
import regions from '../../libs/regions'

export default defineComponent({
  components: { MapPinIcon, AlertTriangleIcon, Spinner, VideoItem },
  props: {
    settings: {
      type: Object as PropType<Settings>,
      required: true,
    },
  },
  setup(props) {
    const failed = ref(false)
    const videos = ref<Video[]>([])
    const currentRegion = computed(() => {
      return regions[props.settings.region!]
    })

    if (props.settings.region) {
      getCachedVideos()
        .then(newVideos => videos.value = newVideos)

      fetchMyVideos()
        .then(newVideos => videos.value = newVideos)
        .catch(error => {
          failed.value = true
          console.error('[RPV] Loading videos failed!', error)
        })
    }

    return { failed, videos, currentRegion }
  },
})
</script>
