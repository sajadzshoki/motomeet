<template>
  <div class="flexCol gap-5">
    <div v-for="item in newRequests"
         class="flex justify-between items-center">
      <div class="flex gap-1 items-center  ">
        <TheNuxtIcon icon-type="img" :name="item?.user?.profile?.avatar || 'noProfile.png'"
                     class="!w-15 !h-15 rounded-full object-cover"/>
        <div class="flexCol ">
          <p class="text-(xs) leading-6">{{item?.user?.profile?.nickName || ( item?.user?.profile?.firstName + ' ' + item?.user?.profile?.lastName) }}</p>

          <div
              class="flex gap-1 items-center px-1.5 bg-secondary-500 border-(1 solid secondary-300) w-fit rounded-full">
            <TheNuxtIcon icon-type="svg" name="star" class=" text-sm "/>
            <span class="text-(2.5) leading-5">{{ getCommentsAvg(item?.user?.comments) }}</span>
          </div>
          <p class="text-(2.5 gray-400) font-500 leading-5.5">
            موتور ها :
            {{ user?.profile?.motors?.map(i => i).join(' - ') || '-' }}
          </p>
        </div>
      </div>
      <div class="flex gap-1">
        <TheButton label="قبول" :mini="true" class="!px-6 !h-8" @click="accept(item)" :loading="loading"/>
        <TheButton label="رد" :fill="false" :mini="true" :cancel="true" class="!px-7 !h-8" @click="reject(item)" :loading="loading"/>

      </div>
    </div>
    <p class="text-(red-500 sm center) my-5" v-if="!newRequests?.length">هیچ درخواست جدیدی وجود ندارد </p>
  </div>
  <TheLog :data="club?.clubUsers?.filter(i=>i.status!=='ACCEPTED')"/>
</template>

<script setup lang="ts">
import {putClubUser} from "~/composables/services";

definePageMeta({layout: 'backward'})
const title = useState('backwardTitle')
title.value = 'درخواست ها'

// -----------------------------------------------
const newRequests = computed(() => club.value?.clubUsers?.filter(i => i.status == 'PENDING'))
const route = useRoute()
const {data: club, refresh} = await useAsyncData('get-club-id', () => getClub(route.params.id, {
  'with-clubUsers.with-user.with-profile': true,
  'with-clubUsers.with-user.with-comments': true,
  // 'clubUsers.status:eq':'PENDING',
}))
const loading = ref(false)
const {$toast} = useNuxtApp()
const accept = async (item: any) => {
  if (loading.value) return
  loading.value = true
  const name = ref(item?.user?.profile?.nickName ||(item.user.profile.firstName + ' ' + item.user.profile.lastName))
  const result = await putClubUser({status: 'ACCEPTED'}, item.id)
  if (result) {
    refresh()
    $toast.success(`
    ${name.value}به کلابت اضافه شد `)
  }
  loading.value = false
}
const reject = async (item: any) => {
  if (loading.value) return
  loading.value = true
  const name = ref(item?.user?.profile?.nickName ||(item.user.profile.firstName + ' ' + item.user.profile.lastName))
  const result = await putClubUser({status: 'REJECTED'}, item.id)
  if (result) {
    refresh()
    $toast.success(`   درخواست ${name.value} رد شد `)
  }
  loading.value = false
}

</script>
