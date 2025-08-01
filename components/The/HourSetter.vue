<template>
  <div class="bg-secondary-500 py-4 px-3 rounded-lg flex items-center justify-between w-full cursor-pointer"
       :class="modal && 'border-( 2 solid primary-500)'"
       @click="modal=true">
    <p class="text-(xs gray-500)">ساعت</p>
    <TheNuxtIcon name="time" icon-type="svg" class="text-gray-300"/>
  </div>
  <TheModal title="ورود ساعت" v-if="modal" @close="modal = false" :with-close="false">
    <div class="flex gap-2 items-center">
      <div class="flexCol gap-2">
        <div class="bg-secondary-700 rounded-lg h-18 w-full flex flexCenter">
          <input v-model="hour" type="number" class="text-(white 3xl center) h-18" max="1"/>
        </div>
        <p class="text-(xs gray-400)">دقیقه</p>
      </div>
      <h1 class="text-12">:</h1>
      <div class="bg-secondary-700 rounded-lg h-18 w-full flex flexCenter">
        <input v-model="hour" type="number" class="text-(white 3xl center) h-18" max="1"/>
      </div>


    </div>
  </TheModal>
</template>

<script setup lang="ts">
import Input from "~/components/The/Input.vue";

const modal = ref(true)
const hour = ref('00')
const minute = ref('00')
</script>

