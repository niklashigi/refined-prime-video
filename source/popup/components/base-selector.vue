<template>
  <div
    class="rounded overflow-hidden"
    ref="root"
  >
    <button
      class="w-full px-3 py-2 flex items-center cursor-pointer bg-carbon-500 hover:bg-carbon-400"
      @click="toggleExpanded"
    >
      <div class="flex-grow flex items-center">
        <slot
          name="option"
          :option="selectedOption"
          :option-id="modelValue"
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

        <check-icon v-if="optionId === modelValue" class="text-gray-500"/>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, nextTick, PropType } from 'vue'

import ChevronUpIcon from '~feather-icons/chevron-up.svg'
import ChevronDownIcon from '~feather-icons/chevron-down.svg'
import CheckIcon from '~feather-icons/check.svg'

export default defineComponent({
  components: { ChevronUpIcon, ChevronDownIcon, CheckIcon },
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    options: {
      type: Object as PropType<Record<string, any>>,
      required: true,
    },
    fallbackOption: Object as PropType<any>,
  },
  setup(props, context) {
    const root = ref<HTMLElement | null>(null)

    const expanded = ref(false)
    const toggleExpanded = () => {
      expanded.value = !expanded.value

      nextTick(() => {
        if (expanded.value) {
          root.value!.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          })
        } else {
          context.emit('collapse')
        }
      })
    }

    const selectedOption =
      computed(() => props.options[props.modelValue] || props.fallbackOption)
    const selectOption = (optionId: string) => {
      context.emit('update:modelValue', optionId)
      toggleExpanded()
    }

    return { root, expanded, toggleExpanded, selectedOption, selectOption }
  },
})
</script>
