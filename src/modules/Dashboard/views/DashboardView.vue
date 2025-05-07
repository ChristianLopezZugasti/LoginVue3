<template>
  <v-container class="d-flex flex-column align-center">
      <v-data-table :headers="headers" :items="productos" :hover="true" >
        
      
    <template v-slot:item.CreatedAt="{item}">
          <span>{{ item.CreatedAt.split('T')[0] }}</span>
    </template>

    <template v-slot:item.disponible="{item}">
      <v-switch v-model="item.disponible" color="green" />
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


                <v-number-input
                  v-model="precio"
                  label="Modificar precio"
                  :max="100"
                  :min="0"
                  :rules="[rules.requerido,rules.number]"
                  required
                ></v-number-input>
                
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
import { rules } from '@/constants/rules';
  
const activator = ref(false)
const DeleteActivator = ref(false)


const productos = ref([])
  // v-dialog
  const dialog = ref(false)
  const activatorAdd = ref(false)

 
  const form = ref()

  const nombre = ref('')
  const descripcion = ref('')
  const  precio = ref(0)
  

  const selectedId = ref('')

 
 

  //los headers  necesitan coincidir con los nombres de cada fila 
  const headers = [
    { title: 'ID', value: 'idproducto' },
    { title: 'Disponible', value: 'disponible'},
    { title: 'Name', value: 'nombre' },
    { title: 'Descripción', value: 'descripcion' },
    { title: 'Precio', value: 'precio'},
    { title: 'OFF', value: 'descuento' },
    { title: 'Fecha', value: 'CreatedAt'},
    { title: 'Complementos', value: 'complementos'},
    { title: 'Actions', value: 'actions' },
  ]




  // Register current, hovered row to activator
  // Preferrably called before edit()
  function register (event) {
    activator.value = event.currentTarget
  }

  // Select & load data to be edited
  const edit = async (id) => {
    
    
    const producto = await obtenerProductosPorId(id)
   // console.log('producto',producto)

   dialog.value = true
    nombre.value = producto.nombre
    descripcion.value = producto.descripcion
    precio.value = producto.precio

    // model.value = { nombre: producto.nombre, 
    //                 descripcion: producto.descripcion, 
    //                 precio: producto.precio 
    // }
    selectedId.value = id
    
    //save()
    
  }

  // Update item data
  const save = async() =>{

    const model = {
      nombre: nombre.value,
      descripcion: descripcion.value,
      precio: precio.value
    }
    
    
    const {valid} = await form.value.validate()
    if(!valid){
     
      return
    }

    const response = await UpdateProducto(selectedId.value, model)
    //console.log('response',response)

    loadProduct()
    dialog.value = false    
  }

  const removeProduct = async ()=> {
    const response = await DeleteProducto(selectedId.value) 
    console.log(response)
    DeleteActivator.value = false
    //cargar productos otra vez
    loadProduct()
    
  }


  const addProduct = async(nombre,descripcion,precio,descuento,complementos) => {
    
    const request = {
      nombre,
      descripcion,
      precio,
      descuento,
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
    overflow-x: auto;
  }
</style>