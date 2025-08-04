<template>
  <ClientOnly>
    <div class="flex flex-col gap-1">
      <p v-if="head" class="text-(xs) font-500 leading-6" :class="[validation&&'text-red']">{{ head }}</p>
      <div class="flex flex-col relative !bg-secondary-500 rounded-lg h-12"
           :class="[focused ? '!border-(primary-500 1 solid) ' :
            focused ? 'border-primary-600 ' :
             'bg-transparent border-gray-300',validation&&'border-(1 solid red-500)']">
        <div class="flex items-center p-3 rounded-full cursor-pointer" @click="click" v-on-click-outside="()=> focused = false">
          <p class="text-(xs) font-400 grow" :class="value?'':'text-gray-500'">
            {{ type==='time'? value?.replace('.',':'): (value ? moment(value).locale(locale).format('YYYY/MM/DD') : focused ? '' : '')
            }}</p>
<!--          <TheNuxtIcon :name="type ==='time'?'clock':'calendar'" icon-type="svg" @click="emit('append')" class="text-5 c-gray-400"/>-->
          <TheNuxtIcon  name="calendar" icon-type="svg" class="text-(lg gray-400) mt-2px mr-auto"
                       :class="focused?'':''"/>
        </div>
        <div v-if=" !value"
             class="absolute top-15px right-0 transform  px-3   ">
          <p class="text-(xs gray-500) ">{{ placeholder }}</p>
        </div>
        <date-picker
            :editable="true"
            :format="type==='time'? 'HH.mm':'YYYY-MM-DDTHH:mm:ssZ'"
            display-format="jYYYY-jMM-jDD HH:mm"
            @close="show=false"
            :locale="locale"
            custom-input="#my-custom-editable-input"
            :show="show"
            :max="withMax&&getMaximum"
            color="#4B4CB8"

            :type="type"
            v-model="value"
            compact-time
        />
        <input id="my-custom-editable-input" hidden>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import {vOnClickOutside} from '@vueuse/components'
import DatePicker from 'vue3-persian-datetime-picker'
import moment from "jalali-moment";


const props = withDefaults(defineProps<{
  placeholder?:string;
  disabled?:boolean;
  focusable?:boolean;
  locale?:string;
  head?:string;
  type?:string;
  validation?:boolean;
  withMax?:boolean;
}>(),{
  placeholder:'انتخاب کنید',
  focusable:true,
  locale:'fa',
  type:'datetime'

})
const emit = defineEmits(['append'])
const value = defineModel()
const show = ref(false)
const focused = ref(false)
const click = () => {
  show.value = !show.value
  focused.value = true
}
const now = new moment
const test = [moment(now).locale('fa').format('jYYYY/jMM/jDD'), '1300/01/01']
const getMaximum = computed(() => moment().format('YYYY-MM-DDTHH:mm:ssZ'))
</script>


<style >

.vpd-main *{
  color: #666666 !important  ;

}


</style>
