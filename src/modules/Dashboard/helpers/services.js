import { Api } from "@/api/tesloApi"



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





