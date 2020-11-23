<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <u-card class="login">
      <form  @submit.prevent="() => handleSubmit(() => signIn(form))">
<!--      <SocialsAuth/>-->
        <div class="login__form">
          <ValidationProvider rules="email|required" name="Email" v-slot="{ errors }">
            <UTextField
              padding
              label="Email"
              v-model="form.email"
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

<!--      <div class="login__forgot" >-->
<!--        Forgot your password? <a href="#">click here</a>-->
<!--      </div>-->
      </form>
    </u-card>
  </ValidationObserver>
</template>

<script>
import UCard from '@/components/common/UCard.vue';
import UTextField from '@/components/common/UTextField.vue';
import UCheckbox from '@/components/common/UCheckbox.vue';
import SocialsAuth from '@/components/partials/SocialsAuth';
import { mapActions, mapGetters } from 'vuex'

export default {

  data: () => ({
    form:{
      email: '',
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
    SocialsAuth
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/vars';

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
  }

}
</style>
