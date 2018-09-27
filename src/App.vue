<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view  v-if="!$route.meta.keepAlive"></router-view>  
    <loading v-show = 'loadingSwitch'></loading>
  </div>
</template>

<script>
import { mapActions,mapGetters } from 'vuex'
import loading from './components/loading/loading'
export default {
  name: 'App',
  methods: {
    ...mapActions([ 'getCityArr' ])
  },
  computed:{
    ...mapGetters(['loadingSwitch'])
  },
  created() {
    let city1 = {
      czrbh:'0016FnI00005',
      city:1101
    }
    let city2 = {
      czrbh:'0016FnI00005',
      city:1201
    }
    this.getCityArr(city1),
    this.getCityArr(city2)
  },
  components:{
    loading
  }
}
</script>

<style lang="scss">
  @import './style/common.scss';
  @import './style/mintui-reset';
  #app{
    height: 100%;
    font-size:$title;
  }
</style>
