<template>
  <div class="h-full flexCol  ">
    <TheNuxtIcon icon-type="img" name="post2.png" class="!w-full !h-85 object-cover absolute top-0 right-0  "/>
    <div class="z-5 relative  w-full flex items-start justify-between p-4 h-200">
      <TheNuxtIcon name="nav-right" icon-type="svg" class="text-2xl  cursor-pointer" @click="router.back()"/>
      <p class="font-semibold !text-(sm center)">{{ title }}</p>
      <NuxtLink class="relative ">
        <TheNuxtIcon icon-type="svg" name="map" class="text-xl "/>
      </NuxtLink>
      <div class="flex items-end w-full  justify-between absolute bottom-4 right-0 px-4  ">

        <div class="flex gap-1 items-center  ">
          <TheNuxtIcon icon-type="img" name="profile1.png" class="!w-16 !h-16 rounded-full object-cover"/>
          <div class="flexCol gap-1 ">
            <div class="flex gap-1">
              <p class="text-(sm) font-700 ">سفیر</p>
              <div class="flex gap-1 items-center px-1.5 bg-secondary-500 bg-opacity-80 w-fit rounded-full">
                <TheNuxtIcon icon-type="svg" name="star" class=" text-xs "/>
                <span class="text-(2.5) ">۴.۵</span>
              </div>
            </div>
            <p class="text-(xs) leading-6">سجاد شکرایی (تیم لیدر)</p>
            <TheUsersAvatar :mini="true"/>
          </div>
        </div>
        <div class="flexCol gap-4 ">
          <p class="text-2xl font-600 flexCol items-end">345<span class="text-(2.5) leading-4 font-400">نفر</span></p>
          <p class="text-2xl font-600 flexCol items-end">123<span
              class="text-(2.5) leading-4 font-400">راید تاکنون</span></p>
        </div>
      </div>
    </div>


    <div class="bg-screenMain w-full rounded-t-3xl z-5 p-4 flexCol gap-4 overflow-auto h-420 pb-30
">
      <div class="bg-screenMain bg-red-100 -m-4  p-4 sticky -top-4 z-2">

        <TheTab :items="tabs" v-model="selectedTab"/>
      </div>
      <TheRideMembers v-for="n in 20" v-if="selectedTab==='members'"/>
      <TheClubRides v-for="n in 8" v-if="selectedTab==='ride'"/>
      <div class="grid grid-cols-3 gap-0.5 auto-rows-[170px] " v-if="selectedTab==='gallery'">
        <div
                  v-for="(img, index) in images"
                  :key="index"
                  :class="getGridClass(index)"
                  class="overflow-hidden"
        >
          <TheNuxtIcon :name="img" class="h-full w-full object-cover" />
        </div>
      </div>
    </div>


    <div class="fixed flexCol gap-2 bottom-0 right-0 w-full p-4 bg-secondary-800 z-6 ">
<!--      <NuxtLink :to="{name:'ride-id-requests',params:{id:1}}">-->
<!--        <TheButton label="درخواست ها" class="w-full"/>-->
<!--      </NuxtLink>-->

      <TheButton @click="handleRequest"
                 :label="request?'درخواست عضویت':'درخواست فرستاده شد'"
                 class="w-full" :icon="request?'add':''" icon-class="text-xs"
                 :disable="!request"/>
    </div>
  </div>


</template>

<script setup lang="ts">
definePageMeta({layout: false})
const title = ref('safir')
const router = useRouter()
const tabs = ref([
  {
    label: 'گالری',
    value: 'gallery'
  },
  {
    label: 'راید',
    value: 'ride'
  },
  {
    label: 'همسفر',
    value: 'members'
  },
])
const selectedTab = ref('ride')
const request = ref(true)
const handleRequest = () => {
  request.value = !request.value
}
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
</script>
