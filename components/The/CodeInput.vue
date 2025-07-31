

<template>
  <v-otp-input
      id="code-input"
      dir="ltr"
      ref="otpInput"
      input-classes="otp-input"
      separator=""
      inputType="letter-numeric"
      :num-inputs="inpNumber||4"
      :should-auto-focus="true"
      :should-focus-order="true"
      @on-change="handleOnChange"
      @on-complete="emit('complete')"

  />
</template>

<script setup lang="ts">
import VOtpInput from "vue3-otp-input";
 const value = defineModel()
const props = defineProps<{
  inpNumber?: number
}>()
const emit = defineEmits(['complete','change'])
const handleOnChange = ($event)=>{
  value.value = $event
  emit('change')
}
</script>

<style lang="scss">
#code-input {
  gap: 1rem;
  @apply flex justify-between;

  .otp-input {
    @apply w-12 h-12 flex justify-between   b-rd-2 text-(center white) bg-secondary-800
  }
}
</style>