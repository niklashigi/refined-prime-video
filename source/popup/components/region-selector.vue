<template>
  <div>
    <label
      v-for="(region, regionId) in regions"
      :key="regionId"
      :for="`region-${regionId}`"
      class="flex items-center cursor-pointer"
    >
      <input
        type="radio"
        :id="`region-${regionId}`"
        :checked="value === regionId"
        @input="$emit('input', regionId)"
        class="form-radio cursor-pointer text-xl"
      >
      <span class="text-lg mx-2">
        {{ region.flag }}
      </span>
      amazon.<span class="font-medium">{{ region.domainSuffix }}</span>
    </label>
  </div>
</template>

<script lang="ts">
import regions from '../../libs/regions'

export default {
  props: ['value'],
  data: () => ({
    regions,
  }),
}
</script>
