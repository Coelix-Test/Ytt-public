<template>
  <div class="u-container u-ml-auto u-mr-auto u-pt-9">
    <div class="u-row">
      <div class="u-col-7">
        <div class="u-flex is-align-center">
          <div class="u-text-h1 u-mr-6">Users</div>
        </div>
      </div>
      <div class="u-col-5">
        <!-- search -->
      </div>
      <div class="u-col-12 u-mb-20">
        <u-tabs class="users-tabs" v-model="currentTab">
          <u-tab label="Teachers">
            <teachers-list></teachers-list>
          </u-tab>
          <u-tab label="Students">
            <students-list></students-list>
          </u-tab>
        </u-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { LessonsApi } from '@/api';
// import ResponsiveDataTable from '@/components/common/DataTable/ResponsiveDataTable.vue';

import UTabs from '@/components/common/UTabs/UTabs';
import UTab from '@/components/common/UTabs/UTab';
import TeachersList from '@/components/admin/users/TeachersList';
import StudentsList from '@/components/admin/users/StudentsList';


export default {
  components: {
    UTabs,UTab,

    TeachersList,StudentsList
  },
  data: () => ({
    data: [],
    currentTab: 0,
  }),
  computed: {
    
  },
  methods: {
    getItems(){
      LessonsApi.getPage(response => {
        console.log(response);
      });
    }
  },
  mounted(){
    
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/vars';

tr:hover .pages-col{
  color: #fff;
}
.pages-col{
  color: $clr-grey;
}

.users-tabs::v-deep{
  .u-tabs__header{
    margin-bottom: 40px;
  }
}
</style>