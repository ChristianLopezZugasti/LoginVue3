<template>
    <v-sheet class="mx-auto" width="300">
      <v-form ref="form" @submit.prevent="onSubmit">
        
        <!-- Validación del email -->
        <v-text-field
          v-model="nombre"
          :rules="[
            rules.requerido,
          ]"
          label="nombre"
        ></v-text-field>
        
        <!-- Validación del email -->
        <v-text-field
          v-model="email"
          :rules="[
            rules.requerido,
            rules.correo,
          ]"
          label="Email"
        ></v-text-field>
  
        <!-- Validación de la contraseña -->
        <v-text-field
          v-model="password"
          :rules="[
            rules.requerido,
            rules.limit10Caracteres
          ]"
          label="Password"
          type="password"
        ></v-text-field>
        
        <v-btn class="mt-2" type="submit" block>Register</v-btn>

        <SnackBar :text="message" :value="activator" :color="colorSnack" />
        
      </v-form>
    </v-sheet>

    <router-view/>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
 
  import { validateRegister } from '../helpers/services';
  import { rules } from '@/constants/rules';
import SnackBar from '../components/SnackBar.vue';
  

   //snackBar
  const message = ref('hola perro') 
  const activator = ref(false)
  const colorSnack = ref('red')

  const form = ref()
  const router = useRouter()
 
  const email = ref('test3@gmail.com');
  const password = ref('1234567');
  const nombre = ref('pedropon')
  
  
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
  
    //TODO VERIFICAR REGISTER PONERLO BIEN 
    const response = await validateRegister(request)
        activateSnack('Usuario creado con éxito', 'green')

        setTimeout(() => {
        router.push({ name: 'home' })
        }, 1500)

  }
  

  const activateSnack = (messageParam, color = "primary") => {
  message.value = messageParam;
  colorSnack.value = color;
  activator.value = true;
  setTimeout(() => {
    activator.value = false;
  }, 5000);
};
</script>