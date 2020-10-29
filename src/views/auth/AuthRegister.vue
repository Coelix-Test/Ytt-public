<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <u-card class="register">
      <SocialsAuth/>

      <div class="register__form">
        <ValidationProvider rules="email|required" name="Email" v-slot="{ errors }">
          <UTextField
            label="Email"
            v-model="email"
            placeholder="myemail@example.com"
            :error="errors[0]"
            class="register__form-input"
            inset
          />
        </ValidationProvider>
        <ValidationProvider rules="min:6|max:20|required" name="Password" v-slot="{ errors }">
          <UTextField
            label="Password"
            v-model="password"
            type="password"
            placeholder="******"
            :error="errors[0]"
            class="register__form-input"
          />
        </ValidationProvider>
        <ValidationProvider rules="confirmed:Password" name="Repeat Password" v-slot="{ errors }">
          <UTextField
            label="Repeat Password"
            v-model="confirmPassword"
            type="password"
            :error="errors[0]"
            class="register__form-input"
            placeholder="******"
          />
        </ValidationProvider>

        <ValidationProvider rules="isTrue" name="Terms" v-slot="{ errors }">
          <UCheckbox class="register__form-terms" v-model="terms" :error="Boolean(errors.length)">
            I have read and I agree to the <a href="#">Terms and conditions</a> *
          </UCheckbox>
        </ValidationProvider>
      </div>

      <div class="u-flex is-justify-center">
        <UBtn
          size="large"
          color="primary"
          @click="() => handleSubmit(register)"
        >
          Register
        </UBtn>
      </div>
    </u-card>
  </ValidationObserver>
</template>

<script>
import UCard from '@/components/common/UCard.vue';
import UTextField from '@/components/common/UTextField.vue';
import UCheckbox from '@/components/common/UCheckbox.vue';
import SocialsAuth from '@/components/partials/SocialsAuth';
import { AuthApi } from '@/api';


export default {
  data: () => ({
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  }),
  components: {
    UCard,
    UTextField,
    SocialsAuth,
    UCheckbox
  },
  methods: {
    register(){
      AuthApi.register({
        email: this.email,
        password: this.password,
        password_confirmation: this.confirmPassword,
      }).then(response => {
        this.$store.commit('CurrentUser/auth', response.data.access_token);
        this.$router.push({name: 'admin-lessons-all'});
      });
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/vars';

.register{
  width: $popup-width-xl;
  padding: 45px 75px 25px;

  &__form{
    &-input{
      margin-top: 20px;
    }
    &-terms{
      margin-top: 25px;
    }
  }

  &__btn{
    min-width: 262px;
    margin-top: 25px;
  }

}

</style>
