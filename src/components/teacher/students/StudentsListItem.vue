<template>
  <div class="teacher-students-list-item">
    <div class="teacher-students-list-item__avatar" :style="avatarStyle"></div>
    <div class="teacher-students-list-item__name-col">
      <div class="teacher-students-list-item__name">
        {{ name || email  }}
        <div
          class="teacher-students-list-item__answers-count"
          v-if="records_count"
        >
          {{records_count}}
        </div>
      </div>
      <div class="teacher-students-list-item__city" v-if="city">{{city}}</div>
    </div>

    <div class="teacher-students-list-item__actions">
      <UBtn
        size="x-large"
        color="blue"
        outlined
        @click="goToStudentLessons"
        v-if="lessons_count"
      >
        Student lessons
      </UBtn>
      <UBtn
        class="teacher-students-list-item__add-lesson-btn"
        size="x-large"
        color="primary"
        width="250"
      >
        Add lesson
      </UBtn>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    city: {
      type: String,
    },
    records_count: {
      type: Number,
      default: 0,
    },
    lessons_count: {
      type: Number,
      default: 0,
    }
  },
  computed: {
    avatarStyle(){
      return { backgroundImage : `url(${this.avatar})` };
    }
  },
  methods: {
    goToStudentLessons(){

      this.$router.push({
        name: 'teacher-students-lesson-list',
        params: { id: this.id }
      });
    }
  }
}
</script>

<style lang="scss">
@import "@/styles/vars";

.teacher-students-list-item{
  display: flex;
  align-items: center;
  &__avatar{
    width: 87px;
    height: 87px;
    border-radius: 50%;
    background-size: cover;
    background-position: center;

    margin-right: 30px;
  }
  &__name{
    font-size: 24px;
    font-weight: 300;

    display: flex;
    align-items: center;
  }
  &__answers-count{
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    font-size: 14px;
    color: #fff;
    font-weight: 500;
    background-color: $clr-blue;
    margin-left: 10px;
  }
  &__city{
    color: #000;
    opacity: .4;
  }

  &__actions{
    display: flex;
    margin-left: auto;
  }
  &__add-lesson-btn{
    margin-left: 14px;
  }
}
</style>