
<template>
  <div  class="flex flex-wrap items-stretch gap-3  children:(!basis-20 ) ">
    <TheRideCard v-for="item in images" :item="item"/>
  </div>
</template>


<script setup lang="ts">
definePageMeta({layout: 'backward'})
const title = useState('backwardTitle')
title.value = 'backward'
const images=[
  'ride1.png',
  'ride2.png',
  'ride3.png',
  'ride4.png',
  'ride5.png',
  'ride6.png',
  'ride7.png',
  'ride8.png',
  'ride1.png',
  'ride2.png',
  'ride3.png',
  'ride4.png',
]

</script>
