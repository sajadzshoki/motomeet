<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 z-30 flex justify-center items-center transition-all duration-300"
       :class="showModal ? 'opacity-100' : 'opacity-0'"
       @click.self="handleClose">
    <div
        ref="modalContent"
        class="overflow-y-auto flex flex-col fixed transition-all duration-300 ease-in-out max-h-95%
        sm:(bottom-1/2 translate-y-1/2 rounded-xl max-w-xl !mx-4 min-w-100)"
        :class="[
            className,
            center ? 'bottom-1/2 translate-y-1/2 rounded-xl max-w-xl !mx-4 ' : 'w-full rounded-t-xl bottom-0',
            showModal ? 'translate-y-0' : 'translate-y-full',
            { 'touch-none': center } // Disable touch events when centered
        ]"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
        :style="!center ? { transform: `translateY(${offsetY}px)` } : {}"
    >
      <div class="grid grid-cols-3 items-center bg-secondary-500 sticky rounded-t-xl top-0 w-full right-0 p-4 pb-0 z-5">
        <div class="mx-auto h-1px w-30 bg-secondary-200 absolute top-2 right-1/2 translate-x-1/2" v-if="!withClose && !center"></div>
        <TheNuxtIcon v-if="withClose" name="close" icon-type="svg" class="text-(2xl) cursor-pointer" @click="handleClose"/>
        <p class="font-600 text-md leading-6.5 justify-self-center">{{ title }}</p>
      </div>
      <div class="p-4 flex flex-col gap-3 bg-secondary-500">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const modalContent = ref<HTMLElement | null>(null);
const showModal = ref(false);
const startY = ref(0);
const offsetY = ref(0);
const isDragging = ref(false);
const touchStartTime = ref(0); // Added this line to track when touch started

const emit = defineEmits(['close']);

const props = defineProps({
  title: String,
  className: String,
  center: {
    type: Boolean,
    default: true
  },
  withClose: {
    type: Boolean,
    default: true
  }
});

onMounted(() => {
  document.body.style.overflow = 'hidden';
  setTimeout(() => {
    showModal.value = true;
  }, 100);
});

const handleClose = () => {
  showModal.value = false;
  document.body.style.overflow = '';
  setTimeout(() => {
    emit('close');
  }, 100);
};

const handleTouchStart = (e: TouchEvent) => {
  if (props.center) return;

  startY.value = e.touches[0].clientY;
  isDragging.value = true;
  touchStartTime.value = Date.now(); // Record when the touch started
};

const handleTouchMove = (e: TouchEvent) => {
  if (props.center || !isDragging.value) return;

  const currentY = e.touches[0].clientY;
  const deltaY = currentY - startY.value;

  // Only allow dragging downward
  if (deltaY > 0) {
    offsetY.value = deltaY;
    e.preventDefault();
  }
};

const handleTouchEnd = () => {
  if (props.center || !isDragging.value) return;

  isDragging.value = false;

  // Calculate swipe velocity (pixels per second)
  const touchDuration = Date.now() - touchStartTime.value;
  const velocity = offsetY.value / (touchDuration / 1000);

  // If dragged more than 100px or fast swipe (> 0.5px/ms velocity), close the modal
  if (offsetY.value > 100 || velocity > 0.5) {
    handleClose();
  } else {
    // Return to original position with animation
    offsetY.value = 0;
  }
};

onUnmounted(() => {
  document.body.style.overflow = '';
});
</script>