import { Api } from "@/api/tesloApi"



export const obtenerProductosPorId = async (id) => {
    try { 
        const response = await Api.get(`/productos/${id}`)
        return response.data  //al ser un solo objeto, se quita rows
     }
    catch (error) {
        if( error.response?.status === 400){ //si es un error de axios
            return error.response.data
    }
    console.log(error) 
    throw new Error('No se pudo realizar la peticion')
    }
}

export const obtenerProductos = async () => {
    try { 
        const response = await Api.get('/productos')
        //console.log(response.data.rows)
        return response.data.rows
     }
    catch (error) {
        if( error.response?.status === 400){ //si es un error de axios
            return error.response.data
    }
    console.log(error) 
    throw new Error('No se pudo realizar la peticion')
    }
}

export const AddProducto = async (producto) => {

    try {
        console.log(typeof(producto.descuento), producto.descuento)
        const response = await Api.post('/productos', producto) 
        console.log(response.data)
        return response.data

    }
    catch (error) {
        if( error.response?.status === 400){ //si es un error de axios
            return error.response.data
    }
    console.log(error) 
    throw new Error('No se pudo realizar la peticion')
    }

}


export const UpdateProducto = async (id,producto) => {
    try {
        const response = await Api.put(`/productos/${id}`,producto)
        return response.data
    }
    catch (error) {
        if( error.response?.status === 400){ //si es un error de axios
            return error.response.data
    }
    console.log(error) 
    throw new Error('No se pudo realizar la peticion')  
    }
    }   



export const DeleteProducto = async (id) => {
    try{
        const response = await Api.delete(`/productos/${id}`)
        return response.data
    }
    catch(error){
        if( error.response?.status === 400){ //si es un error de axios
            return error.response.data
    }
    console.log(error) 
    throw new Error('No se pudo realizar la peticion')  
    }
}





