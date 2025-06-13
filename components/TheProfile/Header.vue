

<template>
  <div class="bg-secondary-500 border-(1 solid secondary-400) mx-2 mt-10 p-4 rounded-3xl  flexCol gap-4">
    <div class="border-(2 solid primary-500) relative rounded-full  !w-25  !h-25 flex flexCenter z-3">
      <TheNuxtIcon icon-type="img" name="profile1.png" class="!w-22 !h-22 rounded-full object-cover"/>
      <NuxtLink :to="{name:'profile-edit'}">
        <TheNuxtIcon icon-type="svg" name="edit" class="absolute bottom-0 right-0 text-xl"/>
      </NuxtLink>
    </div>
    <div class="flex justify-between items-center">


    <div class="flexCol">
      <div class="flex gap-1">
        <p class="text-(sm) leading-6.5 font-600">سیاوش سهیلی</p>
        <div class="flex gap-1 items-center px-1.5 bg-secondary-400 bg-opacity-80 w-fit rounded-full">
          <TheNuxtIcon icon-type="svg" name="star" class=" text-xs "/>
          <span class="text-(2.5)">۴.۵</span>
        </div>
      </div>
      <p class="text-(2.5 gray-400) font-500 leading-5.5">موتور RS 200 </p>
    </div>
      <TheButton label="دنبال کردن" :mini="true" class="px-4 "/>
    </div>
    <p class="text-(2.5 gray-400) font-500 leading-5.5">رانندگی برام فقط رسیدن به مقصد نیست، خود مسیر لذته. هر وقت روی
      موتورم، حس آزادی و آرامش دارم. دنبال هیجانم، نه هیاهو!</p>

    <div class="flex justify-evenly -mx-6" >
      <div class="flexCol items-center  border-l-(1 solid secondary-400 ) last:border-none px-6  " v-for="item in statuses">
        <p>{{ item.count }}</p>
        <span class="text-(2.5 gray-400) font-500 leading-5.5">{{ item.label }}</span>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const statuses = ref([
  {
    label:'تجربه در راید',
    count :'34'
  },  {
    label:'دنبال شدگان',
    count :'12 هزار'
  },  {
    label:'دنبال کنندگان',
    count :'14 هزار'
  },
])
</script>