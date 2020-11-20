<template>
  <ContentContainer>
    <div class="u-text-h2 edit-user__title">Edit user</div>

    <EditProfile></EditProfile>
  </ContentContainer>
</template>

<script>
import ContentContainer from "@/components/common/ContentContainer";
import EditProfile from "@/components/users/EditProfile";

export default {
  components: {
    ContentContainer,
    EditProfile,
  }
}
</script>

<style lang="scss">
.edit-user{
  &__title{
    margin-bottom: 40px;
  }
}
</style>