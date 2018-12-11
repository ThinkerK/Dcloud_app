<template>
    <div class="abnormaldata full">
        <head-top goBack="true">
            <div slot="head_search" class="filter-box">
                <date-filter @timeRange='timeRange'></date-filter>
            </div>
            <div slot="save" class="search-icon" @click = "iptFlag = !iptFlag;dgmc = ''"></div>
        </head-top>
        <div class="section flex_col_left">
            <div class="searchIpt form-ipt" :class = {iptActive:iptFlag}>
                <input type="search" v-model="dgmc" class = "search" placeholder="请输入灯杆名称" @blur = "onSearchKeyUp" @search = "onSearchKeyUp">
            </div>
            <div class="font-blue flex_between padding_tb bgf">
                <div class="flex1" @click="ldbVisible = true">{{ldbmc}}
                    <i class="xl-blue"></i>
                </div>
                <div class="flex1" @click="statusVisible = true">{{status}}
                    <i class="xl-blue"></i>
                </div>
            </div>
            <div class="dates-box">{{dateRange.show}}</div>
            <div class="scroll-box" style="flex: 1" id="scrollbox">
                <div id="scrollcon">
                    <div class="con-list-sm padding padding_tb" style="position:relative" v-for="(item,index) in abnormalArr" v-if="index<showIndex"
                        @click="Tolink(item,'abnormaldetails')">
                        <div class="flex_between flex1">
                            <div>灯杆号:{{item.dgmc}}</div>
                            <div>异常次数:{{item.yccs}}</div>
                        </div>
                        <div class="flex_between fontsm padding_t font-gray">所属台区/街道: {{item.ldbmc}}</div>
                        <div class="flex_between fontsm padding_t font-gray">异常信息: {{item.yclxShow}}</div>
                        <div class="flex_between fontsm padding_t font-gray">异常状态: {{item.xfbzShow}}</div>
                        <div class="flex_between fontsm padding_t font-gray">时间: {{item.fssj}}</div>
                        <div class="xfBtn" v-if="item.xfbz == 0" @click.stop="Tolink(item,'abnormalrepair')">修复</div>
                    </div>
                </div>
                <div class="con-list-sm padding padding_tb font-gray" v-if="abnormalArr.length == 0">没有任何数据</div>
            </div>
        </div>
        <mt-popup v-model="ldbVisible" position="bottom" class="mint-popup">
            <mt-picker :slots="ldbSlot" @change="onLdbChange" :showToolbar="true" :visible-item-count="5" valueKey="ldbmc" ref="ldbPicker">
                <div class="flex_between padding padding_tb">
                    <a class="btn-cancel" @click="ldbVisible = !ldbVisible">取消</a>
                    <a class="btn-sure" @click="ldbConfirm">确定</a>
                </div>
            </mt-picker>
        </mt-popup>
        <mt-popup v-model="statusVisible" position="bottom" class="mint-popup">
            <mt-picker :slots="statusSlot" @change="statusChange" :showToolbar="true" :visible-item-count="5" ref="statusPicker">
                <div class="flex_between padding padding_tb">
                    <a class="btn-cancel" @click="statusVisible = !statusVisible">取消</a>
                    <a class="btn-sure" @click="statusConfirm">确定</a>
                </div>
            </mt-picker>
        </mt-popup>
    </div>
</template>

<script>
    import headTop from '@/components/header/mainHeader'
    import dateFilter from '@/components/common/dateFilter'
    import api from '../../service/data.js'
    import { mapGetters } from 'vuex'

    export default {
        components: {
            headTop,
            dateFilter
        },
        data() {
            return {
                qu: '',//区
                dateRange: '',  //时间范围
                ldbVisible: false,  //台区显示隐藏
                statusVisible: false,  //状态显示隐藏
                ldbmc: '所有台区',
                ldbId: '',  //台区id
                dgmc: '', //灯杆名称
                xfbz: '', //修复状态
                status: '状态',
                cityId: '',   //城市id
                ldbArr: '', //台区数组
                ldbIndex: 0,  //初始台区
                ldbArray: '',
                abnormalArr: '',//一场数组
                ldbSlot: [{
                    flex: 1,
                    values: '',
                    className: 'slot1'
                }],
                statusSlot: [{
                    flex: 1,
                    values: ['状态', '已修复', '未修复'],
                    className: 'slot2'
                }],
                showIndex: 6, //懒加载个数
                iptFlag:false   //输入框显开关
            }
        },
        computed: {
            ...mapGetters(['userInfo', 'quIndex'])
        },
        methods: {
            Tolink(item, path) {
                this.$router.push({
                    path: '/' + path,
                    name: path,
                    query: {
                        ldbIndex: this.ldbIndex,
                        item: item,
                        dateRange: this.dateRange.hid,
                        userInfo: this.userInfo
                    }
                })
            },
            timeRange(val) {  //获取时间范围
                this.dateRange = val
                if (this.qu != '') {
                    this.queryAbnormalMsg()
                }

            },
            onScroll() {  //滚动
                let scrollbox = document.querySelector('#scrollbox')
                if (document.querySelector('#scrollcon').clientHeight < (document.querySelector('#scrollbox').clientHeight + scrollbox.scrollTop)) {
                    if (this.showIndex < this.abnormalArr.length) {
                        this.showIndex += 6
                    }
                }

            },
            onLdbChange() {  //台区选择
            },
            ldbConfirm() {   //台区选择确定事件
                this.ldbVisible = false
                let xzqh = this.qu[this.quIndex].xzqh
                let values = this.$refs.ldbPicker.getValues()
                this.ldbIndex = this.ldbArr.indexOf(values[0])
                this.ldbmc = values[0].ldbmc
                this.ldbId = values[0].ldbId
                this.queryAbnormalMsg()
            },
            statusChange() { //状态选择
            },
            statusConfirm() {   //状态选择确定事件
                this.statusVisible = false
                let values = this.$refs.statusPicker.getValues()
                this.status = values[0]
                if (this.status != '状态') {
                    this.xfbz = values[0] == '已修复' ? 1 : 0
                } else {
                    this.xfbz = ''
                }
                this.queryAbnormalMsg()
            },
            setAddress() {  //渲染picker
                let xzqh = this.qu[this.quIndex].xzqh
                let values = this.ldbArr.filter((item) => { return item.sjqhm == xzqh })
                values.unshift({ 'ldbmc': '所有台区', 'ldbId': '' })
                this.ldbArr = values
                this.ldbmc = values[this.ldbIndex].ldbmc
                this.ldbSlot[0].values = values
            },
            getAddress() {   //获取台区数据
                let _this = this
                this.cityId = this.$route.query.cityId;
                let cityLdb = {
                    czrbh: this.userInfo.userId,
                    city: this.cityId
                }
                api.getLdbList(cityLdb).then(function (res) {
                    _this.qu = JSON.parse(res.qu)
                    _this.ldbArr = JSON.parse(res.ldb)
                    _this.setAddress()
                    _this.queryAbnormalMsg()
                })
            },
            onSearchKeyUp(){  //搜索键按下
                this.queryAbnormalMsg()
            },
            queryAbnormalMsg() {
                let _this = this
                let data = {}
                data.kssj = this.dateRange.hid.start
                data.jssj = this.dateRange.hid.end
                data.dgmc = this.dgmc
                data.xfbz = this.xfbz
                data.ldbId = this.ldbId
                data.xzqh = this.qu[this.quIndex] ? this.qu[this.quIndex].xzqh : ''
                data.city = this.cityId
                api.queryAbnormalMsg(data).then(function (res) {
                    _this.abnormalArr = JSON.parse(res.data)
                })
            }
        },
        mounted() {
            this.getAddress()

            let scrollbox = document.querySelector('#scrollbox')  //监听滚动
            scrollbox.addEventListener('scroll', this.onScroll)
        }
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

    .xfBtn {
        position: absolute;
        color: white;
        bottom: 0.3rem;
        right: 0.3rem;
        border-radius: 0.5rem;
        @include wh(2.2rem, 0.88rem);
        line-height: 0.88rem;
        background: rgba(22, 154, 255, 1);
    }
    .searchIpt {
        width: 100%;
        height: 0;
        background: #169AFF;
        transition:all 0.5s;
        overflow: hidden;
    }
    .search {
        width: 100%;
        height: 0.84rem;
        border: 1px solid #169AFF;
        border-radius: 50rem;
    }
    .iptActive{
        height: auto;
        padding: 0.3rem
    }
</style>