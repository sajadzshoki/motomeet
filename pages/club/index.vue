<template>
  <div class="grid grid-cols-2 gap-4 items-stretch grow">

    <TheClubCard v-for="club in clubs" :club="club" :status="status" class=" !min-w-0 "/>
  </div>
</template>

<script setup lang="ts">
definePageMeta({layout:'backward'})
const backward = useState('backwardTitle')
backward.value = 'کلاب ها'
// -------------------------------------------
const {data: clubs, refresh, status} = useAsyncData('get-clubs', () => getClubs({
  'with-comments': true,
  'with-city': true,
  'with-rides': true,
}))

</script>