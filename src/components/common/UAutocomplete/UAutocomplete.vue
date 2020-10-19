<template>
  <div class="u-autocomplete">
    <label class="u-autocomplete__input" :for="'input-' + uuid">
      <div class="u-autocomplete__label">Choose teacher</div>
      <div class="u-autocomplete__selections u-px-4 u-py-2">
        <div 
          class="u-autocomplete__chip u-ma-1 u-px-11" 
          v-for="item in value"
          :key="item.id"
        >
          {{item.name}}
        </div>

        <input 
          :id="'input-' + uuid"
          type="text" 
          v-model="autocomplete"
          @input="handleFilter"
        >
      </div>
    </label>
    <div class="u-autocomplete__list">
      <div
        class="u-autocomplete__list-item u-flex is-align-center u-px-12" 
        :class="{ 'is-active' : item.isSelected }"
        v-for="item in computedItems" 
        :key="item.id"
        @click="toggleItem(item)"
      >
        {{item.name}}
      </div>
    </div>
  </div>
</template>

<script>
import { UsersApi } from '@/api';
import UUID from '@/mixins/uuid.mixin';

export default {
  mixins: [ UUID ],
  data: () => ({
    items: [],
    selected: [],//objects
    autocomplete: '',
  }),
  props: {
    value: {
      type: Array,
      required: true,
    }
  },
  computed: {
    computedItems(){
      let selectedVals = this.value.map(item => item.id);
      console.log('selectedVals',selectedVals);
      let items = this.items.map(item => {
        if(selectedVals.includes(item.id)){
          item.isSelected = true;
        }
        else{
          item.isSelected = false;
        }
        return item;
      });
      console.log('comp items', items);
      return items;
    }
  },
  methods: {
    getItems(){
      UsersApi.getPage({per_page: 100}).then(response => {
        console.log(response);
        this.items = response.data.data;
      })
    },
    toggleItem(item){
      this.selected.push(item);
      this.$emit('input', this.selected);
    },
    handleFilter(event){
      console.log(event.target.value);
    },
  },
  mounted(){
    this.getItems();
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/vars';

.u-autocomplete{
  font-size: 18px;
  font-weight: 300;
  &__list{
    max-height: 300px;
    overflow-y: scroll;
    box-shadow: 0px 12px 66px rgba(0, 0, 0, 0.15);
    background: #fff;
  }
  &__list-item{
    font-size: 18px;
    font-weight: 300;
    height: 78px;
    &:hover,
    &.is-active{
      background: rgba($clr-blue, .1);
      color: $clr-blue;
    }
  }
  &__label{
    font-size: 30px;
  }
  &__input{
    display: block;
    margin-bottom: 2px;
    border-bottom: 1px solid rgba(0,0,0, .2);
  }
  &__selections{
    display: flex;
    flex: 1 1;
    flex-wrap: wrap;
    align-items: center;
    max-width: 100%;
    min-width: 0;

    input{
      flex: 1 1;
      margin-top: 0;
      min-width: 0;
      pointer-events: none;
      position: relative;
      background-color: transparent;
      border-style: none;
      outline: none;
    }
  }
  &__chip{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 46px;
    font-size: 18px;
    border-radius: 23.5px;
    background-color: rgba($clr-blue, .2);
    color: $clr-blue;
  }
}
</style>