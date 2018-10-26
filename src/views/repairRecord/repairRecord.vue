<template>
    <div class="repairrecord full">
        <head-top goBack="true">
            <div slot="head_search" class="filter-box">
                <date-filter @timeRange='timeRange'></date-filter>
            </div>
            <div slot="save" class="search-icon"></div>
        </head-top>
        <div class="section flex_col_left">
            <div class="font-blue flex_between padding_tb bgf">
                <div class="flex1" @click="ldbVisible = true">{{ldbmc}}
                    <i class="xl-blue"></i>
                </div>
            </div>
            <div class="dates-box">{{dateRange}}</div>
            <div class="scroll-box" style="flex: 1" id="scrollbox">
                <div id="scrollcon">
                    <div class="con-list-sm padding padding_tb" style="position:relative" v-for="(item,index) in repairArr">
                        <div class="flex_between flex1">
                            <div>灯杆号:{{item.dgmc}}</div>
                            <div>修复人员:{{item.xfry}}</div>
                        </div>
                        <div class="flex_between fontsm padding_t font-gray">所属台区/街道: {{item.ldbmc}}</div>
                        <div class="flex_between fontsm padding_t font-gray">异常信息: {{item.ycxx}}</div>
                        <div class="flex_between fontsm padding_t font-gray">修复时间: {{item.xfsj}}</div>
                        <div class="flex_between fontsm padding_t font-gray">备注: {{item.remarks}}</div>
                    </div>
                </div>
                <div class="con-list-sm padding padding_tb font-gray" v-if ="repairArr.length == 0">没有任何数据</div>
            </div>
        </div>
        <mt-popup v-model="ldbVisible" position="bottom" class="mint-popup">
            <mt-picker :slots="ldbSlot" @change="onLdbChange" :showToolbar="true" valueKey = 'ldbmc' :visible-item-count="5" ref="ldbPicker">
                <div class="flex_between padding padding_tb">
                    <a class="btn-cancel" @click="ldbVisible = !ldbVisible">取消</a>
                    <a class="btn-sure" @click="ldbConfirm">确定</a>
                </div>
            </mt-picker>
        </mt-popup>
    </div>
</template>

<script>
import headTop from '@/components/header/mainHeader'
import dateFilter from '@/components/common/dateFilter'
import { mapGetters } from 'vuex'
import api from '../../service/data.js'

export default {
    components: {
        headTop,
        dateFilter
    },
    data() {
        return {
            qu:'',//区
            dateRange:'',  //时间范围
            ldbVisible: false,  //台区显示隐藏
            statusVisible: false,  //状态显示隐藏
            ldbmc: '所有台区',
            status: '状态',
            cityId:'',   //城市id
            ldbArr:'', //台区数组
            ldbIndex:0,  //初始台区
            repairArr:[{'dgmc':'石担路1002',
                          'yccs':15,
                          'ldbmc':'冰河世纪',
                          'ycxx':'功率异常',
                          'xfsj':'2018-10-10 19:23:22',
                          'yczt':'未修复',
                          'xfry':'王某某',
                          'remarks':'灯杆上照明设备损坏，进行更换处理'
                        },
                        {'dgmc':'石担路1002',
                          'yccs':15,
                          'ldbmc':'冰河世纪',
                          'ycxx':'功率异常',
                          'xfsj':'2018-10-10 19:23:22',
                          'yczt':'未修复',
                          'xfry':'王某某',
                          'remarks':'灯杆上照明设备损坏，进行更换处理'
                        }],  //一场数组
            ldbSlot: [{
                flex: 1,
                values: ['所有台区','四海汽车'],
                className: 'slot1'
            }],
        }
    },
    computed:{
        ...mapGetters([ 'userInfo','quIndex' ])
    },
    methods: {
        Tolink(item,path){
            this.$router.push({
                path:'/'+path,
                name:path,
                query:{
                    ldbIndex:this.ldbIndex,
                    item:item
                }
            })
        },
        timeRange(val) {  //获取时间范围
            this.dateRange = val
        },
        onLdbChange() {  //台区选择
        },
        ldbConfirm() {   //台区选择确定事件
            this.ldbVisible = false
            let xzqh = this.qu[this.quIndex].xzqh
            let values = this.$refs.ldbPicker.getValues()
            this.ldbIndex = this.ldbArr.indexOf(values[0])
            this.ldbmc = values[0].ldbmc
        },

        setAddress(){  //渲染picker
            let xzqh = this.qu[this.quIndex].xzqh
            let values = this.ldbArr.filter((item) => {return item.sjqhm == xzqh})
            values.unshift({'ldbmc':'所有台区'})
            this.ldbArr = values
            this.ldbmc = values[this.ldbIndex].ldbmc
            this.ldbSlot[0].values = values
        },
        getAddress(){   //获取台区数据
            let _this = this
            this.cityId = this.$route.query.cityId;
            let cityLdb = {
                czrbh:this.userInfo.userId,
                city:this.cityId
            }
            api.getLdbList(cityLdb).then(function(res){
                _this.qu = JSON.parse(res.qu)
                _this.ldbArr = JSON.parse(res.ldb)
                _this.setAddress()
            })
        }
    },
    mounted() {
        this.getAddress()
    },
}
</script>

<style scoped lang="scss">
    @import '@/style/mixin.scss';
    .filter-box {
        @include wh(100%, 100%)
    }

    .search-icon {
        position: absolute;
        right: 0.3rem;
        @include wh(0.56rem, 0.58rem) @include bg('../../images/common/sousuo.png')
    }

    .xl-blue {
        display: inline-block;
        margin-left: 0.11rem;
        margin-bottom: 0.05rem;
        @include wh(0.36rem, 0.2rem) @include bg('../../images/common/downblue.png')
    }
    .xfBtn{
        position:absolute;
        color: white;
        bottom: 0.3rem;
        right: 0.3rem;
        border-radius: 0.5rem;
        @include wh(2.2rem,0.88rem);
        line-height:0.88rem;
        background:rgba(22,154,255,1);
    }
</style>