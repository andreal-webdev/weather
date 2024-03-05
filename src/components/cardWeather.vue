<script setup>
import { ref } from 'vue';
import borderLine from './borderLine.vue'
import forecastWeek from './forecastWeek.vue';
import moreInfo from './moreInfo.vue';


defineProps({
place: Object
})

const emit = defineEmits(['delete-city'])
const deleteCard= (placeName) => {
  emit('delete-city', placeName)
  showDetails.value = false

}
const showDetails = ref(false)

</script>

<template>
  <div :class="place.current.is_day === 1 ? 'bg-day' : 'bg-night'" class="text-white p-10 rounded-lg shadow-lg gap-6 mb-6 relative overflow-hidden ">
    <!-- Location & time -->
    <div class="mb-2">
      
      <div class="flex items-center justify-end mb-2">
        <button @click="$emit('delete-city', place.location.name)">
          <i class="fa-solid fa-trash hover:text-[#F2B705]"></i>
        </button>
      </div>

      <div>
        <div class="flex items-center justify-start">
          <div class="flex items-center gap-2">
            <i class="fa-solid fa-location-dot text-[#24ceff]"></i>
            <h1 class="text-3xl">{{ place.location.name }}</h1>
          </div>
        </div>

        <div class="flex items-center justify-start">
          <div class="flex items-center gap-2">
            <i class="fa-solid fa-clock text-[#24ceff]"></i>
            <h1 class="text-2xl">{{ new Date(place.location.localtime).getHours() }}:{{ new Date(place.location.localtime).getMinutes() }}</h1>
          </div>
        </div>
      </div>
    </div>

    <!-- current weather -->
    <div class="text-center flex-1">
      <img :src="place.current.condition.icon" alt="icon" width="100" class="mx-auto -mb-13" />
      <h1 class="text-4xl mb-4">{{Math.round(place.current.temp_c)}}&deg;</h1>
      <p class="text-2xl">{{place.current.condition.text}}</p>
    </div>

    <borderLine />

    <!-- forecast -->
    <div v-for="(day, idx) in place.forecast.forecastday" :key="idx">
      <forecastWeek :day="day"/>
    </div>

    <!-- info -->
    <Transition name="fade">
      <div v-show="showDetails">
        <moreInfo :place="place" @close-info="showDetails = false" @delete-card="deleteCard(place.location.name)"/>
      </div>
    </Transition>

    <!-- forecast btn -->
    <div class="flex justify-end items-center gap-1 mt-10">
      <button @click="showDetails = true">Details <i class="fa-solid fa-arrow-right text-sm -mb-px"></i></button>
    </div>
  </div>
</template>

<style scoped>

  .bg-day {
    background-color: #D0E7FF;
    background-image: linear-gradient(62deg, #1f6cb4 0%, #9ec9f1 100%);
    /* color: #07223d; */
  }
  .bg-night {
    background-color: #07223d;
    background-image: linear-gradient(62deg, #0a2a4a 0%, #270845 100%);
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s ease;
  }

  .fade-enter-from,
  .fade-leave-to { 
    opacity: 0;
  }

</style>