<template>
  <div class="rounded overflow-hidden">
    <button
      class="w-full px-3 py-2 flex items-center cursor-pointer bg-carbon-500 hover:bg-carbon-400"
      @click="toggleExpanded"
    >
      <slot name="option" :option="selectedOption"/>

      <chevron-up-icon v-if="expanded" class="text-gray-400"/>
      <chevron-down-icon v-else class="text-gray-400"/>
    </button>

    <div v-if="expanded" class="bg-carbon-900">
      <button
        v-for="(option, optionId) in options"
        :key="optionId"
        :for="`option-${optionId}`"
        class="w-full px-3 py-2 flex items-center cursor-pointer hover:bg-carbon-600"
        @click="selectOption(optionId)"
      >
        <slot name="option" :option="option"/>
        <check-icon v-if="optionId === value" class="text-gray-500"/>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { ChevronUpIcon, ChevronDownIcon, CheckIcon } from 'vue-feather-icons'

export default {
  components: { ChevronUpIcon, ChevronDownIcon, CheckIcon },
  props: {
    value: String,
    options: Object,
    fallbackOption: Object,
  },
  data: () => ({
    expanded: false,
  }),
  computed: {
    selectedOption() {
      return this.options[this.value] || this.fallbackOption
    },
  },
  methods: {
    selectOption(optionId) {
      this.$emit('input', optionId)
      this.toggleExpanded()
    },
    toggleExpanded() {
      this.expanded = !this.expanded

      if (this.expanded) {
        this.$nextTick(() => this.$el.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        }))
      } else {
        this.$emit('collapse')
      }
    },
  }
}
</script>
