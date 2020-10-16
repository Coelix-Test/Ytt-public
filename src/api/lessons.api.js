import env from "../config/env"

export default {

  getPage(params){
    return env.API.get('/lessons', {
      params: params
    });
  },

  create(data){
    return env.API.post('/lessons', data);
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

    return env.API.post('/lessons/pdf', data, options);
  },
}