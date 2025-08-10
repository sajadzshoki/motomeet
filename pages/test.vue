


<script setup lang="ts">
import { ref, onUnmounted } from 'vue'

const isRecording = ref(false)
const recordingTime = ref(0)
const timerInterval = ref<number | null>(null)

const mediaRecorder = ref<MediaRecorder | null>(null)
const audioChunks: Blob[] = []
const audioBlob = ref<Blob | null>(null)
const audioUrl = ref<string | null>(null)

const audioPlayer = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)
const progress = ref(0)

const startRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    mediaRecorder.value = new MediaRecorder(stream)
    audioChunks.length = 0
    recordingTime.value = 0

    mediaRecorder.value.ondataavailable = e => {
      if (e.data.size > 0) audioChunks.push(e.data)
    }

    mediaRecorder.value.onstop = () => {
      audioBlob.value = new Blob(audioChunks, { type: 'audio/webm' })
      audioUrl.value = URL.createObjectURL(audioBlob.value)
    }

    mediaRecorder.value.start()
    isRecording.value = true

    timerInterval.value = window.setInterval(() => {
      recordingTime.value++
    }, 1000)
  } catch (err) {
    console.error('Microphone error', err)
  }
}

const stopRecording = () => {
  if (mediaRecorder.value && mediaRecorder.value.state !== 'inactive') {
    mediaRecorder.value.stop()
  }
  isRecording.value = false
  if (timerInterval.value) clearInterval(timerInterval.value)
}

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

onUnmounted(() => {
  if (timerInterval.value) clearInterval(timerInterval.value)
})
</script>

<template>
  <div class="flex items-center gap-2">
    <!-- Recording Button -->
    <button
        @mousedown="startRecording"
        @mouseup="stopRecording"
        class="p-3 rounded-full bg-gray-700 hover:bg-gray-600 text-white"
    >
      <span v-if="!isRecording">🎤</span>
      <span v-else class="animate-pulse text-red-500">⏺</span>
    </button>

    <!-- Recording Timer -->
    <div v-if="isRecording" class="flex items-center gap-2">
      <div class="w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
      <span class="text-white">{{ String(Math.floor(recordingTime / 60)).padStart(2,'0') }}:{{ String(recordingTime % 60).padStart(2,'0') }}</span>
      <div class="flex gap-1">
        <span v-for="i in 10" :key="i" class="w-1 bg-white rounded" :style="{height: (Math.random()*10 + 5) + 'px'}"></span>
      </div>
    </div>

    <!-- Custom Player -->
    <div v-if="audioUrl && !isRecording" class="flex items-center gap-3 w-full max-w-xs">
      <button @click="togglePlay" class="bg-gray-700 text-white rounded-full p-2">
        {{ isPlaying ? '⏸' : '▶' }}
      </button>
      <input
          type="range"
          min="0"
          max="100"
          step="1"
          v-model="progress"
          class="flex-1"
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
</template>

<style scoped>
input[type="range"] {
  accent-color: #6d28d9; /* purple theme */
}
</style>















<!--<script setup lang="ts">-->
<!--definePageMeta({layout:false})-->
<!--import { ref } from 'vue'-->

<!--const isRecording = ref(false)-->
<!--const mediaRecorder = ref<MediaRecorder | null>(null)-->
<!--const audioChunks: Blob[] = []-->
<!--const audioUrl = ref<string | null>(null)-->

<!--const startRecording = async () => {-->
<!--  try {-->
<!--    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })-->
<!--    mediaRecorder.value = new MediaRecorder(stream)-->

<!--    audioChunks.length = 0 // reset chunks-->

<!--    mediaRecorder.value.ondataavailable = e => {-->
<!--      if (e.data.size > 0) {-->
<!--        audioChunks.push(e.data)-->
<!--      }-->
<!--    }-->

<!--    mediaRecorder.value.onstop = () => {-->
<!--      const blob = new Blob(audioChunks, { type: 'audio/webm' })-->
<!--      audioUrl.value = URL.createObjectURL(blob)-->
<!--      // send blob to backend here if needed-->
<!--    }-->

<!--    mediaRecorder.value.start()-->
<!--    isRecording.value = true-->
<!--  } catch (err) {-->
<!--    console.error('Microphone access denied or error', err)-->
<!--  }-->
<!--}-->

<!--const stopRecording = () => {-->
<!--  if (mediaRecorder.value && mediaRecorder.value.state !== 'inactive') {-->
<!--    mediaRecorder.value.stop()-->
<!--    isRecording.value = false-->
<!--  }-->
<!--}-->

<!--</script>-->

<!--<template>-->
<!--  <div>-->
<!--    <button-->
<!--        @click="isRecording ? stopRecording() : startRecording()"-->
<!--        :class="isRecording ? 'bg-red-500' : 'bg-green-500'"-->
<!--        class="px-4 py-2 text-white rounded"-->
<!--    >-->
<!--      {{ isRecording ? 'Stop Recording' : 'Start Recording' }}-->
<!--    </button>-->

<!--    <div v-if="audioUrl" class="mt-4">-->
<!--      <audio :src="audioUrl" controls></audio>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->


<!--<style scoped>-->

<!--</style>-->