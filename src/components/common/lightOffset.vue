<template>
  <div class="light-offset con-list-sm padding">
    <light-cell :lfCon="title"></light-cell>
    <div class="padding_tb flex_between">
      <div class="start">
        <i class="time-icon"></i>
        <span>0 分钟</span>
      </div>
      <div class="range">
        <mt-range v-model="cOffset" :min="0" :max="60" :step="2" :bar-height="5"></mt-range>
      </div>
      <div class="end">
        <span>{{cOffset}}/60 分钟</span>
      </div>
    </div>
    <div class="radio-btn">
      <mt-radio v-model="cValue" :options="['提前', '滞后']"></mt-radio>
    </div>
  </div>
</template>

<script>
  import lightCell from './lightCell'
  export default {
    data() {
      return {
        cValue:this.ParentValue,   //单选按钮值
        cOffset:this.ParentOffset,  //range 值
      }
    },
    props: ['title','ParentValue','ParentOffset'],
    components: {
      lightCell
    },
    watch:{
      cValue(){
        this.$emit('getValue',this.cValue)
      },
      cOffset(){
        this.$emit('getOffset',this.cOffset)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '@/style/mixin.scss';
  .light-offset {
    color: #169AFF;
    .border {
      border: none;
    }
    .start span {
      font-size: 0.36rem;
    }
    .end span {
      font-size: 0.36rem;
    }
  }

  .range {
    flex: 1;
    padding: 0.23rem;
  }

  .time-icon {
    display: inline-block;
    @include wh(0.48rem, 0.48rem) @include bg('../../images/common/time.png') vertical-align: middle;
    margin-right: 0.2rem;
  }

  .radio-btn {
    width: 53%;
    margin: auto;
  }
</style>