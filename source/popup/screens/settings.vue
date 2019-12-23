<template>
  <div
    v-if="settings"
    class="h-full overflow-y-auto"
  >
    <div
      ref="regionSection"
      class="px-5 py-4"
    >
      <div class="mb-1 font-semibold">
        What's your Prime Video region?
      </div>
      <div class="mb-3 text-gray-400">
        This is used to fetch your <em>Continue watching</em> list.
      </div>
      <region-selector
        v-model="settings.region"
        @collapse="$refs.regionSection.scrollIntoView({ behavior: 'smooth' })"
      />
    </div>
    <div
      ref="showSpoilersSection"
      class="px-5 py-4 border-t border-carbon-500"
    >
      <div class="mb-1 font-semibold">
        When should spoilers be displayed?
      </div>
      <div class="mb-3 text-gray-400">
        Thumbnails and descriptions of episodes you haven't watched yet are considered spoilers.
      </div>
      <show-spoilers-selector
        v-model="settings.showSpoilers"
        @collapse="$refs.showSpoilersSection.scrollIntoView({ behavior: 'smooth', block: 'center' })"
      />
    </div>
    <div class="px-5 py-4 bg-carbon-600 border-t border-carbon-500">
      <div class="mb-1 font-semibold">
        Do you enjoy using Refined Prime Video?
      </div>
      <div class="mb-3 text-gray-400">
        Here are some things you can do to support the project. Your help is greatly appreciated.
      </div>
      <support-section/>
    </div>
  </div>
</template>

<script lang="ts">
import settings from '../../libs/settings'

import RegionSelector from '../components/region-selector'
import ShowSpoilersSelector from '../components/show-spoilers-selector'
import SupportSection from '../components/support-section'

export default {
  components: { RegionSelector, ShowSpoilersSelector, SupportSection },
  data: () => ({
    settings: null,
  }),
  watch: {
    settings: {
      handler(newSettings) {
        settings.setAll(newSettings)
      },
      deep: true,
    }
  },
  async created() {
    this.settings = await settings.getAll()
  },
}
</script>
