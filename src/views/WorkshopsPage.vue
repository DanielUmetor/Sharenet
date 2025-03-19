<template>
    <div class="workshops-page">
      <app-navigation />
      <div class="workshops-container">
        <h1>Upcoming Workshops</h1>
        
        <!-- Category Filter -->
        <div class="filter-section">
          <select v-model="selectedCategory" class="category-filter">
            <option value="">All Categories</option>
            <option 
              v-for="category in categories" 
              :key="category"
              :value="category"
            >
              {{ category }}
            </option>
          </select>
  
          <label class="available-filter">
            <input 
              type="checkbox" 
              v-model="showOnlyAvailable"
            /> 
            Show Only Available
          </label>
        </div>
        
        <!-- Loading State -->
        <div v-if="isLoading" class="loading">
          Loading workshops...
        </div>
        
        <!-- Error State -->
        <div v-else-if="error" class="error">
          {{ error }}
        </div>
        
        <!-- Workshops Grid -->
        <div v-else class="workshops-grid">
          <div 
            v-for="workshop in filteredWorkshops" 
            :key="workshop.id" 
            class="workshop-card"
            :class="{ 
              'workshop-available': !workshop.soldOut,
              'workshop-sold-out': workshop.soldOut 
            }"
          >
            <div class="workshop-header">
              <h2>{{ workshop.title }}</h2>
              <span 
                class="status-badge"
                :class="{
                  'badge-available': !workshop.soldOut,
                  'badge-sold-out': workshop.soldOut
                }"
              >
                {{ workshop.soldOut ? 'Sold Out' : 'Available' }}
              </span>
            </div>
            
            <div class="workshop-details">
              <p>
                <i class="fas fa-calendar"></i> 
                {{ formatDate(workshop.date) }}
              </p>
              <p>
                <i class="fas fa-map-marker-alt"></i> 
                {{ workshop.venue }}
              </p>
              <p>
                <i class="fas fa-users"></i> 
                Seats Left: {{ workshop.seatsAvailable }}
              </p>
            </div>
            
            <button 
              @click="bookWorkshop(workshop)"
              :disabled="workshop.soldOut"
              class="book-btn"
            >
              {{ workshop.soldOut ? 'Sold Out' : 'Book Now' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, computed, onMounted } from 'vue';
  import AppNavigation from '@/components/AppNavigation.vue';
  import { spotService, workshopService, Workshop } from '@/services/api';
  
  export default defineComponent({
    name: 'WorkshopsPage',
    components: {
      AppNavigation
    },
    setup() {
      const workshops = ref<Workshop[]>([]);
      const isLoading = ref(true);
      const error = ref<string | null>(null);
      const showOnlyAvailable = ref(false);
      const selectedCategory = ref('');
  
      const fetchWorkshops = async () => {
        try {
          isLoading.value = true;
          const spotResult = await spotService.fetchSpotPrices();
          
          if (spotResult.error) {
            error.value = spotResult.error;
            return;
          }
  
          // Transform spot prices into workshops
          workshops.value = await workshopService.fetchWorkshops(spotResult.data);
          error.value = null;
        } catch (err) {
          error.value = 'Failed to fetch workshops';
          console.error(err);
        } finally {
          isLoading.value = false;
        }
      };
  
      // Computed properties for filtering and categorization
      const categories = computed(() => {
        return [...new Set(workshops.value.map(w => w.categoryName))];
      });
  
      const filteredWorkshops = computed(() => {
        return workshops.value.filter(workshop => {
          const matchesCategory = !selectedCategory.value || 
            workshop.categoryName === selectedCategory.value;
          
          const matchesAvailability = !showOnlyAvailable.value || 
            !workshop.soldOut;
          
          return matchesCategory && matchesAvailability;
        });
      });
  
      // Utility methods
      const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      };
  
      const bookWorkshop = (workshop: Workshop) => {
        if (workshop.soldOut) return;
  
        // Simulate booking process
        try {
          // In a real scenario, you would call a backend API
          console.log(`Booking workshop: ${workshop.title}`);
          
          // Update local state to reflect booking
          workshop.seatsAvailable--;
          if (workshop.seatsAvailable <= 0) {
            workshop.soldOut = true;
          }
  
          alert(`Successfully booked: ${workshop.title}`);
        } catch (error) {
          console.error('Booking failed', error);
          alert('Booking failed. Please try again.');
        }
      };
  
      // Fetch workshops on component mount
      onMounted(fetchWorkshops);
  
      return {
        workshops,
        filteredWorkshops,
        categories,
        showOnlyAvailable,
        selectedCategory,
        isLoading,
        error,
        formatDate,
        bookWorkshop
      };
    }
  });
  </script>
  
  <style scoped>
  .workshops-page {
    background-color: #f4f6f9;
    min-height: 100vh;
  }
  
  .workshops-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
  }
  
  .filter-section {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  
  .category-filter, .available-filter {
    display: flex;
    align-items: center;
  }
  
  .category-filter {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .available-filter input {
    margin-right: 10px;
  }
  
  .workshops-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }
  
  .workshop-card {
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    padding: 25px;
    transition: transform 0.3s ease;
  }
  
  .workshop-card:hover {
    transform: translateY(-5px);
  }
  
  .workshop-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }
  
  .status-badge {
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 0.8em;
  }
  
  .badge-available {
    background-color: #4CAF50;
    color: white;
  }
  
  .badge-sold-out {
    background-color: #f44336;
    color: white;
  }
  
  .workshop-details {
    margin-bottom: 15px;
  }
  
  .workshop-details p {
    margin-bottom: 10px;
  }
  
  .workshop-details i {
    margin-right: 10px;
    color: #007bff;
  }
  
  .book-btn {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .book-btn:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  
  .loading, .error {
    text-align: center;
    padding: 20px;
    background-color: #f4f4f4;
    border-radius: 5px;
  }
  
  .error {
    color: red;
  }
  </style>