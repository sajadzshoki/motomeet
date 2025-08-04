<template>
  <div class="flexCol gap-4">
    <div class="flex justify-between bg-secondary-500 rounded-lg p-3 items-center gap-4"
         :class="validation && !rideForm.title && 'border-(1 solid red-500)' ">
      <TheInput placeholder="اسم راید *"
                class-name="!px-0"
                class="w-full"
                focus-class-name=""
                v-model="rideForm.title"
      />
      <TheUploadFile v-model="rideForm.image"
                     :class="validation && !rideForm.image && 'border-(2 solid red-500) rounded-full'"/>
    </div>
    <TheChipsInput prependIcon=""
                   v-model="rideForm.rules"
                   placeholder="قوانین راید"/>

    <TheInput input-mode="numeric"
              placeholder="حداقل حجم موتور"
              v-model="rideForm.minEngine"
              prepend-icon=""
    />
    <TheIRDatePicker type="date" placeholder="تاریخ" v-model="rideForm.date"
                     :validation="validation && !rideForm.date"/>
    <TheHourSetter v-model="rideForm.hour" :validation="validation && !rideForm.hour"/>
    <TheInput input-mode="numeric"
              placeholder="حداکثر تعداد اعضا"
              v-model="rideForm.maxRiders"
    />
    <TheLoadingPage v-if="status=='pending'"/>
    <TheDropdown v-else :data="clubs" label="name" title="کلاب مرتبط" v-model="rideForm.clubId" :validation="validation && !rideForm.clubId"/>

    <TheInput input-type="textarea"
              placeholder="توضیحات راید"
              v-model="rideForm.description"
    />
  </div>
  <TheFab :icon="loading?'loading':'nav-right'" class-name="!bottom-10" @click="submitRide"/>
<!--  <TheLog :data="rideForm"/>-->
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
const {data: clubs,status} =  useAsyncData('get-clubs-ride-add', () => getClubs( {
  'userId:eq':userId.value
}))
// -------------------------------------------
const {$toast} = useNuxtApp()
const validation = ref(false)
const loading = ref(false)

const route = useRoute()

const submitRide = async () => {
  if (loading.value) return
  loading.value = true
  const form = rideForm.value
  if (!form.title || !form.image || !form.date || !form.hour || !form.clubId) {
    $toast.error('اطلاعات را کامل وارد کنید')
    validation.value = true
    loading.value = false
    return
  }
  navigateTo({name:'ride-add-map'})


  loading.value = false
}
</script>