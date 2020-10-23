<template>
  <div 
    class="u-text-field"
    :class="computedClasses"
  >
    <div class="u-text-field__input-wrap">
      <label :for="'input-' + uuid">{{label}}</label>
      <input 
        :id="'input-' + uuid"
        type="text" 
        :value="value" 
        :placeholder="placeholder"
        @input="onInput"
      >

      <div class="u-text-field__append-icon" v-if="appendIcon">
        <svg
          v-svg
          :symbol="appendIcon"
          size="0 0 20 20"
        ></svg>
      </div>
    </div>
    <div class="u-text-field__messages"></div>
  </div>
</template>

<script>
import UUID from '@/mixins/uuid.mixin.js';

export default {
  mixins: [ UUID ],
  props: {
    label: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    inset: {
      type: Boolean,
      default: false,
    },
    appendIcon: {
      type: String,
      default: '',
    }
  },
  computed: {
    computedClasses(){
      const classes = [];
      if(this.inset){
        classes.push('is-inset');
      }
      return classes;
    }
  },
  methods: {
    onInput(event){
      console.log(event);
      this.$emit('input', event.target.value);
    },
  },
}
</script>

<style lang="scss">
.u-text-field{
  max-width: 100%;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  position: relative;
  &__input-wrap{
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-wrap: wrap;
    min-width: 0;
    width: 100%;
    position: relative;
    &:before{
      content: '';
      border-color: rgba(0,0,0,.42);
      border-width: thin 0 0 0;
      border-style: solid;
      bottom: -1px;
      left: 0;
      position: absolute;
      transition: .3s cubic-bezier(.25,.8,.5,1);
      width: 100%;
    }
  }
  input{
    flex: 1 1 auto;
    line-height: 38px;
    padding: 8px 0 8px;
    max-width: 100%;
    min-width: 0;
    width: 100%;
    font-weight: 300;

    background-color: transparent;
    border-style: none;
    outline: none;
    &::placeholder{
      color: rgba(0,0,0,.2);
    }
  }
  label{
    font-size: 24px;
    color: #000;
    font-weight: 300;
  }
  &__messages{
    min-height: 14px;
    display: flex;
    flex: 1 0 auto;
    max-width: 100%;
    font-size: 12px;
  }

  &.is-inset{
    // TODO: padding-right 20px, padding-left: 20px;
  }
}
</style>