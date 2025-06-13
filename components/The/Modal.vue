<template>
  <div class="fixed inset-0 bg-black bg-opacity-20 w-full  z-20 flexCol flex justify-center items-center transition-all"
       @click.self="emit('close')">
    <div
        class=" bg-secondary-500  p-4  w-full  rounded-3xl flexCol gap-4 overflow-auto absolute max-w-sm   max-h-2/3 bottom-1/2 translate-y-1/2 "
    >

      <p class="text-md font-600 leading-6.5">{{ title }}</p>
      <div class="p-4 flex flex-col gap-4 ">
        <slot/>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {vOnClickOutside} from '@vueuse/components'

const emit = defineEmits(['close'])
defineProps({
  title: String,
  border: {
    type: String,
    default: 'rounded-t-3xl'
  },
  center: {
    type: Boolean,
    default: false
  }
})
</script>


