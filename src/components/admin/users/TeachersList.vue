<template>
  <u-card>
    <table class="u-data-table is-striped">
      <colgroup>
        <col>
        <col>
        <col>
      </colgroup>
      <thead>
        <tr>
          <th class="u-pl-13 u-text-left">Name</th>
          <th class="u-text-left">E-mail</th>
          <th class="u-text-left">Phone</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr 
          v-for="index in 15" 
          :key="index"
        >
          <td class="u-pl-13">
            <div class="u-flex is-align-center">
              <div class="avatar-wrap u-mr-6">
                <img src="https://via.placeholder.com/40x40" alt="">
              </div>
              Patrick Smith
            </div>
          </td>
          <td class="grey-col">test@test.com</td>
          <td class="grey-col">08357934739</td>
          <td class="u-pr-25 u-text-right">
            <button class="u-btn is-dark is-bg-primary is-small u-font-weight-light">Add lesson</button>
          </td>
        </tr>
      </tbody>
    </table>
   </u-card>
</template>

<script>
import UCard from '@/components/common/UCard';

import { UsersApi } from '@/api';

export default {
  data: () => ({
    items: [],
    columns: [],
  }),
  components: {
    UCard,
  },
  methods: {
    getAll(){
      UsersApi.getPage({ role: 2 }).then(response => {this.items = response.data});
    }
  },
  mounted(){
    this.getAll();
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/vars';

.avatar-wrap{
  border-radius: 50%;
  overflow: hidden;
  width: 40px;
  height: 40px;
  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

tr:hover .grey-col{
  color: #fff;
}
.grey-col{
  color: $clr-grey;
}
</style>