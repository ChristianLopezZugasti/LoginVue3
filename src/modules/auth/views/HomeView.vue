<template>
    <v-app>
      <div class="d-flex flex-column" style="min-height: 100vh;">
        <v-main class="flex-grow-1">
          <router-view />
        </v-main>
  
        <!-- Footer con espacio arriba -->
        <CustomFooter style="margin-top: 480px;" />
      </div>
    </v-app>
  </template>
  
  
  <script setup>
  import CustomFooter from '../components/CustomFooter.vue';
  import { RouterView } from 'vue-router';
  </script>
  