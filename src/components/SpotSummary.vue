<template>
    <div class="spot-summary">
      <div class="summary-grid">
        <div 
          v-for="category in categorySummary" 
          :key="category.name" 
          class="summary-card"
        >
          <h3>{{ category.name }}</h3>
          <div class="summary-details">
            <p>Total Spots: {{ category.totalSpots }}</p>
            <p>Avg Price: {{ category.avgPrice.toFixed(2) }}</p>
            <p 
              :class="{
                'positive-move': category.avgMove > 0,
                'negative-move': category.avgMove < 0
              }"
            >
              Avg Move: {{ category.avgMove.toFixed(2) }}%
            </p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType, computed } from 'vue';
  import type { SpotPrice } from '@/interfaces/SpotPrice';
  
  interface CategorySummary {
    name: string;
    totalSpots: number;
    avgPrice: number;
    avgMove: number;
  }
  
  export default defineComponent({
    name: 'SpotSummary',
    props: {
      spots: {
        type: Array as PropType<SpotPrice[]>,
        required: true
      }
    },
    setup(props) {
      const categorySummary = computed(() => {
        const summary: Record<string, CategorySummary> = {};
  
        props.spots.forEach(spot => {
          if (!summary[spot.categoryName]) {
            summary[spot.categoryName] = {
              name: spot.categoryName,
              totalSpots: 0,
              avgPrice: 0,
              avgMove: 0
            };
          }
  
          const category = summary[spot.categoryName];
          category.totalSpots++;
          category.avgPrice += spot.price;
          category.avgMove += spot.pmove;
        });
  
        Object.values(summary).forEach(category => {
          category.avgPrice /= category.totalSpots;
          category.avgMove /= category.totalSpots;
        });
  
        return Object.values(summary);
      });
  
      return {
        categorySummary
      };
    }
  });
  </script>
  
  
  <style scoped>
  /* Styles from previous example */
  .spot-summary {
  margin-bottom: 20px;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.summary-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  background-color: #f9f9f9;
}

.summary-details {
  margin-top: 10px;
}

.positive-move {
  color: green;
}

.negative-move {
  color: red;
}
  </style>