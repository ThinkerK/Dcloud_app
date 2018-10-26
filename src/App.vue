<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" class="Router"></router-view>
    </keep-alive>
    <!-- <transition :name="transitionName">    -->
      <router-view v-if="!$route.meta.keepAlive" class="Router"></router-view>
    <!-- </transition> -->
  </div>
</template>

<script>
import { mapActions,mapGetters } from 'vuex'
export default {
  name: 'App',
  data(){
      return {
          transitionName:'slide-right'
      }
  },
  methods: {
  },
  computed:{
  },
  created() {
  },
  components:{
  },
  watch: {
    $route(to, from) {
      if(to.meta.index > from.meta.index){
        this.transitionName = 'slide-left';
      }else{
        this.transitionName = 'slide-right';
      }
    }
  }
}
</script>

<style lang="scss">
  @import './style/common.scss';
  @import './style/mintui-reset';
  #app{
    width: 100%;
    height: 100%;
    font-size:$title;
  }
  .Router {
     width: 100%;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 250ms ease-in-out;
  position: absolute;
}
.slide-right-enter {
  /* opacity: 0; */
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  /* opacity: 0; */
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  /* opacity: 0; */
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  /* opacity: 0; */
  transform: translate3d(-100%, 0, 0);
}
</style>
