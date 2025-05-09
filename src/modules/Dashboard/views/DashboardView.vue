<template>
  <v-container class="d-flex flex-column align-center">
    <v-card outlined elevation="3" class="pa-10">
      <v-row>
        <v-col cols="7">
          <v-text-field
          class="hover-textfield"
            density="compact"
            v-model="search"
            placeholder="Buscar por nombre,id o descripcion"
            prepend-inner-icon="mdi-magnify"
            variant="solo"
            
            flat
            hide-details
            single-line
            clearable
          ></v-text-field>
        </v-col>
        <v-col cols="5" class="d-flex justify-end align-center">
          <v-btn color="primary" 
          @click="activatorAdd = !activatorAdd"
          prepend-icon="mdi-plus"
          text="Añadir producto"
          rounded="">
          
          </v-btn>
        </v-col>
      </v-row>
      

    <v-data-table :headers="headers" :items="productos" :hover="true"  :search="search" fixed-header   height="410px" >
        
      
    <template v-slot:item.CreatedAt="{item}">
          <span>{{ formatDate(item.CreatedAt)}}</span>
    </template>

    <template v-slot:item.disponible="{item}">
      <v-chip :color="item.disponible ? 'green' : 'red'" variant="flat" size="100">
        <v-icon> {{ item.disponible ? 'mdi-check' : 'mdi-close' }} </v-icon>
      </v-chip>

     </template>

    <template v-slot:item.descuento="{item}">
     <span>{{ item.descuento  }}%</span>  
    </template>

    <template v-slot:item.complementos="{item}">
      <div style="max-height: 80px;max-width: 170px; overflow-y: auto;">
        <v-chip
        v-for="complemento in item.complementos"
        :key="complemento.id"
        class="ma-1 d-inline-block"
        color="blue-grey lighten-1"
        >
      {{ complemento.nombre }}
    </v-chip>
      <span v-if="item.complementos.length === 0">Sin complementos</span>
  </div>

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
      @click="()=>{selectedId = item.idproducto; DeleteActivator = true }"
      color="red-lighten-1">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </template>

  </v-data-table>

  <template>
    <v-dialog v-model="DeleteActivator"   transition="dialog-bottom-transition" width="auto">
      <v-card
        max-width="400"
        prepend-icon="mdi-alert"
        text="¿Estas seguro que deseas eliminar el producto?"
        title="Delete in progress"
        color="red"
      >
      
      <v-card-actions>
        <v-space></v-space> 
        <v-btn
          text="CANCELAR"
          prepend-icon="mdi-close"
          @click="DeleteActivator = false"
        >

        </v-btn>
        
        <v-btn
          text="ELIMINAR PRODUCTO"
          prepend-icon="mdi-delete"
          @click="removeProduct"
        >
        </v-btn>
      </v-card-actions>
      
      </v-card>
      
  </v-dialog>

  </template>
  
  <v-dialog v-model="dialog" :activator="activator" max-width="500"  >
    
          <v-card title="Modify Data">
            <v-card-text>
              <v-form ref="form"  @submit.prevent="save"> 
                <v-text-field
                  v-model="nombre"
                  label="Modificar nombre"
                  :rules="[rules.requerido,
                  ]"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="descripcion"
                  label="Modificar descripcion"
                  :rules="[rules.requerido]"
                  required
                ></v-text-field>
                <v-combobox
                   v-model="complementos"
                  :items="items"
                  label="Categoría"
                  chips
                  multiple
                  clearable="true"
                  closable-chips="true"
                  no-data-text
                  :rules="[rules.selectEnItems(items)]"
                ></v-combobox>


                <v-row>
                <v-col cols="4">
                  <v-text-field
                    v-model="precio"
                    label="precio $"
                    :rules="[
                      rules.requerido,
                      rules.number,
                    ]"
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="descuento"
                    label="descuento %"
                    placeholder="0"
                    :rules="[
                      
                      rules.number,
                    ]"
                  ></v-text-field>
                </v-col>  

                <v-col cols="4">
                  <v-switch
                  v-model="disponible"
                  color="green"
                  label="Activo"
                ></v-switch>  
                </v-col>
              </v-row>
               
                
                             
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary"  type="submit" text="GUARDAR" prepend-icon="mdi-content-save"></v-btn>
                  <v-btn color="red" @click="dialog = false" 
                  text="CANCELAR"
                  prepend-icon="mdi-close" ></v-btn>
                </v-card-actions>

              </v-form>
            </v-card-text>
          </v-card>
    </v-dialog>
          
      <AddElementView :value="activatorAdd"  @add="addProduct"  @close="activatorAdd=false"/>
      
    </v-card>
  </v-container>

    
  </template>
  
  
  <script setup>
  import { onMounted, ref } from 'vue'
 
import AddElementView from '../components/addElementView.vue';
import { AddProducto, DeleteProducto, obtenerProductos, obtenerProductosPorId, UpdateProducto } from '../helpers/services';
import { rules } from '@/constants/rules';
import { formatDate } from '@/constants/functions';
  
const items = [
    'Alimentos',
    'Tecnologia',
    'Linea Blanca',
    'Hogar',
    'Ropa',
    'Juguetes',
    'Deportes',
  ]


const search = ref('')

const activator = ref(false)
const DeleteActivator = ref(false)


  const productos = ref([])
  // v-dialog
  const dialog = ref(false)
  const activatorAdd = ref(false)

 
  const form = ref()

  // VARIABLES PARA EDITAR 
  const nombre = ref('')
  const descripcion = ref('')
  const  precio = ref(0)
  const descuento = ref(0)
  const complementos = ref([])
  const disponible = ref()
  

  const selectedId = ref('')

  //los headers  necesitan coincidir con los nombres de cada fila 
  const headers = [
    { title: 'ID', value: 'idproducto' },
    { title: 'Activo', value: 'disponible'},
    { title: 'Name', value: 'nombre' },
    { title: 'Descripción', value: 'descripcion' },
    { title: 'Precio', value: 'precio'},
    { title: 'OFF', value: 'descuento' },
    { title: 'Fecha', value: 'CreatedAt'},
    { title: 'Categoria', value: 'complementos'},
    { title: 'Actions', value: 'actions' },
  ]

  // Register current, hovered row to activator
  // Preferrably called before edit()
  function register (event) {
    activator.value = event.currentTarget
  }

  // Select & load data to be edited
  const edit = async (id) => {
    
    complementos.value = []

    const producto = await obtenerProductosPorId(id)
   // console.log('producto',producto)

   dialog.value = true
    nombre.value = producto.nombre
    descripcion.value = producto.descripcion
    precio.value = producto.precio
    descuento.value = producto.descuento
    disponible.value = producto.disponible

    for(const comp of producto.complementos){
      complementos.value.push(comp.nombre)
    }
    

   
    selectedId.value = id
    
  }

  // Update item data
  const save = async() =>{

    const model = {
      nombre: nombre.value,
      descripcion: descripcion.value,
      precio: precio.value,
      descuento: parseFloat(descuento.value),
      complementos: complementos.value,
      disponible: disponible.value
    }
    
    
    const {valid} = await form.value.validate()
    if(!valid){
     
      return
    }

    const response = await UpdateProducto(selectedId.value, model)
    console.log('response',response)

    loadProduct()
    dialog.value = false    
  }

  const removeProduct = async ()=> {
    const response = await DeleteProducto(selectedId.value) 
   
    DeleteActivator.value = false
    //cargar productos otra vez
    loadProduct()
    
  }


  const addProduct = async(nombre,descripcion,precio,descuento,complementos) => {
    
   
    const request = {
      nombre,
      descripcion,
      precio,
      descuento: parseFloat(descuento),
      complementos
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

<style scoped>
  .v-data-table {
    max-width: 100%;
    
  }
  
</style>