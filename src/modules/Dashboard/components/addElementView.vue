<template>
    <v-sheet class="mx-auto" width="300">
      <v-form ref="form" @submit.prevent="onSubmit">
        <!-- Validación del email -->
        <v-text-field
          v-model="nombre"
          label="nombre"
        ></v-text-field>
  
        <!-- Validación de la contraseña -->
        <v-text-field
          v-model="descripcion"
          label="descripcion"  
        ></v-text-field>

        <v-text-field
          v-model="precio"
          label="precio"  
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
  
  
  const nombre = ref('');
  const descripcion = ref('');
  const precio = ref('');
  
  // Función de submit
  const onSubmit = () => {

    //TODO hacer rules para las productos
    
    emit('add',nombre.value,descripcion.value,precio.value)  

    nombre.value = ''
    descripcion.value = ''
    precio.value = ''
    
    
  };
  </script>