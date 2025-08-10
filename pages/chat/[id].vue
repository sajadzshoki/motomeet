<template>
  <div class="h-full w-full h-full flexCol">
    <TheChatHeader :chat="chat"/>
    <div id="messages-container" class="flex  flex-col justify-end gap-7 p-4 bg-gray-900 flex-1 pb-18  ">

      <div class="relative rounded-md p-2 max-w-3/4  flexCol gap-1" v-for="message in messages"
           :class="message?.userId === userId ? 'bg-secondary-400 rounded-tr-none'
           :'bg-primary-500 self-end rounded-tl-none '"
      >
        <div v-if="message?.userId === userId" class="absolute  -right-1.5 -top-0.9 w-0 h-0 rotate-65 border-r-(6 solid transparent)
         border-l-(6 solid transparent) border-b-(12 solid secondary-400)"></div>

        <div v-else
             class="absolute -left-2 -top-0.9 w-0 h-0 -rotate-65 border-r-(6 solid transparent)  border-l-(6 solid transparent) border-b-(12 solid primary-500)"></div>
<!--      <TheSkeletonLoader :loading="status=='pending'">-->
        <p class="text-sm " :class="message?.userId === userId ? '':'pl-6'">{{ message?.text }}</p>
<!--      </TheSkeletonLoader>-->
        <small class="self-end text-xs">{{ isoToTime(message?.createdAt) }}</small>
      </div>
    </div>
    <TheChatInput @refresh="refresh"/>
  </div>
  <!--  <TheLog :data="otherUser"/>-->
</template>

<script setup lang="ts">


definePageMeta({layout: false})
import type {SocketData} from "~/types/app";
import { nextTick, onMounted, ref } from 'vue'
const socket = useSocketIo()
const userId = useCookie('userId')
const route = useRoute()
const chatId = route.params.id
const loading = ref(false)
const messages = ref<Record<string, any>[]>([])
const {data: chat,refresh } = useAsyncData('get-chat-id', () => getChat(chatId, {
  'with-userOnChats.with-user.with-profile': true,
  // 'with-messages':true
}))
const getMessages = async () => {

  const {result} = await useGet<Record<string, any>[]>('/Message', {
    params: {
      "chatId:eq": chatId,
    }
  })
  if (result) messages.value = result

}
const handleMessage = ({method, data}: SocketData) => {
  if (method === 'create') {
    messages.value.push(data)
  }
}
const connect = async () => {
  watchSocket(socket, {
    model: 'message',
    coll: 'chatId',
    value: chatId
  }, handleMessage,loading,getMessages)

}
const scrollToDown = ()=>{
  // window.scrollTo({
  //   top: document.body.scrollHeight,
  //   behavior: 'smooth'
  // });
  const el = document.getElementById('messages-container')
  if (el) el.scrollTop = el.scrollHeight
}
onMounted(async() => {
  await nextTick()
  await connect()
  scrollToDown()
})


</script>