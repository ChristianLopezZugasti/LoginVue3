<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" xs="7" sm="6" md="6" lg="6" xl="6">
        <v-card outlined elevation="3" class="pa-10"> 
          <v-card-title class="d-flex justify-center align-center mt-2">
              <div style="width: 60px; height: 60px; display: flex; justify-content: center; align-items: center; ">
                  <img src="@/assets/logo_dorado.gif" style="max-width: 100%; max-height: 100%; object-fit: contain;" />
              </div>
          </v-card-title>

          <v-card-title class="d-flex justify-center grey--text pt-0">Iniciar Sesión</v-card-title>
          
          
            <v-form ref="form" @submit.prevent="onSubmit">
            <v-text-field
              v-model="email"
              prepend-inner-icon="mdi-email"
              :rules="[rules.requerido, rules.correo]"
              label="Email"
              variant="outlined"
            />

            <v-text-field
              v-model="password"
              :type="show ? 'text' : 'password'"
              @click:append-inner="show = !show"
              :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              prepend-inner-icon="mdi-lock"
              :rules="[rules.requerido, rules.limit10Caracteres]"
              label="Password"
            />

            <v-btn class="mt-2" type="submit" block color="primary" :disabled="DisabledButton">Login</v-btn>
            <router-link v-if="disabledRegister" to="/auth/register">
              <v-btn class="mt-2 text-black" block variant="text">Register</v-btn>
            </router-link>
          </v-form>

    
          
          <SnackBar :text="message" :value="activator" :color="colorSnack" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
  
<script setup>

//TODO 
//AGREGAR V-alert
import {  ref,computed} from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import SnackBar from '@/components/SnackBar.vue';
import { rules } from '@/constants/rules';



  const show = ref(false)

  //snackBar
  const message = ref('hola perro') 
  const activator = ref(false)
  const colorSnack = ref('red')


  const form = ref()
  const router = useRouter()
  const store = useStore()

  const email = ref('test6@gmail.com'); //test1@GMAIL.COM
  const password = ref('1234567'); //1234567
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