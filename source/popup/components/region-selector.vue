<template>
  <base-selector
    v-bind="$attrs"
    :model-value="modelValue"
    :options="regions"
    :fallback-option="{
      flag: '❓',
      name: 'No region selected',
      domain: 'Click to select your region.'
    }"
    #option="{ option: region }"
  >
    <div class="text-lg">
      {{ region.flag }}
    </div>
    <div class="ml-3">
      <div class="font-medium">
        {{ region.name }}
      </div>
      <div class="text-gray-400 leading-tight">
        {{ region.domain }}
      </div>
    </div>
  </base-selector>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import regions from '../../libs/regions'

import BaseSelector from './base-selector.vue'

export default defineComponent({
  components: { BaseSelector },
  props: ['modelValue'],
  setup() {
    return { regions }
  },
})
</script>
