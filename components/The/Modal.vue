<template>
  <div class="fixed inset-0 bg-black bg-opacity-20 z-20 flexCol flex justify-center items-center transition-all" @click.self="emit('close')">
    <div
        :class="
            border,
            center ? 'bottom-1/2 translate-y-1/2' : 'bottom-0'"
        class="w-full bg-white  pt-0  pb-4 rounded-t-3xl flexCol gap-4 overflow-auto fixed max-w-lg max-h-2/3 sm:(bottom-1/2 max-h-4/5 translate-y-1/2 rounded-3xl)"

    >
      <div class="flex items-center justify-between sticky bg-white top-0 w-full right-0 p-3 z-10">
        <p class="text-lg font-semibold leading-6.5">{{ title }}</p>

        <TheNuxtIcon name="close" icon-type="svg" class="self-end text-(sm) p-2 bg-gray-50 rounded-lg cursor-pointer"
                     @click="emit('close')"/>
      </div>
      <div class="p-4 flex flex-col gap-3">
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


