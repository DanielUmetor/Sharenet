<template>
    <div class="home-page">
      <app-navigation />
      <div class="content">
        <h1>Spot Prices Dashboard</h1>
        
        <SpotSummary 
          v-if="spotPrices.length" 
          :spots="spotPrices" 
        />
        
        <div v-if="isLoading" class="loading">
          Loading spot prices...
        </div>
        
        <div v-else-if="error" class="error">
          {{ error }}
        </div>
        
        <SpotTable 
          v-else-if="spotPrices.length" 
          :spots="spotPrices" 
        />
        
        <div v-else class="no-data">
          No spot prices available
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import AppNavigation from '@/components/AppNavigation.vue';
import SpotTable from '@/components/SpotTable.vue';
import SpotSummary from '@/components/SpotSummary.vue';
import { spotService } from '@/services/api';
import type { SpotPrice } from '@/interfaces/SpotPrice';

export default defineComponent({
  name: 'HomePage',
  components: {
    AppNavigation,
    SpotTable,
    SpotSummary
  },
  setup() {
    const spotPrices = ref<SpotPrice[]>([]);
    const isLoading = ref(true);
    const error = ref<string | null>(null);
    
    // Explicitly type the interval as NodeJS.Timeout
    let refreshInterval: NodeJS.Timeout;

    const fetchData = async () => {
      try {
        isLoading.value = true;
        const result = await spotService.fetchSpotPrices();
        
        if (result.error) {
          error.value = result.error;
        } else {
          spotPrices.value = result.data;
          error.value = null;
        }
      } catch (err) {
        error.value = 'Failed to fetch spot prices';
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(() => {
      fetchData(); // Initial fetch
      
      // Refresh every 5 minutes
      refreshInterval = setInterval(fetchData, 5 * 60 * 1000);
    });

    // Clean up interval when component is unmounted
    onUnmounted(() => {
      clearInterval(refreshInterval);
    });

    return {
      spotPrices,
      isLoading,
      error
    };
  }
});
</script>
  
  <style scoped>
  .loading, .error, .no-data {
    text-align: center;
    padding: 20px;
    background-color: #f4f4f4;
    border-radius: 5px;
  }
  
  .error {
    color: red;
  }
  
  .loading {
    color: #666;
  }
  </style>