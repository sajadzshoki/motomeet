<template>
  <div
      class="fixed absolute inset-0 bg-black bg-opacity-40 !z-50 transition-all duration-300"
      @click.self="handleClose"
  >
    <div
        class="bg-secondary-600 w-55 h-full !z-20 py-4 px-6 flexCol gap-8 transition-all duration-500"
        :class="showModal ? 'translate-x-0' : 'translate-x-65'"
    >
      <!-- Header -->
      <div class="flex items-center justify-between">
        <TheNuxtIcon name="logo" icon-type="svg" class="!svg:(w-10) text-white" @click="navigateTo({name:'index'})"/>
        <TheNuxtIcon
            name="close"
            icon-type="svg"
            class="text-(xl) cursor-pointer"
            @click="handleClose"
        />
      </div>

      <div v-if="config.public.isDentist"
           class="flex items-center gap-2 mt-5 border-b-(1 solid gray-200) -mx-6 px-6 pb-4">
        <TheNuxtIcon name="profile.png" icon-type="svg" class="!w-13 !h-13 rounded-full object-cover"/>
        <div class="flexCol">
          <p class="text-(xs) font-600 leading-6.5">ایمان طیبی</p>
          <p class="text-(2.5 gray-600) font-400 leading-5">متخصص جراحی لثه</p>

        </div>

      </div>

      <!-- Main Navigation -->
      <div class="flexCol gap-6">
        <div
            v-for="(item, index) in items"
            :key="index"
            class="flexCol select-none transition-all duration-300"
        >
          <NuxtLink
              :to="{ name: item.link }"
              class="flex gap-2 select-none"
              :class="{'text-primary-500':activeDropdown === index}"
              @click.prevent="toggleDropdown(index, item.handler)"
          >
            <TheNuxtIcon :name="item.icon" icon-type="svg" class="!svg:(w-5)"/>
            <p
                class="text-(sm) font-500 leading-6.5"
                :class="{ 'text-primary-500': route.name === item.link }"
                @click.prevent="item.func?item.func():null"
            >
              {{ item.label }}
            </p>
            <TheNuxtIcon
                v-if="item.handler"
                name="arrow-down-1"
                icon-type="svg"
                class="!svg:(w-6) mr-auto transition-transform duration-300"
                :class="{ 'rotate-180': activeDropdown === index }"
            />
          </NuxtLink>

          <!-- Sub Options -->
          <div
              v-if="item.handler"
              class="flexCol transition-all duration-300 gap-2 p-2 overflow-hidden"
              :class="{
              'translate-y-0 h-full opacity-100': activeDropdown === index,
              '-translate-y-40 -my-2 h-0 opacity-0': activeDropdown !== index
            }"
          >
            <NuxtLink
                v-for="(subItem, subIndex) in item.options"
                :key="subIndex"
                :to="{ name: subItem.link,query:subItem.query }"
                class="flex gap-2"
            >
              <TheNuxtIcon :name="subItem.icon" icon-type="svg" class="!svg:(w-4)"/>
              <p class="text-(xs) font-500 leading-6.5">{{ subItem.label }}</p>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex items-center justify-between mt-auto">
        <p class="text-(sm) font-500 leading-6.5 flex gap-2">
          <TheNuxtIcon name="mdi_support" icon-type="svg" class="text-(xl)"/>
          پشتیبانی
        </p>
        <p class="text-(sm) font-500 leading-6.5">021-43316102</p>
      </div>

      <!-- Socials -->
      <div class="flex justify-between items-center">
        <TheNuxtIcon
            v-for="(logo, index) in logos"
            :key="index"
            :name="logo"
            icon-type="svg"
            class="!svg:w-6"
        />
      </div>
    </div>
  </div>

<!--    <TheLog :data="config.public" />-->
</template>

<script setup lang="ts">
const emit = defineEmits(['close']);
const route = useRoute();

const showModal = ref(false);
const activeDropdown = ref<number | null>(null);
const config = useRuntimeConfig()
const items = ref([
  {label: 'کلاب من', icon: 'icon-2(1)', link: ''},
  {
    label: 'راید های پیش رو',
    icon: 'Icon(1)',
    link: 'ride',
  },
  // {
  //   label: 'تعرفه دندان پزشکی',
  //   icon: 'material-symbols_money',
  //   handler: true,
  //   options: [
  //     {label: 'آزاد', link: '', query: {type: 'azad'}, icon: 'rivet-icons_money'},
  //     {label: 'دندونت', link: '', query: {type: 'dandunet'}, icon: 'rivet-icons_money'},
  //     {label: 'سندیکای بیمه گران', link: '', query: {type: 'sandika'}, icon: 'rivet-icons_money'},
  //   ],
  // },
  // {
  //   label: 'پرونده و سوابق من',
  //   icon: 'Icon-1(1)',
  //   handler: true,
  //   options: [
  //     {label: 'طرح درمان', link: '', query: {by: 'treatment'}, icon: 'ri_mental-health-fill'},
  //     {label: 'سوابق هزینه ها', link: '', icon: 'rivet-icons_money'},
  //   ],
  // },
  {label: 'کلاب ها', icon: 'Icon-2', link: 'club'},
  {label: 'نقشه', icon: 'map', link: 'map'},
  {label: 'تعمیرگاه ها', icon: 'Icon-7', link: ''},
  {label: 'آموزش ها', icon: 'user', link: '',func:()=>[config.public.isDentist=true,navigateTo({name: ''})]},
  {label: 'آموزش ها', icon: '24-support', link: ''},
]);



const logos = ['instagram', 'telegram', 'linkedin', 'twitter'];

const toggleDropdown = (index: number, hasDropdown?: boolean) => {
  if (!hasDropdown) return;
  activeDropdown.value = activeDropdown.value === index ? null : index;
};

const handleClose = () => {
  showModal.value = false;
  document.body.style.overflow = '';
  setTimeout(() => {
    emit('close');
  }, 100);
}
onMounted(() => {
  document.body.style.overflow = 'hidden';
  setTimeout(() => {
    showModal.value = true;
  }, 100);
});
onUnmounted(() => {
  document.body.style.overflow = '';
});
</script>