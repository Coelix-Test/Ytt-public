<template>
  <div class="user-settings">
    <div class="u-text-h2 user-settings__title">Settings</div>

    <ValidationObserver
      tag="div"
      class="user-settings__form"
      v-slot="{ handleSubmit }"
    >
      <div class="user-settings__form-col">
        <ValidationProvider rules="required" name="Full name" v-slot="{ errors }">
          <u-text-field
            label="Full name"
            placeholder="Full name"
            v-model="name"
            :error="errors[0]"
          >
          </u-text-field>
        </ValidationProvider>
      </div>
      <div class="user-settings__form-col">
        <u-text-field
          label="Phone"
          placeholder="Phone"
          v-model="phone"
        >
        </u-text-field>
      </div>
      <div class="user-settings__form-col">
        <ValidationProvider rules="required|email" name="E-mail" v-slot="{ errors }">
          <u-text-field
            label="E-mail"
            placeholder="E-mail"
            v-model="email"
            :error="errors[0]"
          >
          </u-text-field>
        </ValidationProvider>
      </div>
      <div class="user-settings__form-col">
        <u-text-field
          label="City"
          placeholder="City"
          v-model="city"
        ></u-text-field>
      </div>
      <div class="user-settings__form-col">
        <ValidationProvider
          :rules="{
            min:6,
            max:20,
            is: repeatPassword
          }"
          name="Password"
          v-slot="{ errors }"
        >
          <u-text-field
            label="Password"
            placeholder="Password"
            type="password"
            v-model="password"
            :error="errors[0]"
          >
          </u-text-field>
        </ValidationProvider>
      </div>
      <div class="user-settings__form-col">
        <ValidationProvider
          :rules="{
            min:6,
            max:20,
            is: password,
          }"
          name="Repeat password" v-slot="{ errors }"
        >
          <u-text-field
            label="Repeat password"
            placeholder="Repeat password"
            type="password"
            v-model="repeatPassword"
            :error="errors[0]"
          >
          </u-text-field>
        </ValidationProvider>
      </div>
      <div class="user-settings__form-col">
        <label class="user-settings__avatar-label">Avatar</label>
        <file-upload
          v-model="avatar"
          accept="image/*"
        >
          <template v-slot:default-label>
            <UBtn
              size="large"
              color="primary"
              tag="div"
              class="add-photo"
            >
              Add photo
            </UBtn>
          </template>
        </file-upload>
      </div>

      <div class="user-settings__form-submit">
        <UBtn
          size="x-large"
          color="primary"
          @click="handleSubmit(submit)"
          :id="submitId"
          width="320"
          :loading="loading"
        >
          Save
        </UBtn>
      </div>


    </ValidationObserver>
  </div>
</template>

<script>
import UTextField from '@/components/common/UTextField';
import FileUpload from '@/components/common/FileUpload/FileUpload';
import {mapGetters, mapMutations, mapActions} from "vuex";

export default {
  data: () => ({
    name: '',
    phone: '',
    email: '',
    city: '',
    password: '',
    repeatPassword: '',
    avatar: null,
  }),
  components: {
    UTextField,
    FileUpload,
  },
  computed: {
    ...mapGetters('Users', ['loading']),
    ...mapGetters('Auth', ['user']),
    submitId(){
      return this.$route.name + '_submit';
    }
  },
  methods: {
    ...mapActions('Users', {
      updateProfile : 'updateProfile'
    }),
    setInitialState(){
      this.name = this.user.name;
      this.phone = this.user.phone;
      this.email = this.user.email;
      this.city = this.user.city;
      this.avatar = this.user.avatar;
    },
    collectPostData(){
      let formData = {
        name: this.name,
        phone: this.phone,
        email: this.email,
        city: this.city,
      };

      if(this.password){
        formData.password = this.password;
        formData.password_confirmation = this.repeatPassword;
      }

      if(this.avatar && typeof this.avatar !== "string"){
        formData.avatar = this.avatar;
      }

      return formData;
    },
    submit(){
      let data = this.collectPostData();
      this.updateProfile(data)
        .then(() => {
          this.$notify({
            title: 'Profile successfully updated!',
            type: 'success'
          });
        })
        .catch(({ message }) => {
          this.$notify({
            title: 'Profile update error',
            text: message,
            type: 'error'
          });
        });
    },

  },
  mounted() {
    this.setInitialState();
  }
}
</script>

<style lang="scss">
.user-settings{
  &__title{
    margin-bottom: 40px;
  }
  &__form{
    display: flex;
    flex-wrap: wrap;
    $gutter: 19px;
    margin-right: -$gutter;
    margin-left: -$gutter;
    &-col{
      flex-basis: calc(50% - #{$gutter} * 2);
      margin-right: $gutter;
      margin-left: $gutter;

      margin-bottom: 32px;
    }
    &-submit{
      flex-basis: 100%;
      display: flex;
      justify-content: center;
    }
  }

  &__avatar-label{
    font-size: 30px;
    font-weight: 300;
    color: #000;
    margin-bottom: 16px;
    display: block;
  }
}
</style>