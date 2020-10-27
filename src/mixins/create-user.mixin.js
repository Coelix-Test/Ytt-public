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
      let formData = new FormData();
      formData.append('name', this.name);
      formData.append('phone', this.phone);
      formData.append('email', this.email);
      formData.append('city', this.city);
      formData.append('password', this.password);
      formData.append('password_confirmation', this.repeatPassword);
      formData.append('role', this.role);

      if(this.avatar){
        console.log('collectPostData file ', this.avatar.file);
        formData.append('avatar', this.avatar.file);
      }

      return formData;
    },
    submit(){
      let data = this.collectPostData();
      UsersApi.create(data).then(response => {
        console.log(response);
      });
      console.log(data);
    },
    
  }
}