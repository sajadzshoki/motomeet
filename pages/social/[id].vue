<template>
  <div class="flexCol gap-4 ">
    <div class="max-h-110 h-full -m-3  relative">
      <TheNuxtIcon name="post1.png" class="!w-full !h-full object-cover"/>
      <div class="flex gap-1 items-center absolute right-4 top-4 ">
        <TheNuxtIcon icon-type="img" name="profile1.png" class="!w-8 !h-8 rounded-full object-cover"/>
        <p class="text-(sm) font-medium">سجاد شکرایی</p>
      </div>
    </div>
    <div class="flex gap-2 items-center mt-2">
      <div class="flex gap-1 items-center">
        <TheNuxtIcon :name="like?'heart-fill':'heart'"
                     @click="like=!like"
                     icon-type="svg"
                     class="text-lg"
                     :class="like ?'text-red-500':'text-white'"
        />
        <p class="text-sm font-semibold">21321</p>
      </div>
      <div class="flex gap-1 items-center">
        <TheNuxtIcon name="Comunication" icon-type="svg" class="text-(2xl white)" @click="commentModal=true"/>
        <p class="text-sm font-semibold">314</p>
      </div>
      <TheNuxtIcon name="send-2" icon-type="svg" class="text-(xl white) mr-auto"/>
    </div>
    <p class="text-sm font-semibold leading-6.5">با گروه ما کلید رو بچرخون، فرمان رو بگیر و تا افق‌های جدید گاز بده. عشق
      به سرعت و هم‌سفری واقعی اینجاست!</p>
    <ThePostComments v-if="commentModal" @close="commentModal=false" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({layout: 'backward'})
const title = useState('backwardTitle')
title.value = 'پست'
const like = ref(false)
const commentModal = ref(false)
</script>
