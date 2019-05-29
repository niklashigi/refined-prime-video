<template>
  <div>
    <label
      v-for="(option, optionId) in options"
      :key="optionId"
      :for="`show-spoilers-${optionId}`"
      class="flex items-center cursor-pointer"
    >
      <input
        type="radio"
        :id="`show-spoilers-${optionId}`"
        :checked="value === optionId"
        @input="$emit('input', optionId)"
        class="form-radio cursor-pointer text-xl"
      >
      <span class="text-lg mx-2">
        {{ option.emoji }}
      </span>
      {{ option.description }}
    </label>
  </div>
</template>

<script lang="ts">
export default {
  props: ['value'],
  data: () => ({
    options: {
      never: { emoji: '🙈', description: 'Never show spoilers' },
      onHover: { emoji: '🔍', description: 'When hovering over an episode' },
      always: { emoji: '🐵', description: 'Always show spoilers' },
    },
  }),
}
</script>
