<template>
  <div
      class="flex flexCenter  cursor-pointer border-(1  solid) h-5 w-5 b-rd-1.5  relative"
      @click="toggleCheck"
      :class="isChecked ?'border-(1 primary-500 solid)':'border-gray-400'"
  >
    <div v-if="isChecked" class="!w-3.5 !h-3.5 b-rd-1 bg-primary-500"></div>
  </div>
</template>

<script setup lang="ts">
const check = defineModel<any>() // support both boolean or array

const props = defineProps<{
  value?: string | number
  multi?: boolean
}>()

const isChecked = computed(() => {
  if (props.multi && Array.isArray(check.value)) {
    return check.value.includes(props.value)
  }
  return !!check.value
})

const toggleCheck = () => {
  if (props.multi && Array.isArray(check.value)) {
    const index = check.value.indexOf(props.value)
    if (index === -1) {
      check.value.push(props.value)
    } else {
      check.value.splice(index, 1)
    }
  } else {
    check.value = !check.value
  }
}
</script>
