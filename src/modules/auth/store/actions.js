import { validateLogin } from "../helpers/services"



export const verifyUser = async ( { commit },values) => { 
  //console.log("verifyUser", values)
  const response = await validateLogin(values)
 // console.log("response", response.token)
  if(response.replyCode == 200){
    commit("setUser",response.token)
    return response
  }
  return response
}




