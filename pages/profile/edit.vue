<template>
  <div class="flexCol gap-4">
    <div class="flex justify-between bg-secondary-500 rounded-lg p-3 items-center gap-4">
      <TheInput placeholder="نام خود را وارد کنید" class-name="!px-0" class="w-full"
                focus-class-name=""
                v-model="profileForm.firstName"/>
      <TheUploadFile v-model="profileForm.avatar"/>
    </div>
    <TheInput placeholder="نام مستعارت چیه ؟    " v-model="profileForm.nickName"
              prepend-icon="profile-helmet"
    />
    <TheChipsInput prependIcon="Transport" v-model="profileForm.motors"
                   placeholder="مدل موتورهات چیه"
    />
    <TheInput placeholder="ایمیلت" v-model="profileForm.email"
              prepend-icon="email"
    />
    <TheInput input-type="textarea" v-model="profileForm.bio"
              placeholder="بذار بقیه تو رو بیشتر بشناسن!"
              prepend-icon="user"
    />

  </div>
  <TheFab :icon="loading?'loading':'done'" class-name="!bottom-10" @click="submitProfile"/>
</template>

<script setup lang="ts">
import type {Profile} from "~/types/models";

definePageMeta({layout: 'backward'})
const backward = useState('backwardTitle')
backward.value = 'ویرایش پروفایل'
// -------------------------------------------
const {$toast} = useNuxtApp()
const validation = ref(false)
const loading = ref(false)
const userId = useCookie('userId');
const {user} = await useUser()
const profileForm = ref({
  firstName:'',
  lastName:'',
  nickName:'',
  avatar:'',
  motors:[],
  email:'',
  bio:''
})
onMounted(()=>{
  profileForm.value = _cloneDeep(user.value.profile as Profile);


})
const submitProfile = async () => {
  if (loading.value) return
  loading.value = true
  // if (!profileForm.value) {
  //   $toast.error('اطلاعات را کامل وارد کنید')
  //   validation.value = true
  //   loading.value = false
  //   return
  // }
  try {
    const result = await putProfile((profileForm.value),user.value?.profile?.id)
    if (result) {
      // if(profileForm.value.email){
      //   await putUser({email: profileForm.value.email}, userId.value)
      // }
      $toast.success('اطلاعات شما با موفقیت تغییر به روز شد')
      setTimeout(() =>
          navigateTo({name: 'profile'}), 1000
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