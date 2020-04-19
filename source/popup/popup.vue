<template>
  <div class="flex flex-col h-screen bg-carbon-700 text-white text-xs leading-normal">
    <div class="z-10 bg-carbon-900 p-3 pl-4 shadow flex items-center">
      <div>
        <div class="text-gray-500">Refined Prime Video</div>
        <div class="text-lg font-medium">{{ screenTitle }}</div>
      </div>
      <div class="flex-grow"/>

      <template v-if="screen === 'continueWatching'">
        <icon-button
          v-if="settings && settings.region"
          class="mr-3"
          title="Prime Video homepage"
          @click="openHome"
        >
          <home-icon class="m-auto"/>
        </icon-button>
        <icon-button
          title="Settings"
          @click="screen = 'settings'"
        >
          <settings-icon class="m-auto"/>
        </icon-button>
      </template>

      <template v-else-if="screen === 'settings'">
        <button
          class="h-10 w-10 rounded-full flex bg-carbon-600 hover:bg-carbon-500 text-gray-500 hover:text-gray-300"
          title="Done"
          @click="screen = 'continueWatching'"
        >
          <check-circle-icon class="m-auto"/>
        </button>
      </template>
    </div>

    <div
      v-if="settings"
      class="flex-grow overflow-hidden"
    >
      <continue-watching-screen
        v-if="screen === 'continueWatching'"
        :settings="settings"
      />
      <settings-screen v-else-if="screen === 'settings'"/>
    </div>
  </div>
</template>

<script lang="ts">
import { HomeIcon, SettingsIcon, CheckCircleIcon } from 'vue-feather-icons'

import IconButton from './components/icon-button.vue'

import ContinueWatchingScreen from './screens/continue-watching.vue'
import SettingsScreen from './screens/settings.vue'

import settings from '../libs/settings'
import regions from '../libs/regions'

export default {
  components: {
    HomeIcon, SettingsIcon, CheckCircleIcon, IconButton,
    ContinueWatchingScreen, SettingsScreen,
  },
  data: () => ({
    screen: 'continueWatching',
    screenTitles: {
      continueWatching: 'Continue watching',
      settings: 'Extension settings',
    },
    settings: null,
  }),
  computed: {
    screenTitle() {
      return this.screenTitles[this.screen]
    },
  },
  methods: {
    openHome() {
      const { homeUrl } = regions[this.settings.region]
      browser.tabs.create({ url: homeUrl })
    },
  },
  created() {
    settings.onChange(settings => this.settings = settings)
  },
}
</script>
