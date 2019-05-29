<template>
  <div class="flex flex-col h-screen bg-carbon-700 text-white">
    <div class="z-10 bg-carbon-900 p-3 shadow flex items-center justify-between">
      <template v-if="screen === 'continue-watching'">
        <div>What do you want to <strong>continue watching</strong>?</div>
        <button
          class="py-1 px-2 rounded bg-carbon-600 hover:bg-carbon-500 text-gray-300 hover:text-gray-200"
          @click="screen = 'settings'"
        >Settings</button>
      </template>
      <template v-else-if="screen === 'settings'">
        <div><strong>Refined Prime Video</strong> settings</div>
        <button
          class="py-1 px-2 rounded bg-carbon-600 hover:bg-carbon-500 text-gray-300 hover:text-gray-200"
          @click="screen = 'continue-watching'"
        >Go back</button>
      </template>
    </div>

    <div class="flex-grow overflow-y-auto">
      <my-videos-list v-if="screen === 'continue-watching'"/>
      <settings-page v-else-if="screen === 'settings'"/>
    </div>
  </div>
</template>

<script lang="ts">
import MyVideosList from './components/my-videos-list'
import SettingsPage from './components/settings-page'

export default {
  components: { MyVideosList, SettingsPage },
  data: () => ({
    screen: 'continue-watching',
  }),
}
</script>
