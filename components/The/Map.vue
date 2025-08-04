

<template>
  <ClientOnly>
    <NeshanMap
        ref="map"
        mapKey="web.6f82249a539940388cd4297a843990a2"
        service-key="service.2ef9bc7ffd1f4c7eaba538fec1ae0c8d"
        :poi="true"
        :traffic="true"
        default-type="standard-night"
        :zoom="14"
        :marker="false"
        :hide-search-container="true"
        :hide-layers="false"
        :cluster="true"
        :center="center"
        :reverse-on-click="true"
        :popup-on-marker-hover="false"

    />
<!--    <TheNuxtIcon icon-type="svg" name="Gps"-->
<!--                 class="!svg:(w-26 h-26) absolute bottom-15 right-2 !z-10 cursor-pointer"-->
<!--                 @click="currentLocation"-->
<!--    />-->
<!--    <TheLog :data="map"/>-->
  </ClientOnly>
</template>
<style>
@import '@neshan-maps-platform/vue3-openlayers/dist/style.css';
</style>
<script setup lang="ts">
import NeshanMap from '@neshan-maps-platform/vue3-openlayers'
const map = ref<InstanceType<typeof NeshanMap> | null>(null)
const {coords,resume,pause} = useGeolocation();
const center = ref({
  latitude:  35.6892,
  longitude:  51.389,
})
</script>