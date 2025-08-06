<template>
    <TheLoadingPage v-if="status == 'pending'"/>
  <div class="grow h-full flexCol gap-4" v-else>
    <TheNuxtIcon name="profile-bg.png" icon-type="svg" class="!h-60 !w-full  absolute top-0 right-0 !z-1"/>
      <TheProfileHeader :user="user" @refresh="refresh"/>
      <div class="grid grid-cols-3 gap-1px -mx-3" >
        <TheNuxtIcon v-for="item in user?.Post" :name="item.images[0]" icon-type="svg" class="w-full !h-30 object-cover"/>

      </div>
  </div>
  <TheBottomNavigation2 v-if="route.params.id ===userId" class="w-full absolute bottom-4 right-0"/>
</template>

<script setup lang="ts">
const route = useRoute()
const userId = useCookie('userId')
const {data: user, status,refresh} =   useAsyncData('get-user-info', () => getUser(route.params.id, {
  'with-profile': true,
  'with-comments': true,
  'with-RideRiders': true,
  'with-followers': true,
  'with-followings': true,
  'with-Post': true,
  'with-Club': true,
}))

</script>