<template>
    <v-sheet class="mx-auto" width="300">
      <v-form ref="form" @submit.prevent="onSubmit">
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
        
        <v-btn class="mt-2" type="submit" block>Login</v-btn>
      </v-form>
    </v-sheet>

    <router-view/>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const form = ref()
  const router = useRouter()
  
  const email = ref('');
  const password = ref('');
  
  //  Reglas para el email
   const emailRules = [
     value => !!value || 'El correo es obligatorio', // Validación no vacío
     value => /.+@.+\..+/.test(value) || 'Por favor ingrese un correo válido', // Validación formato email
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
    
    router.push({name: 'dashboard'})
    

    //TODO validar que el usuario es valido 
    console.log('Email:', email.value);
    console.log('Password:', password.value);
  
    
    
  };
  </script>