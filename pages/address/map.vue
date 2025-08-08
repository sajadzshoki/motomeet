

<template>

  <div class=" h-[calc(100dvh-60px)] -m-4 !z-0">
    <TheNeshan ref="map" :points="points" :draw="true" :remove="true"

               >
      <TheNuxtIcon v-if="!(fromAddress && toAddress)"
                   class="!w-auto !h-12 absolute bottom-1/2 left-1/2 transform -translate-x-1/6 translate-y-1/12"
                   :name="fromAddress ? 'marker.png' : 'marker.png'" icon-type="img"/>
    </TheNeshan>
  </div>
  <div class="fixed bottom-0 right-0 p-4 !z-1 bg-secondary-700 w-full">
    <TheButton label="انتخاب مبدا" class="w-full" @click="submit"/>
  </div>
  <TheLog :data="fromAddress"/>
</template>

<script setup lang="ts">
import type {Address} from "~/types/models";
import {transform} from "ol/proj";
definePageMeta({layout:'backward'})
const backward = useState('backwardTitle')
backward.value = 'انتخاب مبدا'
// -------------------------------------------
const route = useRoute()
const fromAddress = useState<Address | undefined>('fromAddress', () => route.query.from?.map(Number))
const toAddress = useState<Address | undefined>('toAddress', () => route.query.to?.map(Number))
const loading = ref(false)
const map = ref(null)
const setData = (e: { coords: Address }) => {
  if (route.query.from && route.query.to) return
  if (route.query.from) {
    navigateTo({query: {from: route.query.from, to: e.coords}})
  } else {
    navigateTo({query: {from: e.coords}})
  }
}

const points = computed(() => {
  fromAddress.value = route.query.from?.map(Number)
  toAddress.value = route.query.to?.map(Number)
  // if (fromAddress.value && toAddress.value) estimateTimeAndKm()
  const from = fromAddress.value ? {
    image: '/images/marker.png',
    anchor: [0.2, 0.1],
    coords: fromAddress.value
  } : undefined
  const to = toAddress.value ? {
    image: '/images/marker.png',
    anchor: [0.2, 0.1],
    coords: toAddress.value
  } : undefined
  return [from, to]
})
const submit = async () => {
  if (!(fromAddress.value && toAddress.value)) {
    return setData({coords: transform(map.value?.map.getView().getCenter(), 'EPSG:3857', 'EPSG:4326')})
  }
  if (loading.value) return
  loading.value = true
  const fromFormattedAddress = await formattedAddress(fromAddress.value)
  const toFormattedAddress = await formattedAddress(toAddress.value)
  if (fromFormattedAddress && toFormattedAddress) {


  }


}

</script>