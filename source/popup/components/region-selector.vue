<template>
  <base-selector
    :value="value"
    :options="regions"
    :fallback-option="{
      flag: '❓',
      name: 'No region selected',
      domain: 'Click to select your region.'
    }"
    v-on="$listeners"
    #option="{ option: region }"
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
  </base-selector>
</template>

<script lang="ts">
import regions from '../../libs/regions'

import BaseSelector from './base-selector'

export default {
  components: { BaseSelector },
  props: ['value'],
  data: () => ({
    regions,
  }),
}
</script>
