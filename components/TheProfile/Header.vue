<template>
  <div class="bg-secondary-500 border-(1 solid secondary-400) mx-2 mt-10 p-4 rounded-3xl  flexCol gap-4">
    <div class="border-(2 solid primary-500) relative rounded-full  !w-25  !h-25 flex flexCenter z-3">
      <TheNuxtIcon icon-type="img" :name="user?.profile?.avatar || 'noProfile.png'"
                   class="!w-22 !h-22 rounded-full object-cover"/>
      <NuxtLink :to="{name:'profile-edit'}" v-if="user.id ==userId">
        <TheNuxtIcon icon-type="svg" name="edit" class="absolute bottom-0 right-0 text-xl"/>
      </NuxtLink>
    </div>
    <div class="flex gap-2 justify-between items-center">


      <div class="flexCol">
        <div class="flex gap-1">
          <p class="text-(sm) leading-6.5 font-600">
            {{ user?.profile?.nickName || (user?.profile?.firstName + ' ' + user?.profile?.lastName) }}</p>
          <div class="flex gap-1 items-center px-1.5 bg-secondary-400 bg-opacity-80 w-fit rounded-full">
            <TheNuxtIcon icon-type="svg" name="star" class=" text-xs "/>
            <span class="text-(2.5)">{{ getCommentsAvg(user?.comments) }}</span>
          </div>
        </div>
        <p class="text-(2.5 gray-400) font-500 leading-5.5">موتور ها :
          {{ user?.profile?.motors?.map(i => i).join(' - ') || '-' }}
        </p>
        <p v-if="user?.Club?.length" class="text-(2.5 gray-400) font-500 leading-5.5"> لیدر کلاب (های) :

          {{ user?.Club?.map(i => i.name).join(' - ') || '-' }}
        </p>
      </div>
      <TheButton v-if="user.id !==userId" :label="isFollowed?'دنبال میکنید':'دنبال کردن'"
                 :mini="true" class="px-4 " @click="follow" :loading="loading" :class="{'!bg-blue-600':isFollowed}"/>
      <TheButton v-else label="افزودن پست" :mini="true" class="px-4 "/>
    </div>
    <p class="text-(2.5 gray-400) font-500 leading-5.5">{{ user?.profile?.bio }}</p>

    <div class="flex justify-evenly -mx-6">
      <div class="flexCol items-center  border-l-(1 solid secondary-400 ) last:border-none px-6  "
           v-for="item in statuses">
        <p>{{ item.count }}</p>
        <span class="text-(2.5 gray-400) font-500 leading-5.5">{{ item.label }}</span>

      </div>
    </div>
  </div>
  <TheLog :data="user.followings?.find(i => i.toId === route.params.id)?.id"/>
</template>

<script setup lang="ts">
import type {User} from "~/types/models";

const userId = useCookie('userId')
const props = defineProps<{
  user: User
}>()
const emit = defineEmits(['refresh'])
const statuses = computed(()=>[
  {
    label: 'تجربه در راید',
    count: props.user?.RideRiders?.length
  }, {
    label: 'دنبال میکنه',
    count: props.user?.followers?.length
  }, {
    label: 'دنبالش میکنن',
    count: props.user?.followings?.length
  },
])
const {$toast} = useNuxtApp()
const loading = ref(false)
const route = useRoute()
const isFollowed = computed(() => props.user.followings?.some(i => i.toId === route.params.id))
const follow = async () => {
  if (loading.value) return
  loading.value = true
  let followId
  if(isFollowed.value){
    followId = props.user.followings?.find(i => i.toId === route.params.id)?.id
  }
  try {
    if (isFollowed.value) {
      await useDelete(`follow/${followId}`)
      emit('refresh')
    } else {
      const result = await postFollow({fromId: userId.value, toId: route.params.id})
      if (result) {
        emit('refresh')
        // $toast.success('موفق')
      }
    }
  } catch (error) {
    console.log('login error', error)
    $toast.error('بروز خطای غیرمنتظره ، لطفا دوباره تلاش کنید')
    loading.value = false
  }


  loading.value = false
}
</script>