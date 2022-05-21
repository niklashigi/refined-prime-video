<template>
  <component
    :is="tag"
    class="h-10 w-10 rounded-full flex bg-carbon-600 hover:bg-carbon-500 text-gray-500 hover:text-gray-300"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    tag: { type: String, default: 'button' },
  },
})
</script>
