<template>
  <v-dialog v-model:model-value="props.value" max-width="500" persistent>
    <v-card title="Añadir producto" >
      <template #title>
          <div class="d-flex justify-space-between align-center">
            <span>Añadir producto</span>
            <v-btn icon @click="close()" 
            variant="text" 
            size="small"
            >
            <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
      </template>
      <v-card-text>
          
          
          
          
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
              label="precio $"  
              
              :rules="[
                rules.requerido,
                rules.number,
              ]"
            ></v-text-field>

            <v-text-field
              v-model="descuento"
              label="descuento %"  
              placeholder="0"
              
              :rules="[
                rules.requerido,
                rules.number,
              ]"
            > </v-text-field>

            <v-combobox
              v-model="complementos"
              :items="items"
              label="Categoría"
              chips
              multiple
              clearable="true"
              closable-chips="true"
              no-data-text
              :rules="[rules.selectEnItems(items)]"
             ></v-combobox>
            
            <v-btn class="mt-2" type="submit" block>añadir</v-btn>
          </v-form>
        </v-card-text>
    </v-card>
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
  const precio = ref();
  const descuento = ref(0);

  const items = [
    'Alimentos',
    'Tecnologia',
    'Linea Blanca',
    'Hogar',
    'Ropa',
    'Juguetes',
    'Deportes',
  ]

  const complementos = ref([])

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
    
    
    emit('add',nombre.value,descripcion.value,precio.value,descuento.value,complementos.value)  

    nombre.value = ''
    descripcion.value = ''
    precio.value = ''
    descuento.value = ''
    complementos.value = []
    
    
  };

  const close = () => {
    nombre.value = ''
    descripcion.value = ''
    precio.value = ''
    
    
    emit('close')
  };
  </script>