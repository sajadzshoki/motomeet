<template>
  <div class="flexCol gap-4">
    <div class="flex justify-between bg-secondary-500 rounded-lg p-3 items-center gap-4"
         :class="validation && !rideForm.title && 'border-(1 solid red-500)' ">
      <TheInput placeholder="نام راید"
                class-name="!px-0"
                class="w-full"
                focus-class-name=""
                v-model="rideForm.title"
      />
      <TheUploadFile v-model="rideForm.image" :class="validation && !rideForm.image && 'border-(2 solid red-500) rounded-full'"/>
    </div>
    <TheChipsInput prependIcon=""
                   v-model="rideForm.rules"
                   placeholder="قوانین راید"/>
    <TheInput input-mode="numeric"
              placeholder="حداقل حجم موتور"
              v-model="rideForm.minEngine"
              prepend-icon=""
    />
  <TheIRDatePicker type="date" v-model="rideForm.date"/>
    <TheHourSetter/>

  </div>
</template>

<script setup lang="ts">
definePageMeta({layout: 'backward'})
const title = useState('backwardTitle')
title.value = 'اطلاعات راید'
// -----------------------------------
const userId = useCookie('userId');
const rideForm = useLocalStorage('rideForm', {
  userId: userId.value,
  title: '',
  image: '',
  rules: [],
  minEngine: '',
  date: '',
  hour: '',
  maxRiders: '',
  description: '',
  clubId: '',
  fromAddressId: '',
  toAddressId: ''
})
// ------------------------------------------------
// -------------------------------------------
const {$toast} = useNuxtApp()
const validation = ref(false)
const loading = ref(false)

const route = useRoute()

const submitClub = async () => {
  if (loading.value) return
  loading.value = true
  const form = clubForm.value
  if (!form.name || !form.city) {
    $toast.error('اطلاعات را کامل وارد کنید')
    validation.value = true
    loading.value = false
    return
  }
  try {
    const result = await postClub({
      userId: userId.value,
      name: form.name,
      logo: form.logo || 'https://s3.vistatest.site/files/',
      cityId: form.city.id,
      // images:form.images || [],
    })
    if (result) {
      $toast.success('کلاب با موفقیت ساخته شد')
      setTimeout(() =>
          navigateTo({name: 'club-add-members', query: {clubId: result.id}}), 1000
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