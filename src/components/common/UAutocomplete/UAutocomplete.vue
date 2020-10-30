<template>
  <div class="u-autocomplete">
    <label class="u-autocomplete__input" :for="'input-' + uuid">
      <div class="u-autocomplete__label">{{label}}</div>
      <div class="u-autocomplete__selections u-px-4 u-py-2">

        <template v-if="computedValue">
          <template v-if="multiple">
            <div 
              class="u-autocomplete__chip u-ma-1 u-px-11" 
              v-for="item in computedValue"
              :key="item.id"
            >
              {{item[itemText]}}
            </div>
          </template>
          <template v-else>
            <div 
              class="u-autocomplete__chip u-ma-1 u-px-11" 
            >
              {{computedValue[itemText]}}
            </div>
          </template>
        </template>
        

        <input 
          :id="'input-' + uuid"
          type="text" 
          v-model="autocomplete"
          @input="handleFilter"
          @keyup.delete="deleteLastItem"
        >
      </div>
    </label>
    <div class="u-autocomplete__list">
      <div
        class="u-autocomplete__list-item u-flex is-align-center u-px-12" 
        v-for="item in computedItems" 
        :key="item.id"
        @click="toggleItem(item)"
        :class="{ 'is-active' : item.isSelected }"
      >
        {{item[itemText]}}
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
    autocomplete: '',
  }),
  props: {
    value: {
      type: [Array, Object],
      default: null,
    },
    label: {
      type: String,
      default: '',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array,
      default: () => [],//objects
    },
    itemText: {
      type: String,
      default: 'name',
    }
  },
  computed: {
    computedItems(){
      let compItems = [];
      let selectedVals = [];

      if(this.value){
        if(this.multiple){
          selectedVals = this.value.map(item => item.id);
        }
        else{
          selectedVals.push(this.value.id);
        }
      }
      // console.log('selectedVals',selectedVals);

      compItems = this.items.map(item => {
        if(selectedVals.includes(item.id)){
          item.isSelected = true;
        }
        else{
          item.isSelected = false;
        }
        return item;
      });

      return compItems;
    },
    computedValue(){
      let computedValue = null;
      if(this.value){
        if(this.multiple){
          computedValue = this.value.map(item => {
            let resItem = this.computedItems.find(compItem => compItem.id === item.id);
            return resItem;
          });
        }
        else{
          computedValue = this.computedItems.find(compItem => compItem.id === this.value.id);
        }
      }
      
      return computedValue;
    }
  },
  methods: {
    
    toggleItem(item){
      //TODO: remove selection from item
      if(item.isSelected){
        
        if(this.multiple){

          console.log('Comp Value before ',this.computedValue);

          let removeIndex = this.computedValue.map(curItem => curItem.id).indexOf(item.id);
          console.log('removeIndex ', removeIndex);


          let resVal = [ ...this.computedValue ];
          resVal.splice(removeIndex, 1);
          console.log('resVal after ', resVal);

          this.$emit('input', resVal);
        }
        else{
          this.$emit('input', null);
        }
      }
      else{
        if(this.multiple){
          this.$emit('input', [ ...this.computedValue, item]);
        }
        else{
          this.$emit('input', item);
        }
      }
    },
    handleFilter(event){
      console.log(event.target.value);
    },
    deleteLastItem(){
      if(this.computedValue !== null){
        if(this.multiple){
          let resVal = [ ...this.computedValue ];
          resVal.pop();
          this.$emit('input',   resVal);
        }
        else{
          this.$emit('input', null);
        }
      }
    }
  },
  mounted(){
    
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
    cursor: pointer;
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