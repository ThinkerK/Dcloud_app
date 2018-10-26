<template>
    <div class="loading">
        <div class = "img_box">

        </div>
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
        
    },
}
</script>

<style scoped lang="scss">
.loading{
    position: absolute;
    width: 100%;
    height: 100%;
}
.img_box{
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width: 3rem;
    height: 3rem;
    margin: auto;
    background: url('../../images/common/loading2.gif') no-repeat;
    background-size: 100%;
    z-index:100000000000000000000000000;
}
</style>