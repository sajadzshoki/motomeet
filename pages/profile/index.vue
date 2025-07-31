<template>
  <div class="flexCol items-center gap-2">
    <div class=" relative">
      <NuxtLink :to="{name:'profile-edit'}">
        <TheNuxtIcon icon-type="img" :name="avatar|| 'noProfile.png'" class="!w-27 !h-27 rounded-full object-cover"/>
        <TheNuxtIcon icon-type="svg" name="edit" class="absolute bottom-2 right-2 text-xl"/>
      </NuxtLink>
    </div>
    <div class="flex justify-between items-center">
      <div class="flexCol items-center gap-1">
        <div class="flex gap-1">
          <p class="text-(sm) leading-6.5 font-600">{{ fullName }}</p>
          <div class="flex gap-1 items-center px-1.5 bg-secondary-400 bg-opacity-80 w-fit rounded-full">
            <TheNuxtIcon icon-type="svg" name="star" class=" text-xs "/>
            <span class="text-(2.5)">{{ getCommentsAvg(user?.comments) }}</span>
          </div>
        </div>
        <p class="text-(2.5 gray-400) font-500 leading-5.5">
          موتور ها :
          {{ user?.profile?.motors?.map(i => i).join(' - ') }}
        </p>
      </div>
    </div>
    <div class="bg-secondary-500 p-6 mt-4 w-full flexCol gap-6 rounded-2xl">
      <div class="flex items-center gap-4">
        <TheNuxtIcon name="phone" icon-type="svg" class="text-xl bg-secondary-400 p-2 rounded-full"/>
        <p class="text-(sm) leading-6.5 font-600">{{ phoneNumber }}</p>
      </div>
      <div class="flex items-center gap-4">
        <TheNuxtIcon name="email" icon-type="svg" class="text-xl bg-secondary-400 p-2 rounded-full"/>
        <p class="text-(sm) leading-6.5 font-600">{{ user?.email || '-' }}</p>
      </div>
      <div class="flex items-center gap-4 cursor-pointer" @click="exitModal=true">
        <TheNuxtIcon name="logout" icon-type="svg" class="text-xl bg-(red-500 ) bg-opacity-20 p-2 rounded-full"/>
        <p class="text-(sm) leading-6.5 font-600">خروج از حساب کاربری</p>
        <TheNuxtIcon name="nav-left" icon-type="svg" class="mr-auto text-(gray-300) text-2xl"/>
      </div>
<!--      <TheModal title="خروج از حساب" v-if="exitModal" @close="exitModal =false">-->
<!--        <p class="text-sm">مطمئنی می‌خوای از حسابت خارج بشی؟</p>-->
<!--        <div class="flex gap-3 mt-4">-->

<!--          <p class="text-(sm red-500)" @click="exitModal =false">خروج</p>-->
<!--          <p class="text-sm" @click="exitModal =false">لغو</p>-->
<!--        </div>-->
<!--      </TheModal>-->
      <TheExitModal v-if="exitModal" @close="exitModal = false"/>
    </div>
  </div>
<!--  <TheLog :data="user.profile"/>-->
</template>

<script setup lang="ts">
import TheExitModal from "~/components/TheExitModal.vue";
import {getCommentsAvg} from "../../composables/global";

definePageMeta({layout: 'backward'})
const backward = useState('backwardTitle')
backward.value = 'پروفایل'
const phoneNumber = useLocalStorage('phoneNumber', '')
const exitModal = ref(false)
const {user, fullName, avatar, loading} = await useUser()

</script>