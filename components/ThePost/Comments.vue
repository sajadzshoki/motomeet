<script setup lang="ts">

</script>

<template>
<TheModal @close="$emit('close')" >
  <div class="flex gap-1 items-center ">
    <TheNuxtIcon icon-type="img" name="profile1.png" class="!w-7 !h-7 rounded-full object-cover"/>
    <p class="text-(xs) font-medium">سجاد شکرایی</p>
    <p class="text-(2.5 gray-500) font-medium mr-auto">2 ساعت پیش</p>
  </div>
  <p class="text-xs leading-5">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد</p>
</TheModal>
</template>

<style scoped>

</style>