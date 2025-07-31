<template>
  <TheSearchBackward placeholder="اعضای کلابت کیا باشن؟" v-model="search"/>
  <div class="p-4 flexCol gap-4 ">
    <TheLoadingPage v-if="status==='pending'"/>
    <div v-else v-for="user in users" @click="addUser(user.id)"
         class="flex gap-2 items-center border-b-(1 solid gray-800) pb-2">
      <!--    <TheSkeletonLoader :loading="status==='success'"  class="!h-10 !w-full">-->
      <TheCheckbox
          :value="user.id"
          :multi="true"
          v-model="selected"
          @click.stop
      />
      <TheNuxtIcon :name="user?.profile?.avatar || 'noProfile.png'" icon-type="img"
                   class="!w-10 !h-10 rounded-full object-cover"/>
      <div class="flexCol gap-2px">
        <div class="flex gap-1 items-center">
          <p class="text-xs font-600">

            {{ (user?.profile?.firstName || 'کاربر') + ' ' + (user?.profile?.lastName || 'موتومیت') }}
          </p>
          <div class="flex gap-1 items-center px-1.5 bg-secondary-400 bg-opacity-80 w-fit rounded-full">
            <TheNuxtIcon icon-type="svg" name="star" class=" text-xs "/>
            <span class="text-(2.5)">{{ getCommentsAvg(user?.comments) }}</span>
          </div>
        </div>
        <p class="text-(2.5 gray-400) font-500 leading-5.5">{{ user?.profile?.motors?.map(i => i).join(' - ') }}</p>
      </div>
      <!--    </TheSkeletonLoader>-->
    </div>
    <p class="text-(red-500 xs center)" v-if="!users?.length"> هیچ کابری با این نام وجود ندارد</p>
  </div>
  <TheFab :icon="loading?'loading':'nav-right'" class-name="!bottom-10" @click="submitClub"/>
  <TheLog :data="route.query.clubId"/>
</template>

<script setup lang="ts">
import {getCommentsAvg} from "~/composables/global";

definePageMeta({layout: false})
// -------------------------------------------
const search = ref('')
const userId = useCookie('userId');
const {data: users, status, refresh} = useAsyncData('get-users-members', () => getUsers({
  'id:not':userId.value,
  'with-profile': true,
  'sort-createdAt': 'desc',
  'profile:is:or.firstName': search.value || undefined,
  'profile:is:or.lastName': search.value || undefined,
  'profile:is:or.nickName': search.value || undefined,

}))
const debounceGet = _debounce(refresh, 500)
watch(search, debounceGet)
const selected = ref([userId.value])
const addUser = (userId: string) => {
  if (selected.value.includes(userId)) {
    selected.value = selected.value.filter(i => i !== userId)
  } else {
    selected.value?.push(userId)
  }
}
const {$toast} = useNuxtApp()
const validation = ref(false)
const loading = ref(false)

const route = useRoute()
const clubForm = useLocalStorage('clubForm',{})
const submitClub = async () => {
  if (loading.value) return
  loading.value = true
  try {
    const result = await Promise.all (selected.value.map(id =>  postClubUser({
      userId: id,
      clubId: route.query.clubId,
      status: 'ACCEPTED'
    })))
    if (result) {
      $toast.success('دوستات به کلابت اضافه شدن')
      clubForm.value={}
      setTimeout(() =>
          navigateTo({name:'club-id',params:{id:route.query.clubId}}), 1000
      )
    }
  } catch (error) {
    console.log('login error', error)
    $toast.error('بروز خطای غیرمنتظره ، لطفا دوباره تلاش کنید')
    loading.value = false
    validation.value = false
  }


  loading.value = false
}
</script>