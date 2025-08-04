<template>
  <div class="flexCol gap-4">
    <div class="flex justify-between bg-secondary-500 rounded-lg p-3 items-center gap-4"
         :class="validation && !clubForm.name && 'border-(1 solid red-500)' ">
      <TheInput placeholder="اسم کلاب" class-name="!px-0" class="w-full"
                focus-class-name=""
                v-model="clubForm.name"/>
      <TheUploadFile v-model="clubForm.logo"
                     :class="validation && !clubForm.logo && 'border-(2 solid red-500) rounded-full'"/>
    </div>
    <TheDropdown :data="cities"
                 label="name"
                 prepend-icon="location"
                 v-model="clubForm.city"
                 title="کلاب تو چه شهریه"
                 :validation="validation && !clubForm.city"
    />
    <p class="text-xs">نوع کلاب :</p>
    <TheCheckbox label="خصوصی" v-model="clubForm.private"/>
    <p class="text-(2.5 gray-300) leading-6.5 -mt-2">اگر کلاب خصوصی باشه بقیه نمیتونن ببیننش ! فقط برای خودته و دوستات
      که اضافشون میکنی :)</p>
    <TheMultiUploadFile :max="50" v-if="route.query.id" v-model="clubForm.images"/>


  </div>
  <TheFab v-if="route.query.id" :icon="loading?'loading':'done'" class-name="!bottom-10" @click="submitClub"/>
  <TheFab v-else :icon="loading?'loading':'nav-right'" class-name="!bottom-10" @click="submitClub"/>
  <TheLog :data="[club,clubForm]"/>
</template>

<script setup lang="ts">
import type {Club} from "~/types/models";

definePageMeta({layout: 'backward'})
const backward = useState('backwardTitle')
backward.value = 'ساخت کلاب'
// -------------------------------------------
const {data: cities} = await useAsyncData('get-cities', () => getCities({}))
const clubForm = useLocalStorage('clubForm', {
  name: '',
  city: '',
  logo: '',
  private: false,
  images: [],
})
// -------------------------------------------
const {$toast} = useNuxtApp()
const validation = ref(false)
const loading = ref(false)
const userId = useCookie('userId');
const route = useRoute()
const {data: club} = await useAsyncData('get-club-edit', () => getClub(route.query.id, {'with-city': true}), {immediate: !!route.query.id})

if (route.query.id) {
  clubForm.value = (_cloneDeep(club.value) as Club)
  clubForm.value.city = (_cloneDeep(club.value.city))

}
const submitClub = async () => {
  if (loading.value) return
  loading.value = true
  const form = clubForm.value
  if (!form.name || !form.city || !form.logo) {
    $toast.error('اطلاعات را کامل وارد کنید')
    validation.value = true
    loading.value = false
    return
  }
  if (route.query.id) {
    try {
      const result = await putClub({
        name:form.name,
        logo:form.logo  ,
        cityId:form.city.id,
        private:form.private,
        images:form.images || [],
      }, route.query.id)
      if (result) {
        $toast.success('ویرایش انجام شد')
        setTimeout(() =>
            navigateTo({name: 'club-id', params: {id: route.query.id},query:{made:true}}), 1000
        )
      clubForm.value={}
      }
    } catch (error) {
      console.log('login error', error)
      $toast.error('بروز خطای غیرمنتظره ، لطفا دوباره تلاش کنید')
      loading.value = false
      validation.value = false
    }
  }
  else{
  navigateTo({name: 'club-add-members'})
  }


  loading.value = false
}

</script>
