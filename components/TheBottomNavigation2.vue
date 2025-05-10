<template>
  <div class="flex items-center  bg-none z-2  p-6  fixed bottom-0 w-full">
  <div class="bg-black bg-opacity-60   backdrop-blur-12   rounded-full w-full flex justify-evenly ">
    <div @click="handleSelectItem(item.link,index)" v-for="(item,index) in Buttons"
         class=" cursor-pointer  p-2 pt-3 duration-300 flexCol items-center justify-baseline gap-1 "
         :class="isActive(item) ?'font-semibold text-primary-400 shadow-active':'text-gray-400'">
      <TheNuxtIcon :name="isActive(item) ? item.iconFill :item.icon"
                   icon-type="svg" class="text-xl z-1 hover:(scale-110)"
                   :class="isActive(item)?'':''"/>
      <p class="text-(xs nowrap) leading-6.5" :class="isActive(item)?'':''">{{ item.label }}</p>
    </div>
  </div>
  </div>
<!--        <TheLog :data="selectedItem"/>-->
</template>
<style>
.shadow-active{
  filter: drop-shadow(0 0 15px  #8182EC);
}
</style>
<script setup lang="ts">
const route = useRoute()
const selectedItem = ref<number>(0)
const handleSelectItem = (item: string, index: number) => {
  selectedItem.value = index
  navigateTo({name: item})
}

interface ButtonItem {
  label: string;
  icon: string;
  iconFill: string;
  link: string;
}

const isActive = (item: ButtonItem) => {
  return selectedItem.value === item.label || route.path.includes(item.link) || route.name === item.link
}

const Buttons = ref([
  {
    label: 'خانه',
    icon: 'home',
    iconFill: 'homeFill',
    link: 'index',
    dis:"6.9rem"
  },
  {
    label: 'موتو مدیا',
    icon: 'social',
    iconFill: 'socialFill',
    link: 'social',
    dis:"2rem"
  },
  {
    label: 'چت',
    icon: 'chat',
    iconFill: 'chatFill',
    link: 'chat',
    dis:"-3rem"
  },
  {
    label: 'من',
    icon: 'profile',
    iconFill: 'profileFill',
    link: 'profile',
    dis:"-6.95rem"
  },
])
</script>
