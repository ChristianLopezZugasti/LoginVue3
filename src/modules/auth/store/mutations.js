/*  mutaciones son sincronas y hacen modificaciones del state */
export const setUser = (state,update) => {  
  localStorage.setItem('token', update);
}

export const setLogout = () => {
  sessionStorage.clear();
}
