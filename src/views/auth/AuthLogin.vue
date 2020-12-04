<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <u-card class="login">
      <form  @submit.prevent="() => handleSubmit(() => signIn(form))">
        <div class="login__form">
          <ValidationProvider rules="required" name="Email or username" v-slot="{ errors }">
            <UTextField
              padding
              label="Email or username"
              v-model="form.login"
              placeholder="myemail@example.com"
              class="login__form-input"
              :error="errors[0]"
              inset
            ></UTextField>
          </ValidationProvider>
          <ValidationProvider rules="required" name="Password" v-slot="{ errors }">
            <UTextField
              padding
              label="Password"
              v-model="form.password"
              placeholder="******"
              type="password"
              :error="errors[0]"
              class="login__form-input"
            ></UTextField>
          </ValidationProvider>

          <UCheckbox class="login__form-remember" v-model="form.remember">
            Automatic  login
          </UCheckbox>
        </div>

        <div class="u-flex is-justify-center">
          <UBtn
            class="login__btn"
            size="x-large"
            color="primary"
            :loading="loading"
          >
            Log in
          </UBtn>
        </div>

      <div class="login__forgot">
        Forgot your password? <span @click="openResetPasswordModal">click here</span>
      </div>
      </form>
    </u-card>
    <ResetPassword></ResetPassword>

  </ValidationObserver>
</template>

<script>
import UCard from '@/components/common/UCard.vue';
import UTextField from '@/components/common/UTextField.vue';
import UCheckbox from '@/components/common/UCheckbox.vue';
import ResetPassword from '@/components/modals/ResetPassword';
import { mapActions, mapGetters } from 'vuex'

export default {

  data: () => ({
    form:{
      login: '',
      password: '',
      remember: false
    }
  }),
  mounted(){

  },
  components: {
    UCard,
    UTextField,
    UCheckbox,
    ResetPassword
  },
  computed: {
    ...mapGetters('Auth', ['loading'])
  },
  methods: {
    ...mapActions('Auth', ['login']),
    signIn(credentials){
      this.login(credentials)
      .then(() => {
        this.$notify({
          title: 'Welcome!',
          type: 'success'
        });
      })
      .catch(({ message }) => {
        this.$notify({
          title: 'Login error',
          text: message,
          type: 'error'
        });
      })
    },
    openResetPasswordModal(){
      this.$modal.show('reset-password');
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/vars';

.title{
  font-weight: 300;
  opacity: 0.2;
  color: #fff;
  text-decoration: none;

  width: 258px;
  text-align: center;
}

.login{
  width: $popup-width-xl;
  padding: 45px 75px 25px;

  &__form{
    //margin-top: 66px;
    &-input{
      margin-top: 20px;
    }
    &-remember{
      margin-top: 30px;
    }
  }

  &__btn{
    min-width: 262px;
    margin-top: 23px;
  }
  &__forgot{
    text-align: center;
    font-family: Poppins, sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 20px;
    color: #2E2E2E;
    margin-top: 15px;
    span{
      color: #3C54AC;
      cursor: pointer;
    }
  }

}
</style>
