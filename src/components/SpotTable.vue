<template>
    <div class="spot-table-container">
      <table class="spot-table">
        <thead>
          <tr>
            <th 
              v-for="column in columns" 
              :key="column.key"
              @click="sortBy(column.key)"
            >
              {{ column.label }}
              <span v-if="sortColumn === column.key">
                {{ sortDirection === 'asc' ? '▲' : '▼' }}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="spot in sortedSpots" 
            :key="spot.code"
          >
            <td>{{ spot.fullName }}</td>
            <td>{{ spot.price.toFixed(2) }}</td>
            <td>{{ spot.move.toFixed(2) }}</td>
            <td>{{ spot.pmove.toFixed(2) }}%</td>
            <td>{{ spot.datetime }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType, ref, computed } from 'vue';
  import type { SpotPrice } from '@/interfaces/SpotPrice';
  
  export default defineComponent({
    name: 'SpotTable',
    props: {
      spots: {
        type: Array as PropType<SpotPrice[]>,
        required: true
      }
    },
    setup(props) {
      const columns = [
        { key: 'fullName', label: 'Full Name' },
        { key: 'price', label: 'Price' },
        { key: 'move', label: 'Move' },
        { key: 'pmove', label: '% Move' },
        { key: 'datetime', label: 'Time' }
      ];
  
      const sortColumn = ref('');
      const sortDirection = ref<'asc' | 'desc'>('asc');
  
      const sortedSpots = computed(() => {
        if (!sortColumn.value) return props.spots;
  
        return [...props.spots].sort((a, b) => {
          const modifier = sortDirection.value === 'asc' ? 1 : -1;
          const keyA = a[sortColumn.value as keyof SpotPrice];
          const keyB = b[sortColumn.value as keyof SpotPrice];
  
          if (keyA < keyB) return -1 * modifier;
          if (keyA > keyB) return 1 * modifier;
          return 0;
        });
      });
  
      const sortBy = (key: string) => {
        if (sortColumn.value === key) {
          sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
        } else {
          sortColumn.value = key;
          sortDirection.value = 'asc';
        }
      };
  
      return {
        columns,
        sortColumn,
        sortDirection,
        sortedSpots,
        sortBy
      };
    }
  });
  </script>
  
  <style scoped>
  .spot-table-container {
    width: 100%;
    overflow-x: auto;
  }
  
  .spot-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .spot-table th, .spot-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  .spot-table th {
    background-color: #f2f2f2;
    cursor: pointer;
  }
  </style>