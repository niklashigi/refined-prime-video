<template>
  <base-selector
    :value="value"
    :options="options"
    v-on="$listeners"
    #option="{ option, optionId }"
  >
    <div class="text-lg">
      {{ option.emoji }}
    </div>
    <div class="ml-3">
      {{ $(`settings_showSpoilers_options_${optionId}`) }}
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
      never: { emoji: '🙈' },
      onHover: { emoji: '🔍' },
      always: { emoji: '🐵' },
    },
  }),
}
</script>
