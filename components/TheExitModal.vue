<template>
  <TheModal :center="true" title="خروج از حساب " :with-close="false" @close="emit('close')"
            class-name="!min-w-70 !rounded-28px ">
    <div class="flexCol gap-4 p-2 !rounded-3xl">
      <p class="text-sm">مطمئنی می‌خوای از حسابت خارج بشی؟</p>
      <div class="flex gap-3 mt-4">

        <p class="text-(sm red-500)" @click="handleExit">خروج</p>
        <p class="text-sm" @click="emit('close')">لغو</p>
      </div>
    </div>
  </TheModal>
</template>

<script setup lang="ts">
const userId = useCookie('userId')
const token = useCookie('token')
const phoneNumber = useCookie('phoneNumber')


const emit = defineEmits(['close'])
const {$toast} = useNuxtApp()
const handleExit = () => {
  $toast.success('خارج شدید')
  navigateTo({name: 'login'})
  userId.value = null
  token.value = null
  phoneNumber.value = null
  emit('close')
}
</script>
