<template>
  <div class="flex flex-col h-full w-full text-xs leading-normal">
    <div class="z-10 bg-carbon-900 p-3 pl-4 shadow flex items-center">
      <div>
        <div class="text-gray-500">Refined Prime Video</div>
        <div class="text-lg font-medium">{{ screenTitle }}</div>
      </div>
      <div class="flex-grow" />

      <template v-if="screen === 'continueWatching'">
        <icon-button
          v-if="homeUrl"
          class="mr-3"
          title="Prime Video homepage"
          tag="a"
          :href="homeUrl"
          @click="trackEvent('open-home')"
        >
          <home-icon class="m-auto" />
        </icon-button>
        <icon-button title="Settings" @click="screen = 'settings'">
          <settings-icon class="m-auto" />
        </icon-button>
      </template>

      <template v-else-if="screen === 'settings'">
        <button
          class="
            h-10
            w-10
            rounded-full
            flex
            bg-carbon-600
            hover:bg-carbon-500
            text-gray-500
            hover:text-gray-300
          "
          title="Done"
          @click="screen = 'continueWatching'"
        >
          <check-circle-icon class="m-auto" />
        </button>
      </template>
    </div>

    <div v-if="settings" class="flex-grow overflow-hidden">
      <continue-watching-screen
        v-if="screen === 'continueWatching'"
        :settings="settings"
        @open-settings="screen = 'settings'"
      />
      <settings-screen v-else-if="screen === 'settings'" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'

import HomeIcon from '~feather-icons/home.svg'
import SettingsIcon from '~feather-icons/settings.svg'
import CheckCircleIcon from '~feather-icons/check-circle.svg'

import IconButton from './components/icon-button.vue'

import ContinueWatchingScreen from './screens/continue-watching.vue'
import SettingsScreen from './screens/settings.vue'

import useSettings from './use/settings'
import regions from '../libs/regions'
import trackEvent from '../libs/track-event'

const screenTitles = {
  continueWatching: 'Continue watching',
  settings: 'Extension settings',
} as Record<string, string>

export default defineComponent({
  components: {
    HomeIcon,
    SettingsIcon,
    CheckCircleIcon,
    IconButton,
    ContinueWatchingScreen,
    SettingsScreen,
  },
  setup() {
    const screen = ref('continueWatching')
    const screenTitle = computed(() => screenTitles[screen.value])

    const settings = useSettings()

    const homeUrl = computed(() => {
      const regionId = settings.value?.region
      return regionId ? regions[regionId]?.homeUrl : undefined
    })

    return { screen, screenTitle, settings, homeUrl, trackEvent }
  },
})
</script>
