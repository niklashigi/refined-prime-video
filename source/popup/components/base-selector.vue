<template>
  <div class="rounded overflow-hidden">
    <button
      class="w-full px-3 py-2 flex items-center cursor-pointer bg-carbon-500 hover:bg-carbon-400"
      @click="toggleExpanded"
    >
      <div class="flex-grow flex items-center">
        <slot
          name="option"
          :option="selectedOption"
          :option-id="value"
        />
      </div>

      <chevron-up-icon v-if="expanded" class="text-gray-400"/>
      <chevron-down-icon v-else class="text-gray-400"/>
    </button>

    <div v-if="expanded" class="bg-carbon-900">
      <button
        v-for="(option, optionId) in options"
        :key="optionId"
        :for="`option-${optionId}`"
        class="w-full px-3 py-1 flex items-center cursor-pointer hover:bg-carbon-600"
        @click="selectOption(optionId)"
      >
        <div class="flex-grow flex items-center">
          <slot
            name="option"
            :option="option"
            :option-id="optionId"
          />
        </div>

        <check-icon v-if="optionId === value" class="text-gray-500"/>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import ChevronUpIcon from '~feather-icons/chevron-up.svg'
import ChevronDownIcon from '~feather-icons/chevron-down.svg'
import CheckIcon from '~feather-icons/check.svg'

export default Vue.extend({
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
    selectedOption(): any {
      return this.options[this.value] || this.fallbackOption
    },
  },
  methods: {
    selectOption(optionId: string) {
      this.$emit('input', optionId)
      this.toggleExpanded()
    },
    toggleExpanded() {
      this.expanded = !this.expanded

      this.$nextTick(() => {
        if (this.expanded) {
          this.$el.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          })
        } else {
          this.$emit('collapse')
        }
      })
    },
  },
})
</script>
