
<template>
  <div class="grid grid-cols-3 gap-0.5 auto-rows-[170px] ">
    <div
        v-for="(img, index) in club?.images"
        :key="index"
        :class="getGridClass(index)"
        class="overflow-hidden"
    >
      <TheNuxtIcon :name="img" class="h-full w-full object-cover"/>
    </div>
  </div>
  <p class="text-(red-500 xs center)" v-if="!club?.images?.length">هنوز هیچ عکسی اضافه
    نشده</p>
</template>

<script setup lang="ts">
import type {Club} from "~/types/models";

defineProps<{club:Club}>()
const getGridClass = (index: number) => {
  if (index % 6 === 0) return 'col-span-2 row-span-2' // big square
  if (index % 7 === 0) return 'row-span-2' // tall rectangle
  return ''
}
</script>
