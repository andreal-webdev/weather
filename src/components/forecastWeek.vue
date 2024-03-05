<script setup>
defineProps({
  day: Object
})

</script>

<template>
  <div class="mb-2 flex items-center justify-between">
    <table class="w-full table-fixed">
      <tr>
        <!-- day of the week -->
        <td class="w-1/4 ">
          {{new Date(day.date).toLocaleDateString('en-us', {weekday:'long'})}}
        </td>
      
        <!-- icon -->
        <td class="w-1/4 text-left">
          <img :src="day.day.condition.icon" alt="icon" width="30" class="mx-auto" />
        </td>

        <!-- high/low temp -->
        <td class="w-1/2 text-right">{{ Math.round( day.day.maxtemp_c)}}&deg;/{{ Math.round(day.day.mintemp_c)}}&deg;</td>
      </tr>

    </table>
  </div>
</template>