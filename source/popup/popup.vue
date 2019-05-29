<template>
  <div class="flex flex-col h-screen bg-carbon-700 text-white">
    <div class="z-10 bg-carbon-900 p-3 shadow">
      What do you want to <strong>continue watching</strong>?
    </div>
    <my-videos-list class="flex-grow overflow-y-auto"/>
  </div>
</template>

<script lang="ts">
import MyVideosList from './components/my-videos-list'

export default {
  components: { MyVideosList },
}
</script>
