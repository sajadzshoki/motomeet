<template>
  <div class="h-full flexCol  ">
    <TheClubHeader :club="club"/>
    <div class="bg-screenMain w-full rounded-t-3xl z-5 p-4 flexCol gap-4 overflow-auto h-420 pb-30">
      <div class="bg-screenMain bg-red-100 -m-4  p-4 sticky -top-4 z-2">
        <TheTab :items="tabs" v-model="selectedTab"/>
      </div>
      <TheRideMembers v-for="user in _uniqBy(club?.clubUsers?.map(i=>i.user),'id')" v-if="selectedTab==='members'" :user="user"/>
      <TheClubRides v-for="n in 8" v-if="selectedTab==='ride'"/>
      <TheClubGallary  v-if="selectedTab==='gallery'" :club="club"/>

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
<!--    <TheLog :data="club?.clubUsers?.map(i=>i.user)"/>-->

</template>

<script setup lang="ts">
definePageMeta({layout: false})
const router = useRouter()
const route = useRoute()
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

const {data: club} = await useAsyncData('get-club-id', () => getClub(route.params.id, {
  'with-comments': true,
  'with-user.with-profile': true,
  'with-city': true,
  'with-clubUsers.with-user.with-profile': true,
  'with-rides': true,
  'with-chat': true,

}))

const handleRequest = () => {
  request.value = !request.value
}


</script>
