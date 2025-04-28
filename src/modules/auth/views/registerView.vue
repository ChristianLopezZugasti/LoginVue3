<template>
    <v-sheet class="mx-auto" width="300">
      <v-form ref="form" @submit.prevent="onSubmit">
        
        <!-- Validación del email -->
        <v-text-field
          v-model="nombre"
          :rules="nombreRules"
          label="nombre"
        ></v-text-field>
        
        <!-- Validación del email -->
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="Email"
        ></v-text-field>
  
        <!-- Validación de la contraseña -->
        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="Password"
          type="password"
        ></v-text-field>
        
        <v-btn class="mt-2" type="submit" block>Register</v-btn>
      </v-form>
    </v-sheet>

    <router-view/>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useStore } from 'vuex';
import { validateRegister } from '../helpers/services';
  
  const form = ref()
  const router = useRouter()
  const store = useStore()

  const email = ref('test3@gmail.com');
  const password = ref('1234567');
  const nombre = ref('pedropon')
  
  //  Reglas para el email
   const emailRules = [
     value => !!value || 'El correo es obligatorio', // Validación no vacío
     value => /.+@.+\..+/.test(value) || 'Por favor ingrese un correo válido', // Validación formato email
   ];
   // Reglas para la contraseña
   const nombreRules = [
     value => !!value || 'El nombre es obligatorio', // Validación no vacío
     value => value.length >= 6 || 'El nombre debe tener al menos 6 caracteres', // Validación longitud mínima
   ];
  
  
  // Reglas para la contraseña
   const passwordRules = [
     value => !!value || 'La contraseña es obligatoria', // Validación no vacío
     value => value.length >= 6 || 'La contraseña debe tener al menos 6 caracteres', // Validación longitud mínima
   ];
  
  // Función de submit
  const onSubmit = async() => {
    
    const {valid} = await form.value.validate()

    if (!valid) {
     
      return
    }
    
      
   const request = {
      correo: email.value,
      password: password.value,
      nombre: nombre.value
    }

    console.log('Request:', request)
    
    const response = await validateRegister(request)
    //const response = await verifyUser(request)
    console.log('Response:', response)
    if(response.replyCode === 500){
      console.log('Error Al autenticar')
      //todo mostrar mensaje de error
      return 
    }
      
      
    router.push({name:'home' })
  
    
    
  };
  </script>