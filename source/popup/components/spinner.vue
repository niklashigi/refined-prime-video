<template>
  <div
    class="spinner"
    :style="spinnerStyle"
  />
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'

export default defineComponent({
  props: {
    size: { type: Number, default: 32 },
    lineSize: { type: Number, default: 3 },
    lineBackground: { type: String, default: '#445869' },
    lineColor: { type: String, default: '#959595' },
    speed: { type: Number, default: .8 },
  },
  setup(props) {
    const spinnerStyle = computed(() => ({
      border: `${props.lineSize}px solid ${props.lineBackground}`,
      borderTop: `${props.lineSize}px solid ${props.lineColor}`,
      width: `${props.size}px`,
      height: `${props.size}px`,
      animation: `spin ${props.speed}s linear infinite`,
    }))

    return { spinnerStyle }
  },
})
</script>
