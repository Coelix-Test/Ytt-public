<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <div class="u-flex is-flex-column u-flex-grow u-pb-25 screen-container">
      <div class="u-container u-mr-auto u-ml-auto">
        <div class="u-row">
          <div class="head">
            <div class="u-text-h2 u-mb-10 u-mt-10">Add teacher</div>
            <UBtn :to="{ name: 'admin-teacher-invite' }" color="blue">Add via e-mail invite</UBtn>
          </div>
        </div>
        <div class="u-row">
          <div class="u-col-6 u-mb-8">
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
          <div class="u-col-6 u-mb-8">
            <u-text-field
              label="Phone"
              placeholder="Phone"
              v-model="phone"
            >
            </u-text-field>
          </div>
          <div class="u-col-6 u-mb-8">
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
          <div class="u-col-6 u-mb-8">
            <ValidationProvider rules="required" name="Username" v-slot="{ errors }">
              <u-text-field
                label="Username"
                placeholder="Username"
                v-model="username"
                :error="errors[0]"
              >
              </u-text-field>
            </ValidationProvider>
          </div>
          <div class="u-col-6 u-mb-8">
            <u-text-field
              label="City"
              placeholder="City"
              v-model="city"
            >
            </u-text-field>
          </div>
          <div class="u-col-6 u-mb-8"></div>
          <div class="u-col-6 u-mb-8">
            <ValidationProvider rules="min:6|max:20|required" name="Password" v-slot="{ errors }">
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
          <div class="u-col-6 u-mb-8">
            <ValidationProvider rules="min:6|max:20|required" name="Repeat password" v-slot="{ errors }">
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
          <div class="u-col-6">
            <label>Avatar</label>
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
        </div>
      </div>
      <div class="u-flex is-justify-center">
        <UBtn
          size="x-large"
          color="primary"
          @click="handleSubmit(submit)"
          id="create_teacher_submit"
          width="320"
          :loading="loading"
        >
          Save
        </UBtn>
      </div>

    </div>
  </ValidationObserver>
</template>

<script>
import CreateUserMixin from '@/mixins/create-user.mixin';
import { TEACHER } from "@/constants/roles";

export default {
  mixins: [CreateUserMixin],
  data: () => ({
    role: TEACHER,
  }),
}
</script>

<style lang="scss" scoped>
.screen-container{
  min-height: 100%;
}
label{
  font-size: 24px;
  color: #000;
  font-weight: 300;
  line-height: 46px;
  display: inline-block;
}

.add-photo{
  margin-top: 11px;
}
.head{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>