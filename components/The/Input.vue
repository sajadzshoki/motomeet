
<template>
  <div class="flex flex-col  relative bg-bg">

    <p v-if="label" class="text-(xs ) leading-7 px-1"
       :class="[labelClass , focused &&'text-primary-600',validation&&'text-red-500'] ">
      {{ label }}
    </p>

    <div
        v-on-click-outside="()=>focused = false"
        class="flex relative px-3 py-2 gap-1 h-12 items-center rounded-lg bg-secondary-500"
        :class="[value && !focused ? valueClassName : focused ? focusClassName : bgStyle,className ,
         inputTypeLocal==='textarea'&&'h-26',validation&&'border-(red-500 solid 1 )']">

      <TheNuxtIcon v-if="prependIcon" :name="prependIcon" icon-type="svg"
                   :class="[iconColor ? iconColor : 'text-gray-400',inputTypeLocal==='textarea'&&'self-start mt-1']"  />

      <slot name="prependComponent" />
<!--     <TheIRDatePicker v-if="date" v-model="value" format="YYYY-MM-DD[T]HH:mm:ssZ" class="text-text" :class="calendarClass" display-format="jDD jMMMM jYYYY" :placeholder="placeholder"/>&ndash;&gt;-->

      <input v-if="inputTypeLocal !=='textarea' && !date "
             dir="rtl"
             v-model="value"
             :type="inputTypeLocal"
             :inputmode="inputMode"
             class="flex-grow h-9 bg-transparent placeholder-(gray-500 text-xs) text-gray-100  text-xs"
             :class="inputClass"
             :disabled="disabled"
             @input="onInputLimit"
             :placeholder="!focused ? placeholder : value || ''"
              @focus="date ? inputTypeLocal = 'date' : focused = true"
      />
      <textarea v-else-if="!date"
                v-model="value"
                :placeholder="placeholder"
                :disabled="disabled"
                class="border-none text-sm font-400 grow c-gray-100 placeholder:(text-gray-500 text-xs) outline-none bg-transparent h-20"
                @focus="date ? inputTypeLocal = 'date' : ''"
                @blur="date ? inputTypeLocal = 'text' : ''"
      />

      <TheNuxtIcon v-if="password"
                   :name="inputTypeLocal === 'text' ? 'eye-slash' : 'eye'"
                   icon-type="svg"
                   class="text-gray-100 cursor-pointer"
                   @click="inputTypeLocal = inputTypeLocal ==='text' ? 'password' : 'text'"
      />

      <TheNuxtIcon v-if="appendIcon"
                   :name="appendIcon"
                   :icon-type="appendIconType"
                   @click="handleAppendIcon"
                   :class="[iconColor ? iconColor : ' text-gray-400',appendIconClass]"
                   class=" p-2 pr-1 bg-bg bg-opacity-30 justify-center rounded-full cursor-pointer"
      />
      <p dir="rtl" class="font-400 text-xs text-gray-900 whitespace-nowrap" v-if="appendText">{{ appendText }}</p>
    </div>
  </div>
</template>



<script setup lang="ts">
import {vOnClickOutside} from '@vueuse/components'
const props= withDefaults(defineProps<{
  inputClass?: string;
  calendarClass?: string;
  className?: string;
  valueClassName?: string;
  focusClassName?: string;
  labelClass?: string;
  prependIcon?: string;
  appendIcon?: string;
  appendIconType?: string;
  appendIconClass?: string;
  appendText?: string;
  inputType?:string;
  placeholder?: string;
  label?: string;
  password?: boolean;
  date?: boolean;
  disabled?: boolean;
  inputMode?: string;
  iconColor?: string;
  bgStyle?: string;
  focusable?: boolean;
  validation?:boolean
  maxLength?: number;
}>(),{
  className:'',
  valueClassName:' bg-bg',
  focusClassName:'border-(2 solid primary-600) !bg-bg',
  labelClass:'text-gray-100',
  appendIconType:'svg',
  appendIconClass:'!svg:(w-5 h-5)',
  inputType:'text',
})
const onInputLimit = (e: Event) => {
  const input = e.target as HTMLInputElement;
  if (input.value.length > props.maxLength) {
    input.value = input.value.slice(0, props.maxLength);
    value.value = input.value;
  }
};
const emit = defineEmits(['append', 'update:modelValue','clearInput'])
const value = defineModel()
const focused = ref(false);

const handleAppendIcon = ()=>{
  emit('append');
  emit('clearInput')
}
const inputTypeLocal = ref(props.password ? 'password' : props.inputType)
</script>
