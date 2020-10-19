<template>
  <div class="u-flex is-flex-column u-flex-grow u-pb-25 screen-container">
    <div class="u-container u-mr-auto u-ml-auto">
      <div class="u-row">
        <div class="u-col-12">
          <div class="u-text-h1 u-mb-10 u-mt-10">Add teacher</div>
        </div>
      </div>
      <div class="u-row">
        <div class="u-col-6 u-mb-8">
          <u-text-field
            label="Full name"
            placeholder="Full name"
            v-model="name"
          >
          </u-text-field>
        </div>
        <div class="u-col-6 u-mb-8">
          <u-text-field
            label="Phone"
            placeholder="Phone"
            v-model="phone"
          >
          </u-text-field>
        </div>
        <div class="u-col-6 u-mb-8">
          <u-text-field
            label="E-mail"
            placeholder="E-mail"
            v-model="email"
          >
          </u-text-field>
        </div>
        <div class="u-col-6 u-mb-8">
          <u-text-field
            label="City"
            placeholder="City"
            v-model="city"
          >
          </u-text-field>
        </div>
        <div class="u-col-6 u-mb-8">
          <u-text-field
            label="Password"
            placeholder="Password"
            v-model="password"
          >
          </u-text-field>
        </div>
        <div class="u-col-6 u-mb-8">
          <u-text-field
            label="Repeat password"
            placeholder="Repeat password"
            v-model="repeatPassword"
          >
          </u-text-field>
        </div>
        <div class="u-col-6">
          <file-upload
            :api-func="getAvatarUploadFunc()"
            @input="onAvatarUpload"
            :value="avatar"
            accept="image/*"
          ></file-upload>
        </div>
      </div>
    </div>
    <button class="u-btn is-x-large is-bg-primary is-dark u-mr-auto u-ml-auto u-mt-auto" @click="validate">Save</button>
  </div>
</template>

<script>
import CreateUserMixin from '@/mixins/create-user.mixin';
import { LessonsApi, UsersApi } from '@/api';

export default {
  mixins: [CreateUserMixin],
  data: () => ({
    role: 2,
  }),
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
.screen-container{
  min-height: 100%;
}
</style>