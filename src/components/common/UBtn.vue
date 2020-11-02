<script>
import UUID from '@/mixins/uuid.mixin.js';
import Loader from '@/components/Loader';

export default {
  mixins: [ UUID ],
  props: {
    size: {
      type: String,
      default: 'medium',
    },
    color: {
      type: String,
      default: 'primary',
    },
    block: {
      type: Boolean,
      default: false,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      default: '',
    },
    to: {
      type: [Object, String],
      default: null,
    },
    tag: {
      type: String,
      default: 'button',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    download: {
      type: Boolean,
      default: false,
    },
    blank: {
      type: Boolean,
      default: false,
    },
    width: {
      type: [ String, Number],
      default: null,
    }
  },
  computed: {
    classes(){
      return {
        'u-btn' : true,
        'u-btn_block' : this.block,
        'u-btn_outlined' : this.outlined,
        [ `u-btn_size_${this.size}` ] : true,
        [ `u-btn_color_${this.color}` ] : true,
      };
    },
    computedId(){
      return this.id ? this.id : this.uuid;
    },
    computedWidth(){
      return isNaN(parseFloat(this.width)) ? this.width : this.width + 'px';
    },
    isRoutable(){
      return !!this.to;
    },
  },
  methods: {
    changeRoute(){
      this.$router.push(this.to);
    },
  },
  render: function(createElement){

    let rootEl = this.tag;
    let eventHandlers = {};
    let style = {};

    if(this.isRoutable){
      eventHandlers.click = this.changeRoute;
    }

    if(this.width){
      style.width = this.computedWidth;
    }

    return createElement(
      rootEl,
      {
        class: this.classes,
        attrs: {
          id: this.computedId,
          href: this.href ? this.href : undefined,
          target: this.blank || this.download ? '_blank' : undefined,
          download: this.download ? '' : undefined,
        },
        style: style,
        on: Object.assign({}, this.$listeners, eventHandlers),
      },
      [
        this.$slots.default,
        createElement(Loader, {
          props: {
            show: this.loading
          }
        })
      ],
    );
  }
}
</script>

<style lang="scss">
@import "@/styles/vars";

.u-btn{
  font-weight: 500;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  border: none;
  outline: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  .ytt-loader{
    position: absolute;
    background-color: inherit;
    z-index: unset;
    &__text{
      font-size: 24px;
      color: white;
    }
    &__icon{
      width: 28px;
      height: 28px;
      fill: white;
      stroke: white;
      *{
        fill: white !important;
        stroke: white;

      }
    }
  }

  &_block{
    width: 100%;
  }

  &_disabled{
    opacity: .3;
  }

  &_theme-dark{
    color: #fff;
  }

  &_size_x-large{
    height: 70px;
    border-radius: 35px;
    padding-right: 50px;
    padding-left: 50px;
  }
  &_size_large{
    height: 55px;
    border-radius: 26.5px;
    padding-right: 50px;
    padding-left: 50px;
  }
  &_size_medium{
    height: 50px;
    border-radius: 26.5px;
    padding-right: 50px;
    padding-left: 50px;
  }
  &_size_small{
    height: 40px;
    border-radius: 26.5px;
    padding-right: 40px;
    padding-left: 40px;
  }

  &_color_blue{
    color: #fff;
    background-color: $clr-blue;
    &:hover{
      background-color: $clr-darker-blue;
    }
    &:active{
      background-color: $clr-dark-blue;
    }
  }

  &_color_primary{
    color: #fff;
    background-color: $clr-primary;
    &:hover{
      background-color: $clr-darker-primary;
    }
    &:active{
      background-color: $clr-dark-primary;
    }
  }

  &_color_red{
    color: #fff;
    background-color: $clr-red;
  }

  &_color_grey{
    color: #000;
    background-color: $clr-grey2;
  }

  &_outlined{
    background-color: transparent;
    border: 1px solid;
    border-color: initial;
    &.u-btn_color_primary{
      color: $clr-primary;
      &:hover{
        background-color: rgba($clr-primary, .06);
      }
      &:active{
        background-color: rgba($clr-primary, .17);
      }
    }

    &.u-btn_color_blue{
      color: $clr-blue;
      &:hover{
        background-color: rgba($clr-blue, .06);
      }
      &:active{
        background-color: rgba($clr-blue, .17);
      }
    }

    &.u-btn_color_grey{
      color: $clr-grey2;
      &:hover{
        background-color: rgba($clr-grey2, .06);
      }
      &:active{
        background-color: rgba($clr-grey2, .17);
      }
    }

  }
}
</style>
