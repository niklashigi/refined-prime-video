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
    <div>
      <footer-section/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

import settings, { Settings } from '../../libs/settings'

import RegionSelector from '../components/region-selector.vue'
import ShowSpoilersSelector from '../components/show-spoilers-selector.vue'
import FooterSection from '../components/footer-section.vue'

export default defineComponent({
  components: { RegionSelector, ShowSpoilersSelector, FooterSection },
  setup() {
    const currentSettings = ref<Settings | null>(null)

    settings.getAll()
      .then(newSettings => currentSettings.value = newSettings)

    watch(() => currentSettings.value, newSettings => {
      settings.setAll(newSettings!)
    }, { deep: true })

    return { settings: currentSettings }
  },
})
</script>
