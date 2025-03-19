<template>
    <div class="home-page">
      <app-navigation />
      <div class="content">
        <h1>Spot Prices</h1>
        <SpotTable :spots="spotPrices" />
      </div>
    </div>
  </template>
  
  <script lang="ts">
  /* eslint-disable vue/no-unused-components */
  import { defineComponent, ref, onMounted } from 'vue';
  import AppNavigation from '@/components/AppNavigation.vue';
  import SpotTable from '@/components/SpotTable.vue';
  import { spotService } from '@/services/api';
  import type { SpotPrice } from '@/interfaces/SpotPrice';
  
  export default defineComponent({
    name: 'HomePage',
    components: {
      AppNavigation,
      SpotTable
    },
    setup() {
      const spotPrices = ref<SpotPrice[]>([]);
  
      onMounted(async () => {
        spotPrices.value = await spotService.fetchSpotPrices();
      });
  
      return {
        spotPrices
      };
    }
  });
  </script>
  
  <style scoped>
  .home-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
  }
  
  .content {
    margin-top: 1rem;
  }
  </style>