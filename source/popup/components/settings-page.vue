<template>
  <div v-if="settings">
    <div
      ref="regionSection"
      class="px-5 py-4"
    >
      <div class="mb-1 font-semibold">
        {{ $('settings_region_title') }}
      </div>
      <div
        class="mb-3 text-gray-400"
        v-html="$('settings_region_description')"
      />
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
        {{ $('settings_showSpoilers_title') }}
      </div>
      <div class="mb-3 text-gray-400">
        {{ $('settings_showSpoilers_description') }}
      </div>
      <show-spoilers-selector
        v-model="settings.showSpoilers"
        @collapse="$refs.showSpoilersSection.scrollIntoView({ behavior: 'smooth', block: 'center' })"
      />
    </div>
    <div class="px-5 py-4 bg-carbon-600 border-t border-carbon-500">
      <div class="mb-1 font-semibold">
        {{ $('support_title') }}
      </div>
      <div class="mb-3 text-gray-400">
        {{ $('support_description') }}
      </div>
      <support-section/>
    </div>
  </div>
</template>

<script lang="ts">
import settings from '../../libs/settings'

import RegionSelector from './region-selector'
import ShowSpoilersSelector from './show-spoilers-selector'
import SupportSection from './support-section'

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
