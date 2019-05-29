<template>
  <div class="flex flex-col h-screen bg-carbon-700 text-white">
    <div class="z-10 bg-carbon-900 p-3 shadow">
      What do you want to <strong>continue watching</strong>?
    </div>
    <div class="flex-grow overflow-y-auto">
      <settings-page v-if="settingsShown"/>
      <my-videos-list v-else/>
    </div>
  </div>
</template>

<script lang="ts">
import MyVideosList from './components/my-videos-list'
import SettingsPage from './components/settings-page'

export default {
  components: { MyVideosList, SettingsPage },
  data: () => ({
    settingsShown: true,
  }),
}
</script>
