import env from "../config/env"

export default {

  getPage(params, role = 'admin'){
    return env.API.get(`/${role}/lessons`, {
      params: params
    });
  },

  create(data, role = 'admin'){
    return env.API.post( `/${role}/lessons`, data);
  },

  get(id){
    return env.API.get('/lessons/' + id);
  },

  update(id, data){
    return env.API.put('/lessons/' + id, data);
  },

  delete(id){
    return env.API.delete('/lessons/' + id);
  },


  pdf(file, progressHandler = null) {

    let data = new FormData();
    data.append('pdf', file);

    let options = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }

    if(progressHandler !== null){
      options.onUploadProgress = progressHandler;
    }

    return env.API.post('/admin/lessons/pdf', data, options);
  },

  addAccessToTeacher(lessonId, data){
    return env.API.post(`/admin/lessons/${lessonId}/users/access`, data);
  }
}