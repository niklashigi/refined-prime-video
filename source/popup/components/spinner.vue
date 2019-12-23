<template>
  <div
    class="spinner"
    :style="spinnerStyle"
  />
</template>

<script lang="ts">
export default {
  name: 'spinner',
  props: {
    size: { type: Number, default: 32 },
    lineSize: { type: Number, default: 3 },
    lineBackground: { type: String, default: '#445869' },
    lineColor: { type: String, default: '#959595' },
    speed: { type: Number, default: .8 },
  },
  computed: {
    spinnerStyle() {
      return {
        border: `${this.lineSize}px solid ${this.lineBackground}`,
        borderTop: `${this.lineSize}px solid ${this.lineColor}`,
        width: `${this.size}px`,
        height: `${this.size}px`,
        animation: `spin ${this.speed}s linear infinite`,
      }
    },
  },
}
</script>
