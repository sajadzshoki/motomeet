<template>
  <div class="-m-4 mb-4 " v-if="postForm?.images?.length">
    <TheSwipper
        :key="swiperKey"
        :items="postForm.images"
        :navigation="true"
        :initial-slide="postForm?.images?.length - 1">
      <template #default="{item}">

        <TheNuxtIcon :name="item" icon-type="img" class="w-full h-80 object-cover "/>
      </template>

    </TheSwipper>
  </div>
  <template v-if="step === 0">
    <TheMultiUploadFile v-model="postForm.images"/>
    <div class="fixed bottom-0 right-0 p-4 !z-1 bg-secondary-700 w-full">
      <TheButton label="بعدی" class="w-full" :disable="!postForm?.images?.length" @click="step++ "/>
    </div>
  </template>
  <template v-if="step === 1">
    <TheInput input-type="textarea" placeholder="یه توضیح کوچیک اضافه کن :)" v-model="postForm.caption"/>
    <div class="fixed bottom-0 right-0 p-4 !z-1 bg-secondary-700 w-full">
      <TheButton label="منتشر کن" class="w-full" @click="submitPost" :loading="loading" />
    </div>
  </template>
<!--  <TheLog :data="postForm"/>-->
</template>

<script setup>
definePageMeta({layout: 'backward'})
const backward = useState('backwardTitle')
// -------------------------------------------
const step = ref(0)

backward.value =  computed(()=>step.value === 0 ?'انتخاب تصویر':'کپشن')
const userId = useCookie('userId')
const postForm = useLocalStorage('postForm', {
  userId: userId.value,
  images: [],
  caption:''
})
const swiperKey = ref(0)
watch(() => postForm.value?.images?.length, () => {
  swiperKey.value++
})
const {$toast} = useNuxtApp()

const loading = ref(false)
const route = useRoute()
const submitPost = async () => {
  if (loading.value) return
  loading.value = true

  try {
    const result = await postPost(postForm.value)
    if (result) {
      $toast.success('پستت منتشر شد')
      setTimeout(() =>
          navigateTo({name: 'profile-id',params:{id:userId.value}}), 1000
      )
      postForm.value = {
        userId: '',
        images: [],
        caption:''
      }
    }
  } catch (error) {
    console.log('login error', error)
    $toast.error('بروز خطای غیرمنتظره ، لطفا دوباره تلاش کنید')
    loading.value = false
  }


  loading.value = false
}
</script>