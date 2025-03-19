<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="logo">
        <router-link to="/" class="logo-link">
          <img src="../assets/sharenet-logo.png" alt="Sharenet Logo" />
        </router-link>
      </div>
      <div class="nav-links">
        <router-link 
          to="/" 
          class="nav-item"
          :class="{ 'active': $route.path === '/' }"
        >
          Spot Prices
        </router-link>
        <router-link 
          to="/contact" 
          class="nav-item"
          :class="{ 'active': $route.path === '/contact' }"
        >
          Contact
        </router-link>
        <router-link 
          to="/workshops" 
          class="nav-item"
          :class="{ 'active': $route.path === '/workshops' }"
        >
          Workshops
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppNavigation'
});
</script>

<style scoped>
.navbar {
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 15px 20px;
}

.logo img {
  height: 40px;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-item {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  position: relative;
  transition: color 0.3s ease;
}

.nav-item::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -5px;
  left: 0;
  background-color: #007bff;
  transition: width 0.3s ease;
}

.nav-item:hover::after {
  width: 100%;
}

.nav-item.active {
  color: #007bff;
}

.nav-item.active::after {
  width: 100%;
}
</style>