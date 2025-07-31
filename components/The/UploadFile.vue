<template>
  <form
      class="flex flex-col relative"
      @dragenter="hovered=true"
      @dragleave="hovered=false"
      @submit.prevent="upload"
      @dragover.prevent
      @drop.stop.prevent="drop">
    <label
        class="flex justify-center item-center rounded-lg  relative  cursor-pointer  bg-primary-500 rounded-full !w-16 !h-16"
        :class="[className]">
      <slot name="icon">
        <div v-if="(!showValue ? true: !value) && !loading " class="flex flex-col flexCenter gap-3 px-2 rounded-2xl grow">
          <TheNuxtIcon
              class="flex justify-center items-center   !svg:(h-8 w-8) "
             :class="[iconClass]"
              :name="icon" icon-type="svg"/>

<!--          <p class="text-(2.5 ) font-500 text-center" :class="[labelClass]">{{ label }}</p>-->
        </div>
        <TheNuxtIcon v-else-if="loading" name="loading" icon-type="svg" class="text-3xl"/>
        <TheNuxtIcon
            v-else-if="value && !loading && showValue"
            :name="value"
            class="object-cover rounded-full  rounded-lg !w-full !h-full"/>
      </slot>
      <input
          :disabled="disabled" accept=".JPG,.PNG,.GIF,.SVG,.MP4,.WEBM,.MP3,.WAV,.OGG,.GLB,.GLTF"
          alt="uploadImage" hidden  type="file"
          @change="upload($event.target)"/>
    </label>

  </form>
<!--  <TheLog :data="loading" :fixed="false"/>-->
</template>

<script setup lang="ts">
const {$toast} = useNuxtApp()
const props = withDefaults(defineProps<{
  className?:string,
  edit?: boolean,
  disabled?: boolean,
  icon?: string,
  iconClass?:string,
  label?: string,
  labelClass?: string,
  showValue?: boolean,
}>(),{
  icon:'Camera',
  showValue:true
})
const hovered = ref(false)
const value = defineModel()
const loading = ref(false)
const drop = (e) => {
  hovered.value = false
  upload(e.dataTransfer)
}

const upload =async (evt) => {
  loading.value = true
  await compile(evt.files[0])
  loading.value = false
}

const compile = async (file) => {
  const fileReader = new FileReader()
    const fm = new FormData()
    fm.append("file", file)
    const {result,error} = await usePost('/upload', fm)
      if(result){
          value.value = result
      }else{
        $toast.error("مشکلی در آپلود تصویر به وجود آمد")
      }
  fileReader.readAsDataURL(file)
    // value.value = BASE_URL
}



</script>
