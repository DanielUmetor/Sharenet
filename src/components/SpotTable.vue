<template>
    <div class="spot-table-container">
      <div class="filter-section">
        <select v-model="selectedCategory" class="category-select">
          <option value="">All Categories</option>
          <option 
            v-for="category in categories" 
            :key="category"
            :value="category"
          >
            {{ category }}
          </option>
        </select>
        
        <input 
          v-model="searchTerm" 
          placeholder="Search spots..." 
          class="search-input"
        />
      </div>
  
      <table class="spot-table">
        <thead>
          <tr>
            <th 
              v-for="column in columns" 
              :key="column.key"
              @click="sortBy(column.key)"
              :class="{ 'sorted': sortColumn === column.key }"
            >
              {{ column.label }}
              <span class="sort-indicator">
                {{ sortColumn === column.key 
                   ? (sortDirection === 'asc' ? '▲' : '▼') 
                   : '' }}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="spot in filteredAndSortedSpots" 
            :key="spot.code"
            :class="{ 'positive-move': spot.move > 0, 'negative-move': spot.move < 0 }"
          >
            <td>{{ spot.fullName }}</td>
            <td>{{ spot.price.toFixed(2) }}</td>
            <td>{{ spot.move.toFixed(2) }}</td>
            <td>{{ spot.pmove.toFixed(2) }}%</td>
            <td>{{ formatDateTime(spot.datetime) }}</td>
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
      const searchTerm = ref('');
      const selectedCategory = ref('');
      
      const categories = computed(() => {
        return [...new Set(props.spots.map(spot => spot.categoryName))];
      });
  
      const filteredAndSortedSpots = computed(() => {
        let result = props.spots.filter(spot => {
          const matchesCategory = !selectedCategory.value || 
            spot.categoryName === selectedCategory.value;
          
          const matchesSearch = spot.fullName.toLowerCase().includes(
            searchTerm.value.toLowerCase()
          );
          
          return matchesCategory && matchesSearch;
        });
  
        if (sortColumn.value) {
          result.sort((a, b) => {
            const modifier = sortDirection.value === 'asc' ? 1 : -1;
            const keyA = a[sortColumn.value as keyof SpotPrice];
            const keyB = b[sortColumn.value as keyof SpotPrice];
  
            if (keyA < keyB) return -1 * modifier;
            if (keyA > keyB) return 1 * modifier;
            return 0;
          });
        }
  
        return result;
      });
  
      const sortBy = (key: string) => {
        if (sortColumn.value === key) {
          sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
        } else {
          sortColumn.value = key;
          sortDirection.value = 'asc';
        }
      };
  
      const formatDateTime = (dateTime: string) => {
        return new Date(dateTime).toLocaleString();
      };
  
      return {
        columns,
        sortColumn,
        sortDirection,
        searchTerm,
        selectedCategory,
        categories,
        filteredAndSortedSpots,
        sortBy,
        formatDateTime
      };
    }
  });
  </script>
  
 
  
  <style scoped>
  .spot-table-container {
    width: 100%;
    overflow-x: auto;
  }
  
  .search-input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
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
  
  .sorted {
    background-color: #e0e0e0;
  }
  
  .positive-move {
    background-color: rgba(0, 255, 0, 0.1);
  }
  
  .negative-move {
    background-color: rgba(255, 0, 0, 0.1);
  }
  
  .sort-indicator {
    float: right;
  }
  </style>