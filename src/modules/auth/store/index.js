// Una template para que solo copues y pegues en el modulo correspondiente
//import state from './state'
import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'

const sharedModule = {
  namespaced: true,
  actions,
  getters,
  mutations,
  //state 
}

export default sharedModule
