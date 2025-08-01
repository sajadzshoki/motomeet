<template>
  <div class="fixed flexCol gap-2 bottom-0 right-0 w-full p-4 bg-secondary-800 z-6">
    <NuxtLink v-if="isLeader" :to="{name:'club-id-requests',params:{id:route.params.id}}">
      <TheButton label="درخواست ها" class="w-full"/>
    </NuxtLink>

    <TheButton v-if="!isMember"
               @click="handleRequest"
               :label="!hadRequested?'درخواست عضویت':'درخواست فرستاده شد'"
               class="w-full" :icon="!hadRequested?'add':''" icon-class="text-xs"
               :disable="hadRequested"/>
  </div>
<!--  <TheLog :data="hadRequested"/>-->
</template>

<script setup lang="ts">
import type {Club} from "~/types/models";

const props = defineProps<{
  club: Club
}>()
const userId = useCookie('userId')
const route = useRoute()
const isLeader = computed(() => userId.value == props.club.userId)
const isMember = computed(() => {
  return props.club?.clubUsers?.find(user => user.user.id === userId.value)?.status === 'ACCEPTED'
})
const hadRequested = computed(() => {
  return props.club?.clubUsers?.find(user => user.user.id === userId.value)?.status === 'PENDING'
})
const emit = defineEmits(['refresh'])
const loading = ref(false)
const {$toast} = useNuxtApp()
const handleRequest = async () => {
  if (loading.value) return
  loading.value = true
  const result = await postClubUser({
    clubId: route.params.id,
    status: 'PENDING',
    userId: userId.value
  })
  if (result) {
    emit('refresh')
    $toast.success("درخواست با موفقیت ارسال شد")
  }
  loading.value = false
}

</script>
