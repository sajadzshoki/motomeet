<template>
  <div class="-m-4">
    <div class="grid grid-cols-3 gap-0.5 auto-rows-[170px] ">
      <NuxtLink :to="{ name: 'social-id' , params:{id:index} }"
          v-for="(img, index) in displayedImages"
          :key="index"
          :class="getGridClass(index)"
          class="overflow-hidden"
      >
        <TheNuxtIcon :name="img" class="h-full w-full object-cover" />
      </NuxtLink>
    </div>
    <div class="flex items-center justify-center w-full">

    <TheNuxtIcon name="loading" icon-type="svg" v-if="loading" class="text-(4xl) my-3 "/>
    </div>
<TheFab/>
  </div>
</template>

<script setup lang="ts">
const images = [
  'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d',
  'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e',
  'https://images.unsplash.com/photo-1584824486539-53bb4646bdbc',
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
  'https://images.unsplash.com/photo-1519345182560-3f2917c472ef',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9',
  'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
  'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d',
  'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e',
  'https://images.unsplash.com/photo-1584824486539-53bb4646bdbc',
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
  'https://images.unsplash.com/photo-1519345182560-3f2917c472ef',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9',
  'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330', 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d',
  'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e',
  'https://images.unsplash.com/photo-1584824486539-53bb4646bdbc',
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
  'https://images.unsplash.com/photo-1519345182560-3f2917c472ef',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9',
  'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
  'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d',
  'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e',
  'https://images.unsplash.com/photo-1584824486539-53bb4646bdbc',
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
  'https://images.unsplash.com/photo-1519345182560-3f2917c472ef',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9',
  'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330', 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d',
  'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e',
  'https://images.unsplash.com/photo-1584824486539-53bb4646bdbc',
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
  'https://images.unsplash.com/photo-1519345182560-3f2917c472ef',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9',
  'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
  'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d',
  'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e',
  'https://images.unsplash.com/photo-1584824486539-53bb4646bdbc',
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
  'https://images.unsplash.com/photo-1519345182560-3f2917c472ef',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9',
  'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
]
const getGridClass = (index: number) => {
  if (index % 6 === 0) return 'col-span-2 row-span-2' // big square
  if (index % 7 === 0) return 'row-span-2' // tall rectangle
  return ''
}

const displayedImages = ref<string[]>([])
const page = ref(0)
const perPage = 10
const loading = ref(false)
const loadMore = () => {
  if (loading.value) return
  loading.value = true

  setTimeout(() => {
    const start = page.value * perPage
    const end = start + perPage
    displayedImages.value.push(...images.slice(start, end))
    page.value++
    loading.value = false
  }, 100)
}

const handleScroll = () => {
  const scrollY = window.scrollY
  const innerHeight = window.innerHeight
  const scrollHeight = document.documentElement.scrollHeight

  if (scrollY + innerHeight + 200 >= scrollHeight) {
    loadMore()
  }
}
onMounted(() => {
  loadMore()
  window.addEventListener('scroll', handleScroll)
})
</script>
<style>

</style>