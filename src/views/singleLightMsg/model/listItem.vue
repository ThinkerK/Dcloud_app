<template>
<div class="list-item">
    <div class="con-list-sm padding padding_tb flex_between" v-for="(item,index) in poleArr[0]" @click="goDeviceMsg(item.poleId)">
        <div class='con-left check checkAll' v-if = "selectFlag">
            <mt-checklist v-model="checkedArr" :options="[index]"></mt-checklist>
        </div>
        <div class="con-middle">
            <div class="flex_between">
                <div>{{item.name}}</div>
                <div>灯杆号：{{item.poleId}}</div>
            </div>
            <div class="flex_between fontsm padding_tb font-gray">灯杆管理器地址：{{item.dgglq}} </div>
            <div class="flex_between fontsm font-gray">用电管理器地址：{{item.ydglq}} </div>
        </div>
        <div class="con-right" :class="item.state == 1?'font-blue':'font-gray'">{{item.state == 1?'有效':'无效'}}</div>
    </div>
</div>
</template>

<script>
import { Checklist } from 'mint-ui'
export default {
    data() {
        return {
            checkedArr:[]
        }
    },
    props:['poleArr','selectFlag','class'],
    methods:{
        goDeviceMsg(index){
            if(this.selectFlag){
                
            }else{
                this.$router.push({
                    path:'/deviecmsg',
                    name:'devicemsg',
                    query: { 
                    }
                })
            }
            
        }
    },
    mounted() {
    },
}
</script>

<style scoped lang="scss">
.con-middle{
    flex: 1;
}
.con-right{
    padding-left: 0.2rem;
}

</style>