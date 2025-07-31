<template>
  <NuxtLoadingIndicator/>
  <div class="h-screen bg-screenMain ">
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const userId = useCookie('userId')
if(!userId.value){
  navigateTo({name:'login'})
}


</script>