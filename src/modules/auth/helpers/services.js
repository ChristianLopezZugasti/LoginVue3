import { Api } from "@/api/tesloApi"


export const validateLogin = async(values) =>{

    try {
        //console.log('values',values)
        const response = await Api.post('/auth/login',values)
        console.log('response',response.data.token )    
        return response.data
    }

    catch (error) {
        console.log('error:',error.response.data) 
        if( error.response?.status === 400){ //si es un error de axios
                        return error.response.data
                }
                console.log(error) 
                throw new Error('No se pudo realizar la peticion')
    }

}


export const validateRegister = async(values) => {

    try {
        const response = await Api.post('/usuarios',values)
        return{
            response,
            ok: true,
            message: 'Usuario creado correctamente'
        } 
    }
    catch (error) { 
        
        if(error.response?.status === 400){ //si es un error de axios
            return {
                ok: false,
                message: 'usuario o contra incorrecto'
            }
        }
        console.log(error) 
        throw new Error('No se pudo realizar la peticion')
    }
}


