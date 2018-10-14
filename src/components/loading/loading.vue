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

}
</style>