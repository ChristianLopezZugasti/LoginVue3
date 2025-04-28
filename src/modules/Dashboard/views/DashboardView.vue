<template>
    <v-container class="d-flex flex-column align-center">
      <v-data-table :headers="headers" :items="productos">
    <template v-slot:item.progress="{ item }">
      <v-progress-linear
        :color="color(item.progress)"
        :model-value="item.progress"
        height="25"
      >
        <template v-slot:default="{ value }">
          <strong>{{ value }}%</strong>
        </template>
      </v-progress-linear>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-btn
        variant="text"
        icon
        @click="edit(item)"
        @mouseenter="register($event)"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>

      <v-btn variant="text" icon @click="removeProduct(item.idproducto)">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </template>
  </v-data-table>

  <v-dialog v-model="dialog" :activator="activator" max-width="500">
    <v-confirm-edit
      ref="confirm"
      v-model="model"
      ok-text="save"
      @cancel="dialog = false"
      @save="save"
    >
      <template v-slot:default="{ model: proxyModel, actions }">
        <v-card title="Modify Data">
          <v-card-text>
            <v-text-field
              v-model="proxyModel.value.name"
              label="Modify name"
            ></v-text-field>

            <v-number-input
              v-model="proxyModel.value.progress"
              label="Modify progress"
              max="100"
              min="0"
            ></v-number-input>
          </v-card-text>

          <template v-slot:actions>
            <v-spacer></v-spacer>
            <component :is="actions"></component>
          </template>
        </v-card>
      </template>
    </v-confirm-edit>
  </v-dialog>
  
    
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
        
        <AddElementView @add="addProduct"/>
      
    </v-card>

      
    </v-container>
    
  </template>
  
  
  <script setup>
  import { onMounted, ref ,computed} from 'vue'
 
import AddElementView from '../components/addElementView.vue';
import { AddProducto, obtenerProductos } from '../helpers/services';
  
const add = ref(false)
const productos = ref([])
  // v-dialog
  const dialog = ref(false)
  const activator = ref(null)

  // v-confirm-edit
  const confirm = ref(null)

  const model = ref({
    name: '',
    progress: 0,
  })

  const selected = ref()

  //los headers  necesitan coincidir con los nombres de cada fila 
  const headers = [
    { title: 'ID', value: 'idproducto' },
    { title: 'Name', value: 'nombre' },
    { title: 'Descripción', value: 'descripcion' },
    { title: 'Precio', value: 'precio'},
    { title: 'Progress', value: 'progress' },
    { title: 'Actions', value: 'actions' },
  ]


  // Adjust progress bar color based on progress
  const color = computed(() => progress => {
    if (progress === 100) return 'green-lighten-2'
    if (progress >= 90) return 'green-lighten-4'
    if (progress >= 70) return 'light-green-lighten-2'
    if (progress >= 50) return 'light-green-lighten-4'
    return 'blue-grey'
  })

  // Register current, hovered row to activator
  // Preferrably called before edit()
  function register (event) {
    activator.value = event.currentTarget
  }

  // Select & load data to be edited
  function edit (productos) {
    selected.value = productos.idproducto
    model.value = { name: item.name, progress: item.progress }
  }

  // Update item data
  function save () {
    dialog.value = false

    items.value = items.value.map(item =>
      item.id === selected.value
        ? { ...item, name: model.value.name, progress: model.value.progress }
        : item
    )
  }

  function removeProduct (id) {
    console.log(id)
  
  }


  const addProduct = async(nombre,descripcion,precio) => {
    
    const request = {
      nombre,
      descripcion,
      precio
    }
    const response = await AddProducto(request)
    //cargar productos otra vez 
    loadProduct()
  }


  const loadProduct = async() => {
    const response = await obtenerProductos()
    productos.value = response
  }

 

  onMounted(async() => {
    loadProduct()
  })

</script>
  