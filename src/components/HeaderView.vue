<template>
  <v-toolbar-title>
    <v-container class="p-0">
      <v-row class="px-3" no-gutters>
        <div class="d-none d-md-block header">
          <img
            src="@/assets/logoCompuesto.png"
            alt="Facultad de Química UNAM"
          />
        </div>
        <v-spacer></v-spacer>
        <div class="white--text departamento font-weight-bold">
          Estancias Facultad de Química
        </div>
      </v-row>
    </v-container>
  </v-toolbar-title>
</template>

<style scoped>
.departamento {
  max-width: 18rem;
  display: flex;
  justify-content: left;
  align-items: center;
  text-align: right;
  font-size: 22px;
}
</style>
