<template>
  <div class="u-container u-ml-auto u-mr-auto">
    <div class="u-row">
      <div class="u-col-12">
        <u-card class="u-px-20 u-py-16 u-my-10">
          <div class="u-flex">
            <div class="u-text-h2 u-mr-auto">Add users</div>

            <UBtn
              class="u-mx-2"
              :to="{ name: 'admin-student-create' }"
              color="primary"
              size="x-large"
              id="admin_create_student_link"
            >
              Add student
            </UBtn>
            <UBtn
              class="u-mx-2"
              :to="{ name: 'admin-teacher-create' }"
              color="primary"
              size="x-large"
              id="create_teacher_link"
            >
              Add teacher
            </UBtn>
          </div>
        </u-card>
      </div>
    </div>
  </div>
</template>

<script>
import UCard from '@/components/common/UCard';
import UBtn from "@/components/common/UBtn";

export default {
  components: {
    UCard,
    UBtn,
  }
}
</script>

<style>

</style>