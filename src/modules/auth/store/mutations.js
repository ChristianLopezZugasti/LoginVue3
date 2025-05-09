/*  mutaciones son sincronas y hacen modificaciones del state */
export const setUser = (state,{ token, userName }) => {  

  localStorage.setItem('token', token);
  localStorage.setItem('user', userName);
}

export const setLogout = () => {
  sessionStorage.clear();
}
