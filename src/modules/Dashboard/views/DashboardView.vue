<template>
    <v-container class="d-flex flex-column align-center">
      <!-- Tabla -->
      <v-table theme="dark" style="max-width: 600px; width: 100%;">
        <thead>
          <tr style="background-color: #1976D2; color: white;">
            <th class="text-left">Name</th>
            <th class="text-left">Calories</th>
            <th class="text-left">Fecha</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in desserts" :key="item.name">
            <td>{{ item.name }}</td>
            <td>{{ item.calories }}</td>
            <td>{{ item.date }}</td>
          </tr>
        </tbody>
      </v-table>
  
      <!-- Botones alineados horizontalmente -->
      <div class="d-flex justify-center mt-4" style="gap: 16px;">
        <v-btn 
          density="compact" 
          icon="mdi-plus" 
          color="primary"
          @click="add = !add"
        />
        <v-btn 
          density="compact" 
          icon="mdi-cancel"
          color="red"
          
        />

        
      </div>

      <v-card v-if="add" variant="outlined">
        
        <AddElementView @add="pushtable"/>
      
    </v-card>

      
    </v-container>
    
  </template>
  
  
  <script setup>
  import { ref } from 'vue'
 
import AddElementView from '../components/addElementView.vue';
  
const add = ref(false)

  const desserts = ref([
    { id:1,name: 'Frozen Yogurt', calories: 159 ,date:new Date()},
    {id:2, name: 'Ice cream sandwich', calories: 237,date:new Date() },
    { id:3,name: 'Eclair', calories: 262 ,date:new Date()},
    { id:4,name: 'Cupcake', calories: 305 ,date:new Date()},
    { id:5, name: 'Gingerbread', calories: 356 ,date:new Date()},
    
  ])


  const pushtable = (name,calories) => {
    desserts.value.push({
        id: desserts.value.length +1,
        name,
        calories,
        date: new Date()
    })
  }


  </script>
  