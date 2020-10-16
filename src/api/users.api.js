import env from "../config/env"

export default {
  getPage(params){
    //Possible params
    // role - teacher, student
    return env.API.get('/users', {
      params: params
    });
  },

  getSingle(id, role = 'admin'){
    return env.API.get(role + '/users/' + id);
  },

  getRoles(){
    return env.API.get('/roles');
  },

  create(data){
    return env.API.post('/admin/users', data);
  },
  
  update(id, data){
    return env.API.put('/admin/users/' + id, data);
  },
  
}