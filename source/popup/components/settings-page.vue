<template>
  <div>
    <div class="p-5">
      <div class="mb-1 font-semibold">
        What's your preferred Amazon site?
      </div>
      <div class="mb-3 text-gray-400">
        This is used to fetch your <em>Continue watching</em> list.
      </div>
      <site-selector v-model="settings.preferredSite"/>
    </div>
  </div>
</template>

<script lang="ts">
import SiteSelector from './site-selector'

export default {
  components: { SiteSelector },
  data: () => ({
    settings: {
      preferredSite: 'de',
    },
  }),
}
</script>
