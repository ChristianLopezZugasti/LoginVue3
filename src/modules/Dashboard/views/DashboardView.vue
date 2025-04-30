<template>
    <v-container class="d-flex flex-column align-center">
      <v-data-table :headers="headers" :items="productos" :hover="true" >
        
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
        color="blue"
        
        @click="edit(item.idproducto)"
        @mouseenter="register($event)"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>

      <v-btn variant="text" 
      icon 
      @click="removeProduct(item.idproducto)"
      color="red-lighten-1">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </template>
  </v-data-table>

  <v-dialog v-model="dialog" :activator="activator" max-width="500" @keydown.enter="save" >
    <v-confirm-edit
      ref="confirm"
      v-model="model"
      ok-text="save"
      @cancel="dialog = false"
      @save="save"
      @keydown.enter="save"
      :disabled="false"
      
      
    >
      <template v-slot:default="{ model: proxyModel, actions }">
        <v-card title="Modify Data">
          <v-card-text>
            <v-text-field
              v-model="proxyModel.value.nombre"
              label="Modificar nombre"
            ></v-text-field>

            <v-text-field
              v-model="proxyModel.value.descripcion"
              label="Modificar descripcion"
            ></v-text-field>


            <v-number-input
              v-model="proxyModel.value.precio"
              label="Modificar precio"
              :max="100"
              :min="0"
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
          @click="activatorAdd = !activatorAdd"
          
        />
        
        
    </div>

        
    <AddElementView :value="activatorAdd"  @add="addProduct"  @close="activatorAdd=false"/>
      
    

      
    </v-container>
    
  </template>
  
  
  <script setup>
  import { onMounted, ref ,computed} from 'vue'
 
import AddElementView from '../components/addElementView.vue';
import { AddProducto, DeleteProducto, obtenerProductos, obtenerProductosPorId, UpdateProducto } from '../helpers/services';
  
const activator = ref(false)



const productos = ref([])
  // v-dialog
  const dialog = ref(false)
  const activatorAdd = ref(false)

  // v-confirm-edit
  const confirm = ref(null)

  const model = ref({
    nombre: '',
    descripcion: 0,
    precio: 0,
  })

  const selectedId = ref(null)

 

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
  const edit = async (id) => {
    
    
    const producto = await obtenerProductosPorId(id)
    console.log('producto',producto)

    model.value = { nombre: producto.nombre, 
                    descripcion: producto.descripcion, 
                    precio: producto.precio 
    }
    selectedId.value = id
    //save()
    
  }

  // Update item data
  const save = async() =>{
    
    const response = await UpdateProducto(selectedId.value, model.value)
    console.log('response',response)



    loadProduct()
    dialog.value = false
    
    
    
  }

  const removeProduct = async (id)=> {
    console.log(id)
    const response = await DeleteProducto(id) 
    console.log(response)
    //cargar productos otra vez
    loadProduct()
    
  }


  const addProduct = async(nombre,descripcion,precio) => {
    
    const request = {
      nombre,
      descripcion,
      precio
    }
    try{
      activatorAdd.value = false
      const response = await AddProducto(request)
      console.log(response)
    }
    catch(error){
      console.error('Error al agregar el producto:', error)
    }

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
  