<template>
  <div class="bg-secondary-300  rounded-2xl h-25 mt-10 flex flexCenter   gap-4">
    <transition name="fade"  mode="out-in" >
      <TheNuxtIcon
          :key="currentImage"
          :name="currentImage"
          icon-type="img"
          class="!w-35 !h-auto mb-10 "
      />
    </transition>
    <div class="flexCol gap-1">
      <h5 class="font-semibold text-(xs)">حس آزادی روی دو چرخ!</h5>
      <p class=" text-(2.5)">با جمع شورشی‌های جاده‌ای همراه شو</p>
    </div>

  </div>
</template>

<script setup lang="ts">
const images = ['illustration1.png', 'illustration2.png', 'illustration3.png', 'illustration4.png']
const currentIndex = ref(0)
const currentImage = ref(images[currentIndex.value])

let intervalId: ReturnType<typeof setInterval>


onMounted(() => {
  intervalId = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % images.length
    currentImage.value = images[currentIndex.value]
  }, 6000)
})

onUnmounted(() => {
  clearInterval(intervalId)
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>