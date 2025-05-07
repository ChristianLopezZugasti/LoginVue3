<script setup>

import logoCompuesto from '../assets/logoCompuesto.png';
</script>

<template>
  <v-container>
    <v-row no-gutters>
      <div>
        <v-img :src="logoCompuesto" alt="Facultad de Química UNAM" 
    
          width="260">
        </v-img>
      </div>
      <v-spacer > </v-spacer>
      <div class="white--text departamento">Diplomas Facultad de Química</div>
    </v-row>
  </v-container>
</template>


<style scoped>
.departamento {
  max-width: 15rem;
  display: flex;
  justify-content: left;
  align-items: center;
  text-align: right;
  font-size: 22px;
}
</style>
