<template>
  <div class="h-full flexCol  ">
    <TheClubHeader :club="club"/>
    <div class="bg-screenMain w-full rounded-t-3xl z-5 p-4 flexCol gap-4 overflow-auto h-420 pb-30">
      <div class="bg-screenMain bg-red-100 -m-4  p-4 sticky -top-4 z-2">
        <TheTab :items="tabs" v-model="selectedTab"/>
      </div>
      <TheClubRides v-for="ride in club?.rides" :ride="ride" v-if="selectedTab==='ride'"/>
      <TheRideMembers v-for="user in club?.clubUsers?.filter(i=>i.status==='ACCEPTED').map(i=>i.user)" v-if="selectedTab==='members'" :user="user"/>
      <TheClubGallary  v-if="selectedTab==='gallery'" :club="club"/>
    </div>
  <TheClubButtons :club="club" @refresh="refresh"/>


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
    label: 'اعضا',
    value: 'members'
  },
])
const selectedTab = ref('ride')
const {data: club,refresh} = await useAsyncData('get-club-id', () => getClub(route.params.id, {
  'with-comments': true,
  'with-user.with-profile': true,
  'with-city': true,
  'with-clubUsers.with-user.with-profile': true,
  // 'clubUsers.status:eq':'ACCEPTED',
  'with-rides.with-riders': true,
  'with-rides.with-user.with-profile': true,
  'with-chat': true,

}))



</script>
