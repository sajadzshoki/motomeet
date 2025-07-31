<template>
  <div class="flexCol gap-4">
    <div class="flex justify-between bg-secondary-500 rounded-lg p-3 items-center gap-4"
         :class="validation && !clubForm.name && 'border-(1 solid red-500)' ">
      <TheInput placeholder="نام کلاب" class-name="!px-0" class="w-full"
                focus-class-name=""
                v-model="clubForm.name"/>
      <TheUploadFile v-model="clubForm.logo" :class="validation && !clubForm.logo && 'border-(2 solid red-500) rounded-full'"/>
    </div>
    <TheDropdown :data="cities"
                 label="name"
                 prepend-icon="location"
                 v-model="clubForm.city"
                 title="شهر کلاب را انتخاب کنید"
                 :validation="validation && !clubForm.city"
    />
    <p class="text-xs">نوع کلاب :</p>
    <TheCheckbox label="خصوصی" v-model="clubForm.type" />
    <p class="text-(2.5 gray-300) leading-6.5 -mt-2">اگر کلاب خصوصی باشه بقیه نمیتونن ببیننش و فقط برای خودته و دوستات که اضافشون میکنی :)</p>
    <TheMultiUploadFile v-if="route.query.id" v-model="clubForm.images" />


  </div>
    <TheFab :icon="loading?'loading':'nav-right'" class-name="!bottom-10" @click="submitClub"/>
  <TheLog :data="clubForm"/>
</template>

<script setup lang="ts">
definePageMeta({layout: 'backward'})
const backward = useState('backwardTitle')
backward.value = 'ساخت کلاب'
// -------------------------------------------
const {data: cities} = await useAsyncData('get-cities', () => getCities({}))
const clubForm = useLocalStorage('clubForm',{
  name:'',
  city:'',
  logo:'https://s3.vistatest.site/files/',
  type:false,
  images:[],
})
// -------------------------------------------
const {$toast} = useNuxtApp()
const validation = ref(false)
const loading = ref(false)
const userId = useCookie('userId');
const route = useRoute()

const submitClub = async () => {
  if (loading.value) return
  loading.value = true
  const form = clubForm.value
  if (!form.name || !form.city ) {
    $toast.error('اطلاعات را کامل وارد کنید')
    validation.value = true
    loading.value = false
    return
  }
  try {
    const result = await postClub({
      userId: userId.value,
      name:form.name,
      logo:form.logo ||'https://s3.vistatest.site/files/' ,
      cityId:form.city.id,
      // images:form.images || [],
    })
    if (result) {
      $toast.success('کلاب با موفقیت ساخته شد')
      setTimeout(() =>
          navigateTo({name:'club-add-members',query:{clubId:result.id}}), 1000
      )
    }
  } catch (error) {
    console.log('login error', error)
    $toast.error('بروز خطای غیرمنتظره ، لطفا دوباره تلاش کنید')
    loading.value = false
    validation.value = false
  }


  loading.value = false
}

</script>