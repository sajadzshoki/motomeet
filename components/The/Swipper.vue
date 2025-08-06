<template>
  <div dir="ltr" class="flex flex-col gap-6  relative  mb-4 ">

    <Swiper
        class="w-full h-full grow mySwiper"
        :slides-per-view="slides"
        :space-between="0"
        :loop="false"
        :navigation="{clickable:true}"
        :keyboard="true"
        :modules="modules"
        :initial-slide="initialSlide || 0"
        :simulateTouch="true"

    >
      <!--      <TheSwiperControl :name="name"/>-->
      <SwiperSlide v-for="item in items"
                   class="flex flex-col items-center justify-center transition-all ml-4 w-full"
                   :class="slideClass">
        <slot :item="item"/>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup lang="ts">
import {Swiper, SwiperSlide} from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';

import {Navigation} from 'swiper/modules';

defineProps<{
  slideClass?: string
  items: Record<string, any>[]
  name?: string
  slides?: number | 'auto'
  navigation?: boolean
  pagination?: boolean
  initialSlide?: number
}>();

const modules = [Navigation];
</script>
<style lang="scss">

.swiper-slide {
  @apply m-0
}

.swiper-button-prev::after,.swiper-button-next::after {
  @apply bg-black flex flexCenter  min-w-8 min-h-8 rounded-full text-(white 3) font-700
}
</style>

