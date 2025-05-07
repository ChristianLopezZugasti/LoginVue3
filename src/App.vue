<template>
 
 <v-app>
    <v-app-bar
     
      color="primary"
      elevation="0"
      height="110px"
      max-height="110px"
      class="d-none d-md-block"
    >
      <header-view />
    </v-app-bar>

    <v-app-bar
      color="#E0E0E0"
      height="110px"
      max-height="110px"
      elevation="0"
      class="d-md-none"
    >
      <HeaderResponsive />
    </v-app-bar>

    <v-main class="pt-16">
      <v-container>
        <router-view  class="pt-16"/>
      </v-container>
      
    </v-main>
 
  </v-app>
 
 

    
</template>



<script setup>


//d-none OCULTAR EN PANTALLAS PEQUEÑAS
//d-md-flex MUESTRA EN PANTALLAS MEDIANAS Y GRANDES
//d-md-none "ocultar este elemento en pantallas medianas en adelante

import HeaderView from './components/HeaderView.vue';
import HeaderResponsive from './components/HeaderResponsive.vue';
</script>