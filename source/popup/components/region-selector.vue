<template>
  <div class="rounded overflow-hidden">
    <button
      v-if="currentRegion"
      class="w-full px-3 py-2 flex items-center cursor-pointer bg-carbon-500 hover:bg-carbon-400"
      @click="toggleExpanded"
    >
      <div class="text-lg">
        {{ currentRegion.flag }}
      </div>
      <div class="ml-3 flex-grow">
        <div class="font-medium">
          {{ currentRegion.name }}
        </div>
        <div class="text-gray-400 leading-tight">
          {{ currentRegion.domain }}
        </div>
      </div>
      <chevron-up-icon v-if="expanded" class="text-gray-400"/>
      <chevron-down-icon v-else class="text-gray-400"/>
    </button>

    <div v-if="expanded" class="bg-carbon-900">
      <button
        v-for="(region, regionId) in regions"
        :key="regionId"
        :for="`region-${regionId}`"
        class="w-full px-3 py-2 flex items-center cursor-pointer hover:bg-carbon-600"
        @click="selectRegion(regionId)"
      >
        <div class="text-lg">
          {{ region.flag }}
        </div>
        <div class="ml-3 flex-grow">
          <div class="font-medium">
            {{ region.name }}
          </div>
          <div class="text-gray-400 leading-tight">
            {{ region.domain }}
          </div>
        </div>
        <check-icon v-if="regionId === value" class="text-gray-500"/>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { ChevronUpIcon, ChevronDownIcon, CheckIcon } from 'vue-feather-icons'

import regions from '../../libs/regions'

export default {
  components: { ChevronUpIcon, ChevronDownIcon, CheckIcon },
  props: ['value'],
  data: () => ({
    regions,
    expanded: false,
  }),
  computed: {
    currentRegion() {
      return this.regions[this.value] || {
        flag: '❓',
        name: 'No region selected',
        domain: 'Click to select your region.'
      }
    },
  },
  methods: {
    selectRegion(regionId) {
      this.$emit('input', regionId)
      this.toggleExpanded()
    },
    toggleExpanded() {
      this.expanded = !this.expanded

      if (this.expanded) {
        this.$nextTick(() => this.$el.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        }))
      } else {
        this.$emit('collapse')
      }
    },
  }
}
</script>
