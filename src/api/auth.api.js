export default {

  login(data) {
    return env.API.post('/auth/login', data);
  },

  getCurrentUser(token){
    return env.API.get('/user/data', token ? {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    } : undefined);
  },

  // reg(data) {
  //   return env.API.post('/auth/reg', data);
  // },
  // sendByMail(email){
  //   return env.API.post('/auth/recover', {email:email})
  // },
  // verifyCode(token ){
  //   return env.API.put('/auth/recover/code', {token: token})
  // },
  // changePass(token, pass){
  //   return env.API.put('/auth/recover/pass', {token: token, pass: pass})
  // },
}