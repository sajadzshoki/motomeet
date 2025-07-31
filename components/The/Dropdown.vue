<template>
  <div class="flex flex-col gap-1 relative w-full">

    <p v-if="header" class="text-(xs) font-500  leading-6 "
       :class="[header, dropdown ? 'text-primary-600' : '',validation&&'text-red'] ">{{ header }}</p>

    <div ref="dropdownTriggerRef" class="flex relative items-center  gap-2 cursor-pointer px-3 bg-secondary-500 h-12 rounded-lg  "
         v-on-click-outside="()=>dropdown=false"
         :class="[[dropdown ? 'border-(2 solid primary-600)' : ''],
         className,validation&&'border-(1 solid red-500)', disabled&&'!bg-gray-100 cursor-not-allowed']"
         @click="!disabled && (dropdown = !dropdown) ">
      <TheNuxtIcon v-if="!disabled && prependIcon" :name="prependIcon" icon-type="svg" class="text-(xs gray-500)" :class="dropdown&&'text-primary-500'"/>

      <p v-if="!value" class="flex text-(gray-500 xs) font-400 select-none gap-2 grow " :class="dropdown&&'text-primary-500'">
        <TheNuxtIcon v-if="icon" :name="icon" class="rounded-full text-xl" icon-type="svg" :class="[iconClass]"/>
        {{ title || 'انتخاب کنید' }}
      </p>
      <!-----------------------------------------important part for showing the selected data---------------------------------------------------->
      <p v-else class="text-xs font-400 ">
<!--        {{ typeof value?.label === 'number' ? value.label.toLocaleString() + ' ' + value.key : value.label }}-->
        {{selectedData}}
      </p>
<!--      male abi-->
      <!--      {{value ? (!value ? 'Select' || title : typeof value === 'object' ? value.label || value[label] : value) : title || $t('Select')}}-->
      <!------------------------------------------------------arrow icon---------------------------------------------------------------->

      <TheNuxtIcon v-if="!disabled && appendIcon" :name="appendIcon" icon-type="svg" class="text-(2xl gray-600) mr-auto"
                   :class="dropdown?'rotate-90 text-primary-600':'-rotate-90'"/>
      <!-----------------------------------------Modal---------------------------------------------------->
      <div
          v-show="dropdown"
          class="flex flex-col absolute  z-4 right-0 w-full bg-secondary-500 rounded-lg max-h-40vh overflow-auto shadow-lg"
          :class="dropdownPosition === 'top' ? 'bottom-12' : 'top-12'">
        <TheDropdownModal :items="data" v-model="value" :object="object" :label="label"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {vOnClickOutside} from '@vueuse/components'

const value = defineModel()
const dropdown = ref(false)

const props = withDefaults(defineProps<{
  data: any[];
  title?: string;
  className?: string;
  appendText?: string;
  icon?: string;
  iconClass?: string;
  label?: string;
  header?: string;
  disabled?: boolean;
  headerClass?: string;
  appendIcon?: string;
  prependIcon?: string;
  validation?: boolean;
  object?: boolean;
  downHeight?:number;
}>(), {
  data: () => ([]),
  label: 'title',
  className: '',
  appendIcon: 'nav-left',
  object: true,
  downHeight:200
})
const selectedData = computed(() => {
  if (!value.value || (typeof value.value === 'object' && Object.keys(value.value).length === 0)) {
    return props.title || 'انتخاب کنید'
  }
  if (typeof value.value === 'object') {
    return value.value?.label || value.value[props.label] || props.title || 'انتخاب کنید'
  }
  return value.value || props.title || 'انتخاب کنید'
})

// modal open positions
const dropdownTriggerRef = ref(null);
const dropdownPosition = ref('bottom'); // Default to opening below
const {height: windowHeight} = useWindowSize();

const checkDropdownPosition = () => {
  nextTick(() => {
    if (dropdownTriggerRef.value) {
      const rect = dropdownTriggerRef.value.getBoundingClientRect();
      const spaceBelow = windowHeight.value - rect.bottom;
      dropdownPosition.value = spaceBelow < props.downHeight ? 'top' : 'bottom';
    }
  });
};

const onScrollOrResize = () => {
  checkDropdownPosition();
};
onMounted(() => {
  checkDropdownPosition();
  window.addEventListener('scroll', onScrollOrResize, true); // true to capture scrolling in nested containers too
  window.addEventListener('resize', onScrollOrResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScrollOrResize, true);
  window.removeEventListener('resize', onScrollOrResize);
});

watch(() => windowHeight.value, () => {
  checkDropdownPosition();
});
</script>

