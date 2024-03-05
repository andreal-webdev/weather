<script setup>
  import { ref } from 'vue';
  import searchBar from './components/searchBar.vue';
  import cardWeather from './components/cardWeather.vue';

  
  const places = ref([])
  const addPlace = (data) => {
    places.value.push(data)
  }

  const deleteCity = (name) => {
    if (confirm('Are you sure?')) {
      places.value = places.value.filter((p) => p.location.name !== name)
    }
  }

</script>

<template>
  <main>

    <!-- Navigation Bar -->
    <nav class=" bg-[#093358] flex items-center justify-between text-white text-[16px] py-2 px-3 mb-20">
          <a class="" href="index.html"><img src="./assets/logo-blue-bg.png" alt="" width="60"></a>
           <!--Current date-->
          <div class="text-center ">
            <i class="fa-regular fa-calendar text-[#24ceff]"></i>
            {{
              new Date().toLocaleDateString('en-us', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })
            }}
          </div>
    </nav>

    <div class="container-fluid mb-20 " id="hero">
      <div class="grid grid-cols-2 p-5">
        <div class="flex flex-col justify-center ml-5">
          
          <div class="hero-text text-white">
            <h1 class="text-4xl mb-3 hero-title font-bold">Welcome to Weatherly<span class="text-[#F2B705] text-4xl">!</span></h1>
            <p class="text-lg mb-2">Get accurate weather forecasts for the next 5 days and plan your activities with confidence.</p>
          </div>
          <!--Search Bar-->
          <div>   
            <searchBar @place-data="addPlace"/>
          </div>
        </div>

        <div class="flex items-center justify-center">
          <img class="img-responsive" src="./assets/hero.png" width="300">
        </div>
      </div>
      
    </div>

    <!--Card-->
    <div class="grid grid-cols-2 gap-4">
      <div v-for="(place, idx) in places" :key="idx">
          <cardWeather :place="place" @delete-city="deleteCity"/>
      </div>
    </div>


  </main>
</template>
