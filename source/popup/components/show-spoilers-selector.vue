<template>
  <base-selector
    :value="value"
    :options="options"
    v-on="$listeners"
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
import BaseSelector from './base-selector'

export default {
  components: { BaseSelector },
  props: ['value'],
  data: () => ({
    options: {
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
    },
  }),
}
</script>
