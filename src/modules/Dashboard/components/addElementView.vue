<template>
  <v-dialog v-model:model-value="props.value" max-width="400" persistent>
    <v-sheet class="mx-auto" width="300">
      
      <!-- Botón de cerrar alineado a la derecha -->
      <div class="d-flex justify-end">
        <v-btn icon @click="close()" variant="text" size="small">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      
      
      
      <v-form ref="form" @submit.prevent="onSubmit">
        <!-- Validación del email -->
        <v-text-field
          v-model="nombre"
          label="nombre"
          :rules="[
            rules.requerido
          ]"
        ></v-text-field>
  
        <!-- Validación de la contraseña -->
        <v-text-field
          v-model="descripcion"
          label="descripcion"
          :rules="[
            rules.requerido
          ]"  
        ></v-text-field>

        <v-text-field
          v-model="precio"
          label="precio"  
          
          :rules="[
            rules.requerido,
            rules.number,
          ]"
        ></v-text-field>
        
        <v-btn class="mt-2" type="submit" block>añadir</v-btn>
      </v-form>
    </v-sheet>
  </v-dialog>
    

    <router-view/>
  </template>
  
  <script setup>
  import { rules } from '@/constants/rules';
import { ref } from 'vue';
  

  const emit = defineEmits(['add','close']);

  const form = ref()
 
  
  const nombre = ref('');
  const descripcion = ref('');
  const precio = ref('');
  

  const props = defineProps({
    value: {
      type: Boolean,
      default: true,
    },
  });


  // Función de submit
  const onSubmit = async() => {

    const isValid = await form.value.validate();
    
    if (!isValid.valid) {
      return;
    }
    //TODO hacer rules para las productos
    
    emit('add',nombre.value,descripcion.value,precio.value)  

    nombre.value = ''
    descripcion.value = ''
    precio.value = ''
    
    
  };

  const close = () => {
    nombre.value = ''
    descripcion.value = ''
    precio.value = ''
    
    
    emit('close')
  };
  </script>