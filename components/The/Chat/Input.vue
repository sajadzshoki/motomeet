

<template>
  <div class="fixed bottom-0 w-full flex justify-between items-center px-3 py-1  bg-secondary-700  ">
    <div class="flex w-full item-center gap-2 transition-transform duration-600 " :class="!inputValue ? 'translate-x-9' : 'translate-x-0' ">
      <TheNuxtIcon :name="loading?'loading':'send'" icon-type="svg" class="text-(2xl gray-500)"/>
      <input type="text"
             class=" py-3 text-white   placeholder:text-gray-500"
             placeholder="نوشتن پیام"
             v-model="inputValue"
             @click="sendMessage"
      />
    </div>
    <div class="flex items-center px-2 gap-2">
      <TheNuxtIcon name="microphone" icon-type="svg" class="text-(xl gray-500)  "/>
      <TheNuxtIcon name="attach-circle" icon-type="svg" class="text-(xl gray-500)  "/>
    </div>
  </div>
</template>

<script setup lang="ts">


const emit = defineEmits(['refresh'])
const inputValue = ref('')
const loading = ref(false)
const userId = useCookie('userId')
const route = useRoute()
const sendMessage = async () => {
  if(loading.value)return;
  console.log('asdasdsad')
  if(!inputValue.value)return;
  loading.value=true

  const result = await postMessages({
    text: inputValue.value,
    userId:userId.value,
    chatId:route.params.id,
  })
  if(result){

  emit('refresh')
  inputValue.value = ''
  }
  loading.value=false
}
</script>