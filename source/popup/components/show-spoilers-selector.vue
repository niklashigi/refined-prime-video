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
      <span class="text-lg mx-2">{{ option.emoji }}</span>
      {{ $(`settings_showSpoilers_options_${optionId}`) }}
    </label>
  </div>
</template>

<script lang="ts">
export default {
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
