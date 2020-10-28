import env from "../config/env"

export default {
  getPage(params, role = 'admin'){
    //Possible params
    // role - teacher, student
    return env.API.get(`/${role}/users`, {
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

    let options = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
    
    return env.API.post('/admin/users', data, options);
  },
  
  update(id, data){
    return env.API.put('/admin/users/' + id, data);
  },

  uploadAvatar(file, progressHandler = null) {

    let data = new FormData();
    data.append('files[]', file);

    let options = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }

    if(progressHandler !== null){
      options.onUploadProgress = progressHandler;
    }

    return env.API.post('/users/avatar', data, options);
  },

  addAccessToLesson(userId, data){
    return env.API.post(`/admin/users/${userId}/lessons/access`, data);
  },


  
}