<template>
  <ContentContainer>
    <div class="teacher-students-lessons-list-view">
      <div class="teacher-students-lessons-list-view__header">
        <div class="u-text-h2">
          Lessons of
          <span class="teacher-students-lessons-list-view__student-name">Patrik Smith</span>
        </div>
      </div>
    </div>

    <StudentsLessionsList></StudentsLessionsList>
  </ContentContainer>
</template>

<script>
import ContentContainer from "@/components/common/ContentContainer";
import StudentsLessionsList from "@/components/teacher/students/StudentsLessionsList";

//TODO: load student and display his name dynamically

export default {
  components: {
    ContentContainer,
    StudentsLessionsList,
  }
}
</script>

<style lang="scss">
@import "@/styles/vars";

.teacher-students-lessons-list-view{
  &__student-name{
    color: $clr-blue;
  }
}
</style>