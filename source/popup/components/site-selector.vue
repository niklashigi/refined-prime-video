<template>
  <div>
    <label
      v-for="(site, siteId) in sites"
      :key="siteId"
      :for="`site-${siteId}`"
      class="flex items-center cursor-pointer"
    >
      <input
        type="radio"
        :id="`site-${siteId}`"
        :checked="value === siteId"
        @input="$emit('input', siteId)"
        class="form-radio cursor-pointer text-xl"
      >
      <span class="text-lg mx-2">
        {{ site.flag }}
      </span>
      amazon.<span class="font-medium">{{ site.domainSuffix }}</span>
    </label>
  </div>
</template>

<script lang="ts">
import sites from '../../libs/sites'

export default {
  props: ['value'],
  data: () => ({
    sites,
  }),
}
</script>
