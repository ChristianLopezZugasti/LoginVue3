<template>
    <v-sheet class="mx-auto" width="300">
      <v-form ref="form" @submit.prevent="onSubmit">
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
        
        <v-btn class="mt-2" type="submit" block color="primary" :disabled="DisabledButton">Login</v-btn>
      </v-form>
      <router-link  v-if="disabledRegister" to="auth/register">
        <v-btn class="mt-2" block >Register</v-btn>
      </router-link>
    </v-sheet>
    
    <template>
      
      <SnackBar :text="message" :value="activator" :color="colorSnack" />
      
    </template>
    


    <router-view/>
</template>
  
<script setup>

//TODO 
//AGREGAR V-alert
import {  ref,computed} from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import SnackBar from '../components/SnackBar.vue';
import { rules } from '@/constants/rules';
  
  //snackBar
  const message = ref('hola perro') 
  const activator = ref(false)
  const colorSnack = ref('red')


  const form = ref()
  const router = useRouter()
  const store = useStore()

  const email = ref(''); //test1@GMAIL.COM
  const password = ref(''); //1234567
  const disabledRegister = ref(true)
  
  // Función de submit
  const onSubmit = async() => {
    
    const {valid} = await form.value.validate()
  
    if (!valid) {
      
      return
    }
      
   const request = {
      correo: email.value,
      password: password.value
    }

    
    
    const response = await store.dispatch('shared/verifyUser', request)
    //const response = await verifyUser(request)

    if(response.replyCode !== 200){
      
      //activarModal.value = true
      activateSnack(response.msg, 'red')

      return 
    }
      
      
    router.push({name:'dashboard' })
  
   
  };

  //la referencia al form.value, no se puede porque nunca cambia, se hace sobre los campos
//   watch([email, password], async () => {
//   if (!form.value) return;
//   const { valid } = await form.value.validate()
//   Disabled.value = !valid
// })

const DisabledButton = computed(() => {
  //aplica cada regla de emailRules al valor actual de email, regresa true, si todas las reglas devueleven true
  const emailValid = [rules.requerido,rules.correo].every(rule => rule(email.value) === true)
  const passwordValid = [rules.requerido,rules.limit10Caracteres].every(rule => rule(password.value) === true)
  
  if(activator.value) {
    disabledRegister.value = false
    return true
    
  }
  return !(emailValid && passwordValid)
})
    
const activateSnack = (messageParam, color = "primary") => {
  message.value = messageParam;
  colorSnack.value = color;
  activator.value = true;
  setTimeout(() => {
    activator.value = false;
    disabledRegister.value = true;
  }, 5000);
};

  </script>