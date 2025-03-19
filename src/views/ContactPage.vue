<template>
    <div>
      <app-navigation />
      <h1>Contact Page</h1>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import AppNavigation from '@/components/AppNavigation.vue';
  
  export default defineComponent({
    name: 'ContactPage',
    components: {
      AppNavigation
    }
  });
  </script>