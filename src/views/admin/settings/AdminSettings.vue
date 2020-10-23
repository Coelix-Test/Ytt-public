<template>
  <div class="u-container u-ml-auto u-mr-auto">
    <div class="u-row">
      <div class="u-col-12">
        <u-card class="u-px-20 u-py-16 ">
          <div class="u-flex">
            <div class="u-text-h2 u-mr-auto">Add users</div>
            
            <router-link
              tag="button"
              :to="{ name: 'admin-student-create' }"
              class="u-btn is-x-large is-bg-primary is-dark u-mx-2"
            >
              Add student
            </router-link>
            <router-link
              tag="button"
              :to="{ name: 'admin-teacher-create' }"
              class="u-btn is-x-large is-bg-primary is-dark"
            >
              Add teacher
            </router-link>
          </div>
        </u-card>
      </div>
    </div>
  </div>
</template>

<script>
import UCard from '@/components/common/UCard';

export default {
  components: {
    UCard,
  }
}
</script>

<style>

</style>