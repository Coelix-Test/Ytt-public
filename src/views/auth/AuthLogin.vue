<template>
  <u-card class="l-auth-login">
    <div class="u-container l-auth-login__social">
      <div class="u-row">
        <div class="u-col-6">
          <button class="u-btn is-medium is-dark is-bg-blue is-block">Sign in with Facebook</button>
        </div>
        <div class="u-col-6">
          <button class="u-btn is-medium is-dark is-bg-red is-block">Sign in with Google</button>
        </div>

      </div>
    </div>
    <u-text-field 
      label="Full name or E-mail"
      v-model="username" 
      placeholder="John Smit"
      inset
    ></u-text-field>
    <u-text-field 
      label="Password"
      v-model="username" 
      placeholder="******"
    ></u-text-field>

    <div>
      <label>
        <input type="checkbox">
        Automatic login
      </label>
    </div>

    <div class="u-flex">
      <button class="u-btn is-x-large is-bg-primary is-dark u-mr-auto u-ml-auto" @click="validate">Log in</button>
    </div>
  </u-card>
</template>

<script>
import UCard from '@/components/common/UCard.vue';
import UTextField from '@/components/common/UTextField.vue';
import { UsersApi, AuthApi } from '@/api';

export default {
  data: () => ({
    username: 'admin',
    password: 'admin',
    isAutomatic: false,
  }),
  components: {
    UCard,
    UTextField,
  },
  methods: {
    validate(){
      this.login();
    },
    login(){
      AuthApi.login({
        login: this.username,
        password: this.password,
      }).then(response => {
        console.log(response);
        this.$store.commit('CurrentUser/auth', response.data.access_token);
        // TODO: get user data
        // this.$store.dispatch('CurrentUser/updateData');
        this.$router.push({name: 'lessons-all'});
      });
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/vars';

.l-auth-login{
  width: $popup-width-xl;
  padding: 45px 75px 25px;
}
.l-auth-login__social{
  font-size: 16px;
}
</style>