<template>
  <div>
    <TheCardsHeader title="راید های نزدیک شما"/>
    <div class="flex gap-3 overflow-x-auto -mx-4 px-4">
    <TheRideCard v-for="n in 3"/>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>
