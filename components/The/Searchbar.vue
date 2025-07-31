<template>
  <div class="flex justify-center w-full   rounded-lg px-2 py-2 gap-2  bg-secondary-800  primaryBorder"
       :class="[mini?'!h-10 ':' h-10 ']">
    <TheNuxtIcon :name="value?'close':'Search'" @click="value && (value = '')" icon-type="svg"
                 class="!svg:(w-4 h-4) text-gray-500"/>
    <input dir="rtl"
           v-model="value"
           :inputmode="inputMode"
           class="flex-grow  placeholder-(gray-400 text-xs ) text-(sm white) !p-0   " :class="className" :disabled="disabled"
           :placeholder="!focused ? placeholder : value || placeholder "

    />
  </div>
<!--  <TheLog :data="profile"/>-->
</template>

<script lang="ts" setup>
const value = defineModel();


withDefaults(defineProps<{
  placeholder?: string,
  disabled?: boolean
  inputMode?: string
  mini?: boolean,
  withLocation?: boolean,
  className?: string,
}>(), {
  placeholder: 'جستجوی نام دکتر , کلینیک , تخصص ...',
  withLocation: true
})

const focused = ref(false)
</script>