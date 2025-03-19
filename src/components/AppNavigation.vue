<template>
    <nav class="navigation">
      <router-link to="/" class="nav-item">Spot Prices</router-link>
      <router-link to="/contact" class="nav-item">Contact</router-link>
      <router-link to="/workshops" class="nav-item">Workshops</router-link>
    </nav>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'Navigation'
  });
  </script>
  
  <style scoped>
  .navigation {
    display: flex;
    background-color: #333;
    padding: 1rem;
  }
  
  .nav-item {
    color: white;
    text-decoration: none;
    margin-right: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: background-color 0.3s;
  }
  
  .nav-item:hover {
    background-color: #555;
  }
  
  .router-link-active {
    background-color: #444;
  }
  </style>