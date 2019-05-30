<template>
  <div class="flex flex-col h-screen bg-carbon-700 text-white">
    <div class="z-10 bg-carbon-900 p-3 pl-4 shadow flex items-center">
      <div>
        <div class="text-gray-500">Refined Prime Video</div>
        <div class="text-lg font-hairline">{{ screenTitle }}</div>
      </div>
      <div class="flex-grow"/>

      <template v-if="screen === 'continue-watching'">
        <icon-button
          v-if="settings.region"
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
          @click="screen = 'continue-watching'"
        >
          <check-circle-icon class="m-auto"/>
        </button>
      </template>
    </div>

    <div
      v-if="settings"
      class="flex-grow overflow-y-auto"
    >
      <my-videos-list
        v-if="screen === 'continue-watching'"
        :settings="settings"
      />
      <settings-page v-else-if="screen === 'settings'"/>
    </div>
  </div>
</template>

<script lang="ts">
import { HomeIcon, SettingsIcon, CheckCircleIcon } from 'vue-feather-icons'

import IconButton from './components/icon-button'
import MyVideosList from './components/my-videos-list'
import SettingsPage from './components/settings-page'

import settings from '../libs/settings'
import regions from '../libs/regions';

export default {
  components: { IconButton, MyVideosList, SettingsPage, HomeIcon, SettingsIcon, CheckCircleIcon },
  data: () => ({
    screen: 'continue-watching',
    settings: null,
  }),
  computed: {
    screenTitle() {
      return this.screen === 'continue-watching'
        ? 'Continue watching' : 'Extension settings'
    },
  },
  methods: {
    openHome() {
      const { domainSuffix } = regions[this.settings.region]
      const url = `https://amazon.${domainSuffix}/video`
      browser.tabs.create({ url })
    },
  },
  created() {
    settings.onChange(settings => this.settings = settings)
  },
}
</script>
