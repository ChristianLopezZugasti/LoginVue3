<template>
   <v-container>
      <v-row class="d-flex justify-center align-center">
        <v-col cols="12" md="12">
          
          <router-view />
        

        </v-col>


      </v-row>
      <CustomFooter style="margin-top: 480px;" />
  
   </v-container>
  </template>
  
  
  <script setup>
  import CustomFooter from '../components/CustomFooter.vue';
  import { RouterView } from 'vue-router';

  </script>
  