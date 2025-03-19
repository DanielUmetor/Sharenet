<template>
    <div>
      <app-navigation />
      <h1>Workshops Page</h1>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import AppNavigation from '@/components/AppNavigation.vue';
  
  export default defineComponent({
    name: 'WorkshopsPage',
    components: {
      AppNavigation
    }
  });
  </script>