

<template>
  <ClientOnly>
<!--    <TheLoadingPage v-if="mapLoading" />-->
    <NeshanMap
        ref="map"
        mapKey="web.6f82249a539940388cd4297a843990a2"
        service-key="service.2ef9bc7ffd1f4c7eaba538fec1ae0c8d"
        :poi="true"
        :traffic="true"
        default-type="standard-night"
        :zoom="13"
        :marker="false"
        :hide-search-container="false"
        :hide-layers="true"
        :cluster="false"
        :reverse-on-click="false"
        :popup-on-marker-hover="false"

        @click="handleMapClick"



    />
    <TheNuxtIcon icon-type="svg" name="GPS"
                 class="!svg:(w-16 h-16) absolute bottom-17 right-2 !z-10 cursor-pointer"
                 @click="currentLocation"
    />
<!--    <TheLog :data="map"/>-->
  </ClientOnly>
</template>


<script setup lang="ts">
import {ref, watch, defineEmits} from 'vue'
import {fromLonLat, transform} from 'ol/proj'
import {Feature} from 'ol'

import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import NeshanMap from '@neshan-maps-platform/vue3-openlayers'
import {toLonLat} from 'ol/proj'
import type {Address, Point as PointType} from '~/types/app'

import {Vector} from "ol/layer";
import {Vector as SourceVector} from "ol/source";
import {Style, Icon, Stroke} from "ol/style";
import {Geometry, Point} from "ol/geom";

import {Polyline} from "ol/format";
const emit = defineEmits(['update:modelValue','updateCourierLocation'])
const route = useRoute();
const setCenterMap = useLocalStorage('setCenterMap',{});

const {coords, resume, pause} = useGeolocation();
// const props = defineProps({
//   modelValue: {
//     type: Object as () => { lat: number; lng: number } | null,
//     default: null,
//   },
//   showDefaultMarker:{
//     type: Boolean ,
//     default: false
//   },
//   points :{
//     type:PointType
//   },
//   line:{
//     type:String
//   },
//   remove:{
//     type:Boolean
//   },
//   draw:{
//     type:Boolean
//   }
// })
const locationValue = defineModel()
const props = defineProps<{
  modelValue?:any
  showDefaultMarker?:boolean
  points?: (PointType | undefined)[]
  line?: string
  draw?: boolean
  remove?: boolean,
  address?: string
  noSearch?: boolean
}>()

const currentLocation = () => {
  Map.value?.getView().setCenter(transform([coords.value.longitude, coords.value.latitude], 'EPSG:4326', 'EPSG:3857'))
}
watch(() => coords.value, async () => {
  pause()
  console.log('coords.value: ',coords.value)
  emit('updateCourierLocation',coords.value)
  Map.value?.getView().setCenter(transform([coords.value.longitude, coords.value.latitude], 'EPSG:4326', 'EPSG:3857'))
})
const center = ref({
  latitude: props.modelValue?.lat || 35.6892,
  longitude: props.modelValue?.lng || 51.389,
})

const map = ref<InstanceType<typeof NeshanMap> | null>(null)
const Map = computed(() => map.value?.state.map)
function handleMapClick(e: any) {
  if (!e) return

  let lat, lng, apiData

  console.log('e: ', e);

  if (e.coords[0] && e.coords[1]) {
    lat = e.coords[1]
    lng = e.coords[0]
  }

  if (e.apiData) {
    apiData = e.apiData
  }
  // Case 2: Convert from map projection
  else if (e.coordinate) {
    const [cLng, cLat] = toLonLat(e.coordinate)
    lat = cLat
    lng = cLng
  } else {
    console.warn('Map click event is invalid:', e)
    return
  }
  locationValue.value = {lat:lat, lng:lng,apiData:apiData}
  emit('update:modelValue', {lat, lng, apiData})
  addMarker(lat, lng)
}

function addMarker(lat: number, lng: number) {
  const layer = new VectorLayer({
    source: new VectorSource({
      features: [
        new Feature({
          geometry: new Point(fromLonLat([lng, lat]))
        })
      ]
    }),
    // style: new Style({
    //   image: new Icon({
    //     anchor: [0.5, 0.5],
    //     src: '/images/marker.png'
    //   })
    // })
  })

  const layers = map.value?.state?.map?.getLayers()
  layers.forEach((l: any) => {
    if (l instanceof VectorLayer) map.value?.state?.map?.removeLayer(l)
  })
  map.value?.state?.map?.addLayer(layer)
}
const filteredPoints = computed(() => props.points.filter(e => e) as PointType[])

const addVector = (e: PointType) => {
  return new Vector({
    source: new SourceVector(),
    style: new Style({
      image: new Icon({
        src: e?.image,
        anchor: e?.anchor || [0.5, 0],
        anchorOrigin: 'bottom-left'
      }),
    }),
  });
}

const dataToFeature = (e: PointType) => {
  return new Feature(new Point(fromLonLat(e.coords)))
}

let addedLayers: Vector<SourceVector<Feature<Geometry>>>[] = []
const drawLine = (l: string) => {
  const format = new Polyline({factor: 1e5})
  const line = format.readGeometry(l, {
    dataProjection: 'EPSG:4326',
    featureProjection: 'EPSG:3857'
  });
  const feature = new Feature({type: 'route', geometry: line});
  const source = new Vector({
    source: new SourceVector(),
    style: new Style({
      stroke: new Stroke({
        width: 6, color: '#AEDBC7'
      })
    }),
  });
  source.getSource()?.addFeature(feature)
  addedLayers.push(source)
  // map.value?.state?.map?.addLayer(source)
}

const refreshPoints = async () => {
  if (props.remove) {
    addedLayers.map((l) => {
      const layers = map.value?.state?.map?.getLayers()
      const ll = layers.getArray().findIndex(e => e.ol_uid === l.ol_uid)
      layers?.removeAt(ll)
    })
    addedLayers = []
    // const layers = map.value?.state?.map?.getLayers()
    // console.log(layers?.array_?.length)
    // for (let i = 0; i < layers?.array_?.length; i++) {
    //   const l = layers.array_[i]
    //   console.log(i, l?.style_)
    //   if (l?.style_) {
    //     console.log(i, l)
    //     await map.value?.state?.map?.removeLayer(l)
    //   }
    // }
    // console.log(layers)
  }
  // map.value?.state?.map?.addLayer(layer);
  filteredPoints.value.forEach((e) => {
    const layer = addVector(e)
    layer?.getSource()?.addFeature(dataToFeature(e));
    addedLayers.push(layer)
  })
  if (props.draw && filteredPoints.value.length === 2) {
    const line = await direction(props.points[0]?.coords as Address, props.points[1]?.coords as [number, number])
    drawLine(line)
  }
  addedLayers.map(l => map.value?.state?.map?.addLayer(l))
  if(props.points?.[0] ){
    map.value?.state.map.getView().setCenter(transform([props.points[0].coords?.[0], props.points[0].coords?.[1]], 'EPSG:4326', 'EPSG:3857'))
  }
  // map.value?.state?.map?.getLayers().toArray()[0].addFeature(feature)
}
watch(() => map.value?.state?.map, () => {
  if (props.points?.length) {
    refreshPoints()
  }
})
watch(()=>setCenterMap.value , ()=>{
  Map.value?.getView().setCenter(transform([setCenterMap.value?.lng,setCenterMap.value?.lat], 'EPSG:4326', 'EPSG:3857'))
})
watch(() => JSON.stringify(props.points), () => {
  refreshPoints()
})
</script>
<!--<script setup lang="ts">-->
<!--import NeshanMap from '@neshan-maps-platform/vue3-openlayers'-->
<!--import {  transform ,toLonLat ,fromLonLat } from 'ol/proj'-->
<!--import type {CreateMarkersPointsItem}  from '@neshan-maps-platform/vue3-openlayers'-->
<!--import {Feature} from 'ol'-->
<!--import VectorSource from 'ol/source/Vector'-->
<!--import VectorLayer from 'ol/layer/Vector'-->
<!--import type {Address, Point as PointType} from '~/types/app'-->
<!--//-->
<!--// import {Vector} from "ol/layer";-->
<!--// import {Vector as SourceVector} from "ol/source";-->
<!--import {Style, Icon, Stroke} from "ol/style";-->
<!--// import {Geometry, Point} from "ol/geom";-->
<!--// import {Polyline} from "ol/format";-->
<!--// -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;-->


<!--const map = ref<InstanceType<typeof NeshanMap> | null>(null)-->
<!--const Map = computed(() => map.value?.state.map)-->
<!--const {coords,resume,pause} = useGeolocation();-->


<!--const location = defineModel<{-->
<!--  latitude: number-->
<!--  longitude: number-->
<!--  address: string-->
<!--}>()-->

<!--function handleMapClick(e: any) {-->
<!--  if (!e) return-->

<!--  let lat, lng, apiData-->

<!--  console.log('e: ', e);-->

<!--  if (e.coords[0] && e.coords[1]) {-->
<!--    lat = e.coords[1]-->
<!--    lng = e.coords[0]-->
<!--  }-->

<!--  if (e.apiData) {-->
<!--    apiData = e.apiData-->
<!--  }-->
<!--  // Case 2: Convert from map projection-->
<!--  else if (e.coordinate) {-->
<!--    const [cLng, cLat] = toLonLat(e.coordinate)-->
<!--    lat = cLat-->
<!--    lng = cLng-->
<!--  } else {-->
<!--    console.warn('Map click event is invalid:', e)-->
<!--    return-->
<!--  }-->

<!--  // emit('update:modelValue', {lat, lng, apiData})-->
<!--  addMarker(lat, lng)-->
<!--}-->
<!--function addMarker(lat: number, lng: number) {-->
<!--  const layer = new VectorLayer({-->
<!--    source: new VectorSource({-->
<!--      features: [-->
<!--        new Feature({-->
<!--          geometry: new Point(fromLonLat([lng, lat]))-->
<!--        })-->
<!--      ]-->
<!--    }),-->
<!--    style: new Style({-->
<!--      image: new Icon({-->
<!--        anchor: [0.5, 0.5],-->
<!--        src: '/images/marker.png'-->
<!--      })-->
<!--    })-->
<!--  })-->

<!--  const layers = map.value?.state?.map?.getLayers()-->
<!--  layers.forEach((l: any) => {-->
<!--    if (l instanceof VectorLayer) map.value?.state?.map?.removeLayer(l)-->
<!--  })-->
<!--  map.value?.state?.map?.addLayer(layer)-->
<!--}-->


<!--// DEFAULT CENTER &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;-->
<!--const center = ref({-->
<!--  latitude:  35.6892,-->
<!--  longitude:  51.389,-->
<!--})-->
<!--// SET CURRENT LOCATION &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;-->
<!--const loading = ref(false)-->
<!--const currentLocation = () => {-->
<!--  loading.value = true-->
<!--   resume()-->
<!--  loading.value = false-->
<!--}-->
<!--watch(() => coords.value, () => {-->
<!--  pause()-->
<!--  console.log(coords.value)-->
<!--  Map.value?.getView().setCenter(transform([coords.value.longitude, coords.value.latitude], 'EPSG:4326', 'EPSG:3857'))-->
<!--})-->
<!--// MARKER &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;-->
<!--const markersIconCallback = ({ isReverseMarker }: CreateMarkersPointsItem) => ({-->
<!--  src: "/images/marker.png",-->
<!--  iconScale: isReverseMarker ? 1 : undefined-->
<!--})-->
<!--// // LOADING MAP &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;-->
<!--// const mapLoading = ref(false) // default to true until map is ready-->
<!--//-->
<!--// onMounted(() => {-->
<!--//   const stop = watch(-->
<!--//       () => map.value?.state.map,-->
<!--//       (loadedMap) => {-->
<!--//         if (loadedMap) {-->
<!--//           stop()-->
<!--//           map.value?.$on('reverse', async (e: any) => {-->
<!--//             const [lng, lat] = transform(e.coordinate, 'EPSG:3857', 'EPSG:4326')-->
<!--//             const address = await fetchFormattedAddress(lat, lng)-->
<!--//             location.value = { latitude: lat, longitude: lng, address }-->
<!--//           })-->
<!--//         }-->
<!--//       }-->
<!--//   )-->
<!--// })-->

<!--</script>-->

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