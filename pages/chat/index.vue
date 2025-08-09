<template>
  <div class="flexCol gap-4 ">
    <TheTab :items="tabs" v-model="selectedTab"/>
    <TheSkeletonLoader :loading="status=='pending'">
      <TheChatItem v-for="chat in filteredChats" :chat="chat"/>
    </TheSkeletonLoader>
    <p class="text-xs mx-auto text-red-500 my-10" v-if="!filteredChats?.length">هیج چتی وجود ندارد</p>
  </div>
</template>

<script setup lang="ts">
const userId = useCookie('userId')

const selectedTab = ref('all')
const tabs = [
  {
    label: 'همه',
    value: 'all'
  },
  {
    label: 'گروه ها',
    value: 'group',
  }, {
    label: 'شخصی',
    value: 'personal',
  },
]
const {data: chats, status} = useAsyncData('get-chats-index', () => getChats({
  'with-userOnChats.with-user.with-profile': true,
  'userId:or:eq': userId.value,
  'userOnChats:some:or.userId:eq': userId.value,
}))
const filteredChats = computed(() => {
  if (selectedTab.value === 'personal') {
    return chats.value?.filter(i => i.isPrivate === true)
  } else if (selectedTab.value === 'group') {
    return chats.value?.filter(i => i.isPrivate === false)
  }
  return chats.value

})
</script>
