export default {

  login: data => env.API.post('/auth/login', data),

  getCurrentUser: token =>
    env.API.get(
      '/user',
      token
        ? {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        : undefined
    ),
  
  register: data => env.API.post('/auth/register', data)

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
