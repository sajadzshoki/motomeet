<template>
  <div
      class="bg-secondary-900 rounded-t-10 z-2 shadow-[0_0px_5px_rgba(0,0,0,0.1)] fixed bottom-0 w-full  px-12 flex gap-6 justify-center ">
    <span class="bg-secondary-900 transition-transform duration-700  bottom-10  w-13 h-13 rounded-full absolute border-(7 solid gray-900)"
          :style="{ transform: `translateX(${Buttons[selectedItem].dis})` }" >
      <span class="w-2.5 h-2.5 magic-shadow1 absolute -left-17px top-20px rounded-tr-full"></span>
      <span class=" w-2.5 h-2.5  magic-shadow2 absolute -right-17px top-20px rounded-tl-full"></span>
    </span>

    <div @click="handleSelectItem(item.link,index)" v-for="(item,index) in Buttons"
         class=" cursor-pointer px-2 py-3  flexCol items-center justify-baseline gap-1 "
         :class="isActive(item) ?'font-semibold   text-primary-400':'text-gray-400'">
      <TheNuxtIcon :name="isActive(item) ? item.iconFill :item.icon"
                   icon-type="svg" class="text-2xl z-1 hover:(scale-110)"
                   :class="isActive(item)?'duration-700 -mt-5':''"/>
      <p class="text-(sm nowrap) leading-6.5" :class="isActive(item)?'mt-4.5 duration-700':''">{{ item.label }}</p>
    </div>
  </div>
<!--      <TheLog :data="selectedItem"/>-->
</template>
<style>
.magic-shadow1{
  box-shadow: 4px -1.3px 0 0 var(--color-gray-900);
}.magic-shadow2{
  box-shadow: -4px -1.3px 0 0 var(--color-gray-900);
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
