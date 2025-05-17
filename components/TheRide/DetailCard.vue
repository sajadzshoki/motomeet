<template>
  <div class="bg-secondary-500 rounded-2xl p-3 relative flexCol gap-3">
    <TheNuxtIcon name="illustration10.png" class="!w-20 !h-auto absolute left-0 top-1 opacity-10 "/>

    <p class="text-xs">اطلاعات کلی</p>
    <div v-for="item in items" class="flex gap-1 ">
      <TheNuxtIcon :name="item.icon" icon-type="svg" class="!svg:(w-4 h-4)"/>
      <p class="text-xs">{{ item.data }}</p>
    </div>
    <div class="flex justify-between gap-2 items-end ">
      <p class="text-(xs nowrap)">تهران</p>
      <div class="">
      <TheNuxtIcon name="motorbike1" icon-type="svg" class="!svg:(w-6) px-4 "/>
      <TheNuxtIcon name="dot-line" icon-type="svg" class="!svg:(w-full) "/>
      </div>
      <p class="text-(xs nowrap)">لواسان</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const items = ref([
  {
    data:' ۲۳ خرداد، ساعت ۲۱',
    icon:'calendar'
  },  {
    data:'حداقل حجم موتور : ۱۵۰cc به بالا',
    icon:'Transport'
  },  {
    data:'حداکثر اعضا : ۵ نفر',
    icon:'people'
  },
])
</script>
