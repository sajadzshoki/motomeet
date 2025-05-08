<template>
  <div class="bg-secondary-900 rounded-t-10 z-2 shadow-[0_0px_5px_rgba(0,0,0,0.1)] fixed bottom-0 w-full  px-12 flex justify-between">
    <div @click="handleSelectItem(item.link)" v-for="item in Buttons"
         class=" cursor-pointer px-2 py-3  flexCol items-center justify-baseline gap-1 "
         :class="isActive(item) ?'font-semibold  text-primary-400':'text-gray-400'">
      <TheNuxtIcon :name="isActive(item) ? item.iconFill :item.icon"
                   icon-type="svg" class="text-2xl  hover:(scale-110)"
                   :class="isActive(item)?'bg-secondary-900 p-4 absolute bottom-10 rounded-full border-(2 solid transparent)':''"/>
      <p class="text-(sm) leading-6.5" :class="isActive(item)?'absolute bottom-4 ':''">{{ item.label }}</p>
    </div>
  </div>
<!--    <TheLog :data="isActive('profile')"/>-->
</template>

<script setup lang="ts">
const route = useRoute()
const selectedItem = ref<string>('')
const handleSelectItem = (item: string) => {
  selectedItem.value = item
  navigateTo({name: item})
}
interface ButtonItem {
  label: string;
  icon: string;
  iconFill: string;
  link: string;
}
const isActive = (item: ButtonItem) => {
  return selectedItem.value === item.label || route.path.includes(item.link) || route.name===item.link
}

const Buttons = ref([
  {
    label: 'خانه',
    icon: 'home',
    iconFill: 'homeFill',
    link: 'index'
  },
  {
    label: 'موتو مدیا',
    icon: 'social',
    iconFill: 'socialFill',
    link: 'social'
  },
  {
    label: 'چت',
    icon: 'chat',
    iconFill: 'chatFill',
    link: 'chat'
  },
  {
    label: 'من',
    icon: 'profile',
    iconFill: 'profileFill',
    link: 'profile'
  },
])
</script>
