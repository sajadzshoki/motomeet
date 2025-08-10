

<template>
  <div class="fixed bottom-0 w-full flex justify-between items-center px-3 py-1 h-12  bg-secondary-700  ">
    <div class="flex w-full item-center gap-2 transition-transform duration-200 "
         :class="( !inputValue &&!isRecording && !audioUrl ) ? 'translate-x-9' : 'translate-x-0' ">
      <TheNuxtIcon :name="'send'" icon-type="svg" class="text-(2xl gray-500)" @click="sendMessage"/>
      <span v-if="isRecording" class="text-(nowrap xs ) self-center">
      {{ String(recordingTime % 60).padStart(2, '0') }} :
      {{ String(Math.floor(recordingTime / 60)).padStart(2, '0') }}
    </span>
      <input v-if="!isRecording && !audioUrl" type="text"
             class=" py-3 text-white  placeholder:text-gray-500"
             placeholder="نوشتن پیام"
             v-model="inputValue"

      />

      <TheNuxtIcon v-else-if="isRecording" name="voice-wave.gif" icon-type="img" class="w-full h-auto "/>

<!--        <audio v-if="audioUrl" :src="audioUrl" controls class="w-40" ></audio>-->
      <!-- Custom Player -->
      <div v-if="audioUrl && !isRecording" class="flex items-center gap-3 w-full max-w-xs">

        <TheNuxtIcon @click="togglePlay" :name="!isPlaying ? 'play-circle' : 'pause-circle'"
                     icon-type="svg"
                     class="text-(3xl primary-500) h-auto "
        />
        <input
            type="range"
            min="0"
            max="100"
            step="1"
            v-model="progress"
            class="flex-1 h-1"
            @input="audioPlayer.currentTime = (progress / 100) * audioPlayer.duration"
        />
        <audio
            ref="audioPlayer"
            :src="audioUrl"
            @timeupdate="onTimeUpdate"
            @play="onPlay"
            @pause="onPause"
        />
      </div>

    </div>
    <div class="flex items-center px-2 gap-4 transition-transform" :class="( inputValue ) ? '-translate-x-19' : 'translate-x-0' ">
      <TheNuxtIcon v-if="!audioUrl" :name="isRecording?'stop-circle':'microphone'" icon-type="svg" class="text-(xl gray-500) transition-all  "
                   @click="isRecording ? stopRecording() : startRecording()"
                   :class="isRecording ? 'text-red-500' : ''"
      />
      <TheNuxtIcon v-if="audioUrl" name="Delete" icon-type="svg" class="text-(xl red-500)" @click="audioUrl=null"/>
      <TheNuxtIcon v-if="!audioUrl && !isRecording" name="attach-circle" icon-type="svg" class="text-(xl gray-500)  "/>

    </div>
  </div>
<!--  <TheLog :data="audioUrl" :fixed="true"/>-->
</template>
<style scoped>
input[type="range"] {
  accent-color: #6d28d9; /* purple theme */
  scale:90%
}
</style>
<script setup lang="ts">
const audioPlayer = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)
const progress = ref(0)
const togglePlay = () => {
  if (!audioPlayer.value) return
  if (isPlaying.value) {
    audioPlayer.value.pause()
  } else {
    audioPlayer.value.play()
  }
}

const onTimeUpdate = () => {
  if (!audioPlayer.value) return
  progress.value = (audioPlayer.value.currentTime / audioPlayer.value.duration) * 100
}

const onPlay = () => (isPlaying.value = true)
const onPause = () => (isPlaying.value = false)
const emit = defineEmits(['refresh'])
const inputValue = ref('')
const loading = ref(false)
const userId = useCookie('userId')
const route = useRoute()
const scrollToDown = ()=>{
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth'
  });
}
const sendMessage = async () => {
  if(loading.value)return;
  console.log('send message')
  if(!inputValue.value)return;
  loading.value=true

  const result = await postMessages({
    text: inputValue.value,
    userId:userId.value,
    chatId:route.params.id,
  })
  if(result){

  emit('refresh')
  inputValue.value = ''
  }
  scrollToDown()
  loading.value=false
}
// VOICE RECORDER ------------------------------------------------------------------------------------------
const isRecording = ref(false)
const mediaRecorder = ref<MediaRecorder | null>(null)
const audioChunks: Blob[] = []
const audioUrl = ref<string | null>(null)
const recordingTime = ref(0) // ⏱ timer value in seconds
let timerInterval: number | null = null // interval ID
const startRecording = async () => {
  try{
    const stream = await navigator.mediaDevices.getUserMedia({audio: true })
    mediaRecorder.value = new MediaRecorder(stream)
    audioChunks.length = 0
    recordingTime.value = 0 // reset timer
    console.log(mediaRecorder.value)
    mediaRecorder.value.ondataavailable = e =>{
      if(e.data.size > 0) audioChunks.push(e.data)
    }
    mediaRecorder.value.onstop = () => {
      const blob = new Blob(audioChunks, { type: 'audio/webm' })
      audioUrl.value = URL.createObjectURL(blob)
      clearInterval(timerInterval!)
      // send blob to backend here if needed
    }
    mediaRecorder.value.start()
    isRecording.value = true
    timerInterval = window.setInterval(() => {
      recordingTime.value++
    }, 1000)
  }catch (err) {
    console.error('س', err)
  }
}
const stopRecording = () => {
  if (mediaRecorder.value && mediaRecorder.value.state !== 'inactive') {
    mediaRecorder.value.stop()
  }
    isRecording.value = false
  if (timerInterval) clearInterval(timerInterval)
}

</script>