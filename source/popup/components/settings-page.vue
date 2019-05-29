<template>
  <div>
    <div class="px-5 py-4">
      <div class="mb-1 font-semibold">
        What's your preferred Amazon site?
      </div>
      <div class="mb-3 text-gray-400">
        This is used to fetch your <em>Continue watching</em> list.
      </div>
      <site-selector v-model="settings.preferredSite"/>
    </div>
    <div class="px-5 py-4 border-t border-carbon-500">
      <div class="mb-1 font-semibold">
        When should spoilers be displayed?
      </div>
      <div class="mb-3 text-gray-400">
        Thumbnails and descriptions of episodes you haven't watched yet are considered spoilers.
      </div>
      <show-spoilers-selector v-model="settings.showSpoilers"/>
    </div>
  </div>
</template>

<script lang="ts">
import settings from '../../libs/settings'

import SiteSelector from './site-selector'
import ShowSpoilersSelector from './show-spoilers-selector'

export default {
  components: { SiteSelector, ShowSpoilersSelector },
  data: () => ({
    settings: {},
  }),
  watch: {
    settings: {
      handler(newSettings) {
        settings.set(newSettings)
      },
      deep: true,
    }
  },
  async created() {
    this.settings = await settings.getAll()
  },
}
</script>
