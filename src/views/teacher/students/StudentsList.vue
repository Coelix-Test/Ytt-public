<template>
  <ContentContainer>
    <div class="teacher-students-list-view">
      <div class="teacher-students-list-view__header">
        <div class="u-text-h2">Students</div>
      </div>

      <StudentsList></StudentsList>
    </div>
  </ContentContainer>
</template>

<script>
import ContentContainer from "@/components/common/ContentContainer";
import StudentsList from "@/components/teacher/students/StudentsList";

export default {
  components: {
    ContentContainer,
    StudentsList,
  }
}
</script>

<style lang="scss">
</style>