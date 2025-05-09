<template>
  <v-list density="compact" nav>
    <v-list-item
      v-for="path in paths"
      :key="path.path"
      :prepend-icon="path.icon"
      :title="path.title"
      :value="path.title"
      @click="router.push(path.path)"
    ></v-list-item>

    <v-list-item
      prepend-icon="mdi-logout"
      title="Cerrar Sesión"
      value="Cerrar Sesión"
      @click="logout()"
    ></v-list-item>
  </v-list>
</template>

<script setup>
//import { logout } from "@/helpers/functions";
import router from "@/router";

const props = defineProps({
  paths: {
    type: Array,
    required: true,
  },
});

const logout = () => {
  
  router.push({ name: "login" });
};

</script>