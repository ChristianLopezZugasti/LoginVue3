<template>
  <v-container>
    <v-row class="d-flex justify-center align-center ">
      <v-col cols="12">
        <div class="d-flex text-center">
          <v-row align="center" justify="center">
            <v-col cols="3">
              <v-img
                :src="quimicaNegro" 
                alt="Facultad de Química UNAM" 
                style="border: 1px solid red"
                height="100px"
                width="100px"
              ></v-img>
            </v-col>
            <v-col>
              <div class="font-weight-bold text-h6 text-sm-h5 my-2">
                Facultad de Química
              </div>
              <div class="font-weight-bold text-h6 text-sm-h5 my-2">
                Diplomas
              </div>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>


import quimicaNegro from '../assets/Quimica-negro.jpeg';
</script>

