<template>
  <base-selector
    v-bind="$attrs"
    :model-value="modelValue"
    :options="options"
    #option="{ option }"
  >
    <div class="text-lg">
      {{ option.emoji }}
    </div>
    <div class="ml-3">
      {{ option.label }}
    </div>
  </base-selector>
</template>

<script lang="ts">
import BaseSelector from './base-selector.vue'

import { defineComponent } from 'vue'

const options = {
  never: {
    emoji: '🙈',
    label: 'Never show spoilers',
  },
  onHover: {
    emoji: '🔍',
    label: 'Show spoilers on hover',
  },
  always: {
    emoji: '🐵',
    label: 'Always show spoilers',
  },
}

export default defineComponent({
  components: { BaseSelector },
  props: ['modelValue'],
  setup() {
    return { options }
  },
})
</script>
