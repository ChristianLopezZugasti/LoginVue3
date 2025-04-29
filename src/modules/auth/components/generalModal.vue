<template>
  <v-dialog v-model="modelValue" :max-width="widthModal" persistent>
    <!-- Activador -->
    <template v-slot:activator="{ on, attrs }">
      <v-list-item v-if="list" link v-bind="attrs" v-on="on">
        <v-list-item-title>{{ textBtn }}</v-list-item-title>
      </v-list-item>
      <v-btn v-else-if="textBtn" text v-bind="attrs" v-on="on">
        <v-icon v-if="icon" class="mr-1">{{ icon }}</v-icon>
        {{ textBtn }}
      </v-btn>
    </template>

    <!-- Contenido del Modal -->
    <v-card>
      <v-card-title>
        <div class="text-title">
          <slot name="title" />
          
        </div>
        <v-spacer />
        <v-btn text fab small @click="close">
          <v-icon color="primary">mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-container>
        <v-divider class="mb-4" />
      </v-container>

      <v-card-text>
        <slot name="content" />
      </v-card-text>

      <v-card-actions class="acciones">
        <slot name="actions" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { defineProps, defineEmits,ref } from 'vue';
const modelValue = ref()

const props = defineProps({
 
  textBtn: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  widthModal: {
    type: String,
    default: '600px'
  },
  list: {
    type: Boolean,
    default: false
  }
})


//el v-model, esta conectado con el padre, entonces al cambiar ese valor desde el padre
//se actuliza en el hijo, utrilizamos el emit, para que cambie el valor, pero no mandamos ningun valoir


const emit = defineEmits(['update:modelValue'])

const close = () => {
  emit('update:modelValue', false) //a pesar de no usar el valor de false, el vue, lo actuliza solo 
}
</script>
