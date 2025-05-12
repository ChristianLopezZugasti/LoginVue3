<template>
  <v-container >
    <v-row justify="center">
      <v-col cols="12" xs="7" sm="6" md="6" lg="6" xl="6">
        <v-card outlined elevation="3" class="pa-10"> 
          <v-card-title class="d-flex justify-center align-center mt-2">
              <div style="width: 60px; height: 60px; display: flex; justify-content: center; align-items: center; ">
                  <img src="@/assets/logo_dorado.gif" style="max-width: 100%; max-height: 100%; object-fit: contain;" />
              </div>
          </v-card-title>
          <v-card-title class="d-flex justify-center grey--text pt-0">Crear cuenta</v-card-title>
         
          <v-form ref="form" @submit.prevent="onSubmit">
            
            <!-- Validación del email -->
            <v-text-field
              v-model="nombre"
              prepend-inner-icon="mdi-account"
              :rules="[
                rules.requerido,
              ]"
              label="nombre"
              variant="outlined"
            ></v-text-field>
            
            <!-- Validación del email -->
            <v-text-field
              v-model="email"
              :rules="[
                rules.requerido,
                rules.correo,
              ]"
              label="Email"
               variant="outlined"
               prepend-inner-icon="mdi-email"
            ></v-text-field>
      
            <!-- Validación de la contraseña -->
            <v-text-field
              v-model="password"
              :type="show ? 'text' : 'password'"
              @click:append-inner="show = !show"
              :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              prepend-inner-icon="mdi-lock"
              :rules="[rules.requerido, rules.limit10Caracteres]"
              label="Password"
              variant="outlined"
            />

            <v-date-input
            v-model="date"
            label="Pumple"
            placeholder="dd/mm/yyyy"
            prepend-icon=""
            prepend-inner-icon="mdi-calendar"
            variant="outlined"
            persistent-placeholder
            clearable
            :rules="[rules.requerido,rules.MayorEdad]"
            :allowed-dates=isAllowedDate
          ></v-date-input>
            
            <v-btn color="primary" class="mt-2" type="submit" block :disabled="DisabledButton">Register</v-btn>
            <router-link  :to="{name: 'home'}">
              <v-btn class="mt-3 text-black" block variant="text">Ya tengo una cuenta</v-btn>
            </router-link>
            <SnackBar :text="message" :value="activator" :color="colorSnack" />
            
          </v-form>
    </v-card>
      </v-col>
    </v-row>
  </v-container>

   
  </template>
  
  <script setup>

  import { ref,computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { validateRegister } from '../helpers/services';
  import { rules } from '@/constants/rules';
  import SnackBar from '@/components/SnackBar.vue';
  import { isAllowedDate } from '@/constants/functions';
  
  const show = ref(false)

 
  
   //snackBar
  const message = ref('hola perro') 
  const activator = ref(false)
  const colorSnack = ref('red')

  const form = ref()
  const router = useRouter()
 
  const email = ref('test3@gmail.com');
  const password = ref('1234567');
  const nombre = ref('pedropon')
  const date = ref(null)
  
 


  
  // Función de submit
  const onSubmit = async() => {
    
    console.log(typeof(date.value),date.value.toISOString())


    const {valid} = await form.value.validate()

    if (!valid) {
     
      return
    }
    
      
   const request = {
      correo: email.value,
      password: password.value,
      nombre: nombre.value,
      cumpleanios: date.value.toISOString().split("T")[0],
    }
  
  
    const response = await validateRegister(request)
 
   
    if(!response.ok){
      activateSnack('Error al crear el usuario \n Ingrese sus datos nuevamente porfa','red')
      form.value.reset()

      return
    }
    activateSnack('Usuario creado con éxito', 'green')
        setTimeout(() => {
        router.push({ name: 'home' })
        }, 1500)

  }

  const DisabledButton = computed(() => {
  //aplica cada regla de emailRules al valor actual de email, regresa true, si todas las reglas devueleven true
  const nombreValid = [rules.requerido].every(rule => rule(nombre.value) === true)
  const emailValid = [rules.requerido,rules.correo].every(rule => rule(email.value) === true)
  const passwordValid = [rules.requerido,rules.limit10Caracteres].every(rule => rule(password.value) === true)
  
  return !(emailValid && passwordValid && nombreValid)
})
  

  const activateSnack = (messageParam, color = "primary") => {
  message.value = messageParam;
  colorSnack.value = color;
  activator.value = true;
  setTimeout(() => {
    activator.value = false;
  }, 5000);
};




</script>