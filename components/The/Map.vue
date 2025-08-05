

<template>
  <ClientOnly>
    <TheLoadingPage v-if="mapLoading" />
    <NeshanMap
        ref="map"
        mapKey="web.6f82249a539940388cd4297a843990a2"
        service-key="service.2ef9bc7ffd1f4c7eaba538fec1ae0c8d"
        :poi="true"
        :traffic="true"
        default-type="standard-night"
        :zoom="14"
        :marker="false"
        :hide-search-container="false"
        :hide-layers="true"
        :cluster="false"
        :reverse-on-click="true"
        :popup-on-marker-hover="false"
        :markers-icon-callback="markersIconCallback"



    />
    <TheNuxtIcon icon-type="svg" :name="loading ? 'loading':'GPS'"
                 class="!svg:(w-16 h-16) absolute bottom-17 right-2 !z-10 cursor-pointer"
                 @click="currentLocation"
    />
<!--    <TheLog :data="map"/>-->
  </ClientOnly>
</template>



<script setup lang="ts">
import NeshanMap from '@neshan-maps-platform/vue3-openlayers'
import {  transform } from 'ol/proj'
import type {CreateMarkersPointsItem}  from '@neshan-maps-platform/vue3-openlayers'
const map = ref<InstanceType<typeof NeshanMap> | null>(null)
const Map = computed(() => map.value?.state.map)
const {coords,resume,pause} = useGeolocation();


const location = defineModel<{
  latitude: number
  longitude: number
  address: string
}>()
const fetchFormattedAddress = async (lat: number, lng: number) => {
  try {
    const res = await fetch(`https://api.neshan.org/v5/reverse?lat=${lat}&lng=${lng}`, {
      method: 'GET',
      headers: {
        'Api-Key': 'service.2ef9bc7ffd1f4c7eaba538fec1ae0c8d'
      }
    })
    const data = await res.json()
    if (data.status === 'OK') {
      return data.formatted_address
    } else {
      return 'آدرس یافت نشد'
    }
  } catch (error) {
    console.error('خطا در دریافت آدرس:', error)
    return 'خطا در دریافت آدرس'
  }
}


// DEFAULT CENTER --------------------------------------------------------------------------
const center = ref({
  latitude:  35.6892,
  longitude:  51.389,
})
// SET CURRENT LOCATION --------------------------------------------------------------------------
const loading = ref(false)
const currentLocation = () => {
  loading.value = true
   resume()
  loading.value = false
}
watch(() => coords.value, () => {
  pause()
  console.log(coords.value)
  Map.value?.getView().setCenter(transform([coords.value.longitude, coords.value.latitude], 'EPSG:4326', 'EPSG:3857'))
})
// MARKER --------------------------------------------------------------------------
const markersIconCallback = ({ isReverseMarker }: CreateMarkersPointsItem) => ({
  src: "/images/marker.png",
  iconScale: isReverseMarker ? 1 : undefined
})
// LOADING MAP --------------------------------------------------------------------------
const mapLoading = ref(false) // default to true until map is ready

onMounted(() => {
  const stop = watch(
      () => map.value?.state.map,
      (loadedMap) => {
        if (loadedMap) {
          stop()
          map.value?.$on('reverse', async (e: any) => {
            const [lng, lat] = transform(e.coordinate, 'EPSG:3857', 'EPSG:4326')
            const address = await fetchFormattedAddress(lat, lng)
            location.value = { latitude: lat, longitude: lng, address }
          })
        }
      }
  )
})

</script>

<style lang="scss">
@import url("@neshan-maps-platform/vue3-openlayers/dist/style.css");
.map-drawer--mobile[data-v-a45799c9]{
  @apply bg-black flex top-4 items-center bg-opacity-50 text-white shadow-none rounded-full border-none

}
.map-search-box[data-v-353796a4]{
  @apply  bg-transparent
}
.map-search-box[activated="true"][data-v-353796a4]{
  @apply bg-black  rounded-full  border-none my-0
}
.map-search-box input[type="search"][data-v-353796a4]{
  @apply rounded-full text-white
}

.map-drawer--mobile[activated="true"][data-v-a45799c9]{
  @apply bg-secondary-500 bg-opacity-95
}
.map-search-box button[data-v-353796a4]{
  @apply text-white white mt-1
}
.list-item[data-v-64c8a44d]{
  @apply text-primary-400 hover:bg-secondary-600
}
hr[data-v-64c8a44d]{
  @apply border-(gray-300 1px solid)
}
input[type="search"][data-v-353796a4]{
  @apply placeholder-(white text-sm)
}
.mobile-details-section[data-v-c083d67c]{
  @apply bg-gray-800 hidden
}

</style>