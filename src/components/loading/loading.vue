<template>
    <div class="loading">
        
    </div>  
</template>

<script>
import { Indicator } from 'mint-ui'
export default {
    data() {
        return {
        }
    },
    created() {
        Indicator.open('Loading...');
    },
}
</script>

<style scoped lang="scss">
.loading{
    position:absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 20000;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.2)
}
</style>