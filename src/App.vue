<template>
 
 <v-app>
  <v-app-bar
      color="primary"
      elevation="0"
      height="110"
      position="0"
    >
      <HeaderView />
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
 
  </v-app>
 
 

    
</template>



<script setup>


//d-none OCULTAR EN PANTALLAS PEQUEÑAS
//d-md-flex MUESTRA EN PANTALLAS MEDIANAS Y GRANDES
//d-md-none "ocultar este elemento en pantallas medianas en adelante

import HeaderView from './components/HeaderView.vue';
</script>


<style>
.headerView {
  flex: 0%;
}
</style>