<template>
    <v-sheet class="mx-auto" width="300">
      <v-form ref="form" @submit.prevent="onSubmit">
        <!-- Validación del email -->
        <v-text-field
          v-model="name"
          label="name"
        ></v-text-field>
  
        <!-- Validación de la contraseña -->
        <v-text-field
          v-model="calories"
          label="calories"  
        ></v-text-field>
        
        <v-btn class="mt-2" type="submit" block>añadir</v-btn>
      </v-form>
    </v-sheet>

    <router-view/>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  

  const emit = defineEmits(['add'])

  const form = ref()
  
  
  const name = ref('');
  const calories = ref('');
  
  // Función de submit
  const onSubmit = () => {

    //TODO hacer rules para las categorias
    
    emit('add',name.value,calories.value)  

    name.value = ''
    calories.value = ''

    
    
  };
  </script>