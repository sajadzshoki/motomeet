

<template>
<div class="h-full flexCol grow-1 children:(grow-1)">

  <div class="  -m-4 !z-0">
    <TheNeshan
        ref="map"
        :points="points"
        :draw="true"
        :remove="true"
        gps-class="-top-130"
        @select-point="handleMapClick"
    >
      <TheNuxtIcon v-if="!(rideForm.fromAddress && rideForm.toAddress)"
                   class="!w-auto !h-12 absolute bottom-1/2 left-1/2 transform -translate-x-1/6 translate-y-1/12"
                   :name="rideForm.fromAddress ? 'finishMarker.png' : 'startMarker.png'" icon-type="img"/>
    </TheNeshan>
  </div>
  <div class="fixed bottom-0 right-0 p-4 !z-1 bg-secondary-700 w-full flexCol gap-4">
    <TheInput placeholder="آدرس مبدا" prepend-icon="location" v-model="rideForm.fromAddress"  />
    <TheInput placeholder="آدرس مقصد" prepend-icon="location" />
    <TheButton
        :label="!rideForm.fromAddress ?  ('ثبت مبدا') : (rideForm.fromAddress && rideForm.toAddress) ?  ('بعدی') :  ('ثبت مقصد')"
        @click="submit" class="w-full"
        :loading="loading"
    />
  </div>
</div>
<!--  <TheLog :data="formattedAddress([51.205828721994806,35.76006265578013])"/>-->
</template>

<script setup lang="ts">
import type {Address} from "~/types/models";
import {transform} from "ol/proj";
import {formattedAddress} from "~/composables/global";
definePageMeta({layout:'backward'})
const backward = useState('backwardTitle')
backward.value = 'انتخاب مبدا'
// -------------------------------------------
const route = useRoute()
// const fromAddress = useState<Address | undefined>('fromAddress', () => route.query.from?.map(Number))
// const toAddress = useState<Address | undefined>('toAddress', () => route.query.to?.map(Number))
const loading = ref(false)
const map = ref(null)
const rideForm = useLocalStorage('rideForm', {
  fromAddress: '',
  toAddress: '',
})
const fromAddressDetail = computed(()=>formattedAddress(51.205828721994806,35.76006265578013))
const setData =async  (e: { coords: Address }) => {

  if (route.query.from && route.query.to) return
  if (route.query.from) {
    navigateTo({query: {from: route.query.from, to: e.coords}})
  } else {
    navigateTo({query: {from: e.coords}})
  }

}
const handleMapClick = async (pointData: { coords: Address }) => {
  try {
    // Get the address from coordinates
    const address = await formattedAddress(pointData.coords);

    // Update the form based on which field needs to be filled
    if (!rideForm.value.fromAddress) {
      rideForm.value.fromAddress = address;
    } else if (!rideForm.value.toAddress) {
      rideForm.value.toAddress = address;
    }

    // You can also update the points immediately
    if (!rideForm.value.fromAddress) {
      navigateTo({ query: { from: pointData.coords } });
    } else {
      navigateTo({ query: { from: route.query.from, to: pointData.coords } });
    }
  } catch (error) {
    console.error('Error getting address:', error);
  }
};
const points = computed(() => {
  rideForm.value.fromAddress = route.query.from?.map(Number)
  rideForm.value.toAddress = route.query.to?.map(Number)

  // if (fromAddress.value && toAddress.value) estimateTimeAndKm()
  const from = rideForm.value.fromAddress ? {
    image: '/images/startMarker.png',
    anchor: [0.1, -0.2],
    coords: rideForm.value.fromAddress
  } : undefined
  const to = rideForm.value.toAddress ? {
    image: '/images/finishMarker.png',
    anchor: [0.1, -0.2],
    coords: rideForm.value.toAddress
  } : undefined
  return [from, to]
})
const submit = async () => {
  if (!(rideForm.value.fromAddress && rideForm.value.toAddress)) {
    const center = transform(
        map.value?.map.getView().getCenter(),
        'EPSG:3857',
        'EPSG:4326'
    );
    const address = await formattedAddress(center);

    if (!rideForm.value.fromAddress) {
      rideForm.value.fromAddress = address;
      navigateTo({ query: { from: center } });
    } else {
      rideForm.value.toAddress = address;
      navigateTo({ query: { from: route.query.from, to: center } });
    }
    return;
  }

  if (loading.value) return;
  loading.value = true;

  try {
    navigateTo({ name: 'ride-add' });
  } finally {
    loading.value = false;
  }
};

</script>