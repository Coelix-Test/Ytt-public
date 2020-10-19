import UTextField from '@/components/common/UTextField';
import FileUpload from '@/components/common/FileUpload/FileUpload';

import { LessonsApi, UsersApi } from '@/api';

export default {
  data: () => ({
    name: '',
    phone: '',
    email: '',
    city: '',
    password: '',
    repeatPassword: '',
    avatar: null,
    role: 1,
  }),
  components: {
    UTextField,
    FileUpload,
  },
  methods: {
    validate(){
      this.submit();
    },
    collectPostData(){
      let data = {
        'name' : this.name,
        'phone' : this.phone,
        'email' : this.email,
        'city' : this.city,
        'password' : this.password,
        'password_confirmation' : this.repeatPassword,
        'role' : this.role,
      };

      if(this.avatar){
        data.avatar = this.avatar;
      }

      return data;
    },
    submit(){
      let data = this.collectPostData();
      UsersApi.create(data).then(response => {
        console.log(response);
      });
      console.log(data);
    },
    onAvatarUpload(file){
      if(file.success){
        this.avatar = file.response.data.url;
      }
      // console.log(file);
    },
    getAvatarUploadFunc(){
      return UsersApi.uploadAvatar;
    },
  }
}