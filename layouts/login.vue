
<template>
  <div class="bg-gradient-to-t from-tertiary-600 to-tertiary-900 h-full flexCol items-center gap-20 p-6">
    <TheNuxtIcon name="starBg.png" icon-type="img" class="absolute top-0 left-0 !w-full !h-100"/>
    <div class="mt-9 flexCol items-center gap-3">
    <h3 class="text-2xl leading-10 ">وارد حساب کاربری خود شوید</h3>
      <p class="text-sm leading-6.5">حساب کاربری دارید ؟</p>
    </div>
    <div class="bg-white w-full rounded-lg px-4 py-6 text-gray-900">
      <slot/>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>
