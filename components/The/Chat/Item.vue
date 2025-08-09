<template>
    <NuxtLink :to="{name:'chat-id' , params :{id:chat.id}} " class="flex items-center gap-2 relative cursor-pointer">
      <TheNuxtIcon
          :name="chat.isPrivate ? otherUserImage : chat.image "
          icon-type="img"
          class="rounded-full object-cover !min-w-13 !min-h-13"
      />
      <div class="flex flex-col gap-2  w-full py-4 ">
        <p class="text-( sm) font-semibold">{{chat.isPrivate ? otherUserName : chat.title}}</p>
        <p class="text-(xs gray-500)">{{  truncateText(_last(chat.messages)?.text || "پیامی ندادید", 40) }}</p>
      </div>
      <div class="absolute  left-0 top-3 flex items-center gap-2">
              <TheNuxtIcon name="done_all" icon-type="svg" class="mb-1"/>
        <span class="text-(xs gray-700) ">{{  isoToTime(_last(chat?.messages)?.createdAt) }}</span>

      </div>

  </NuxtLink>
    <TheLog :data="otherUser"/>
</template>

<script lang="ts" setup>
import type {Chat} from "~/types/models";

const props = defineProps<{ chat: Chat }>()

const userId = useCookie('userId')
const otherUser = computed(()=>props.chat?.userOnChats?.find(i=>i.userId !== userId.value))
const otherUserName = computed(()=> {
  return (otherUser.value?.user?.profile?.nickName || (otherUser.value?.user?.profile?.firstName + ' ' + otherUser.value?.user?.profile?.lastName))
})
const otherUserImage = computed (()=>{return otherUser.value?.user?.profile?.avatar || 'noProfile.png'})
</script>
