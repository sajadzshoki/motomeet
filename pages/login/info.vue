<template>
  <div class="flexCol gap-4 items-center ">
    <div class='flex gap-4 w-full'>
      <TheInput className="bg-secondary-800" :validation="validation && !firstName" placeholder="اسمت کوچیکت؟"
                label="نام*" class="w-full" v-model="firstName"/>
      <TheInput className="bg-secondary-800" :validation="validation && !lastName" placeholder="اسم بزرگت؟ :)"
                label="نام خانوادگی*" class="w-full" v-model="lastName"/>
    </div>
    <TheInput className="bg-secondary-800" placeholder="میخوای به اسم دیگه ای بشناسنت؟" label="ملقب به" class="w-full"
              v-model="nickName"/>
    <TheChipsInput className="bg-secondary-800" class="w-full" label="موتور ها*" placeholder="مثلا هوندا cbr250"
                   v-model="motors"/>
<!--    <TheInput className="bg-secondary-800" :validation="!email && validation " placeholder="sample@gmail.com"-->
<!--              label="ایمیل" class="w-full" v-model="email"/>-->
    <TheButton label="ورود" class="w-full" @click="submit" :loading="loading"/>

  </div>
  <TheLog :data="motors"/>
</template>

<script setup lang="ts">
import {putProfile} from "~/composables/services";

definePageMeta({layout: 'login'})
const loginHead = useState('loginHead')
const loginInfo = useState('loginInfo')
loginHead.value = 'خوش اومدی'
loginInfo.value = 'اطلاعات اولیه خود را وارد کنید'
// -------------------------------------------------
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const motors = ref([])
const nickName = ref('')
const {$toast} = useNuxtApp()
const validation = ref(false)
const loading = ref(false)
const userId = useCookie('userId');
const route = useRoute()
const {data: user} = await useAsyncData('get-user-info', () => getUser(userId.value, {
  'with-profile': true,
}))
const emailValid = computed(() => isValidEmail(email.value))
const submit = async () => {
  if (loading.value) return
  loading.value = true
  if (!firstName.value && !lastName.value) {
    ``
    $toast.error('نام و نام خانوادگی را وارد کنید')
    validation.value = true
    loading.value = false
    return
  }
  // if (email.value && !emailValid.value) {
  //   $toast.error('فرمت ایمیل اشتباه است')
  //   loading.value = false
  //   return
  // }
  try {
    const result = await putProfile({
      firstName: firstName.value,
      lastName: lastName.value,
      motors: motors.value,
      nickName: nickName.value
    }, user.value?.profile?.id)
    if (result) {
      if (email.value) {
        await putUser({email: email.value}, userId.value)
      }
      $toast.success('خوش اومدی')
      setTimeout(() =>
          navigateTo({name: 'index'}), 1000
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