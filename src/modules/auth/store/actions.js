import { validateLogin } from "../helpers/services"



export const verifyUser = async ( { commit },values) => { 
  //console.log("verifyUser", values)
  const response = await validateLogin(values)
 console.log("response", response.user.nombre)
  if(response.replyCode == 200){
    const token = response.token
    const userName = response.user.nombre
    commit("setUser",{token,userName})
    return response
  }
  return response
}




