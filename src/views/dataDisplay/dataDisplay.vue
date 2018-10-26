<template>
    <div class="repairrecord full">
        <head-top goBack="true">
            <div slot="head_search" class="filter-box">
                <date-filter @timeRange='timeRange'></date-filter>
            </div>
        </head-top>
        <div class="section flex_col_left">
            <div class="font-blue flex_between padding_tb bgf">
                <div class="flex1" @click="ldbVisible = true">{{quName}}
                    <i class="xl-blue"></i>
                </div>
            </div>
            <div class="dates-box">{{dateRange}}</div>
            <div class="scroll-box flex1" id="scrollbox"  style="background: #0d1019">
                <div id="scrollcon">
                    <div>
                        <div class="padding padding_tb gray bg_gray t_l">异常数据</div>
                        <div class='padding'>
                            <div class="con-list-sm padding padding_tb bg_gray b_radius">
                                <div class="ldb_wrap" ref="scrollabnormal">
                                    <ul class = 'ldb_box t_l'>
                                        <li class="ldb_tab" v-for = "(item,index) in ldbArr" :key="index" :class = "{active : nowIndex == index}" @click = tabClick(index,item)>
                                            {{item.ldbmc}}
                                        </li>
                                    </ul> 
                                </div>
                                <div class="padding_tb font-blue">台区异常数据占比图</div>
                                <div class="padding_tb"><div class="charts"></div></div>
                                <div class="padding_tb font-blue">异常总数：12341条</div>
                            </div>
                        </div>
                        <div class='padding'>
                            <div class="con-list-sm padding padding_tb bg_gray b_radius"  style="height: 5.73rem">
                                <h-chart :option="areaspline"></h-chart>
                            </div>
                        </div>
                        <div class='padding'>
                            <div class="con-list-sm padding padding_tb bg_gray b_radius" style="height: 7.88rem">
                                <h-chart :option="column"></h-chart>
                            </div>
                        </div>
                        
                    </div>
                    <div>
                        <div class="padding padding_tb gray bg_gray t_l" style = "margin-top: 0.3rem">修复数据</div>
                        <div class='padding'>
                            <div class="con-list-sm padding padding_tb bg_gray b_radius">
                                <div class="ldb_wrap" ref="scrollrepair">
                                    <ul class = 'ldb_box t_l'>
                                        <li class="ldb_tab" v-for = "(item,index) in ldbArr" :key="index" :class = "{active : nowIndex == index}" @click = tabClick(index,item)>
                                            {{item.ldbmc}}
                                        </li>
                                    </ul> 
                                </div>
                                <div class="flex_between">
                                    <div class="flex1">
                                        <div class="padding_tb font-blue">台区已修复数据占比图</div>
                                        <div class="padding_tb"><div class="repairCharts"></div></div>
                                    </div>
                                    <div class="flex1">
                                        <div class="padding_tb font_orgin">台区已修复数据占比图</div>
                                        <div class="padding_tb"><div class="repairCharts"></div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class='padding'>
                            <div class="con-list-sm padding padding_tb bg_gray b_radius" style="height: 7.88rem">
                                <h-chart :option="column2"></h-chart>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <mt-popup v-model="ldbVisible" position="bottom" class="mint-popup">
            <mt-picker :slots="ldbSlot" @change="onLdbChange" :showToolbar="true" valueKey = "xzqhmc" :visible-item-count="5" ref="ldbPicker">
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
import api from '../../service/data.js'
import { mapState,mapActions,mapGetters,mapMutations } from 'vuex'


export default {
    components: {
        headTop,
        dateFilter
    },
    data() {
        return {  
            quName:'',   //区名称
            dateRange:'',  //时间范围
            ldbVisible: false,  //台区显示隐藏
            statusVisible: false,  //状态显示隐藏
            ldbmc: '门头沟区',
            ldbSlot: [{
                flex: 1,
                values: ['门头沟区','海淀区'],
                className: 'slot1'
            }],
            xzqh:''  ,//行政区号
            nowIndex:0,
            ldbArr:[],
            areaspline:{
				chart:{
                    type: 'areaspline',
                    
				},
				xAxis: {
					categories:['周一','周二','周三','周四','周五','周六','周日'],
					lineColor: '#000'
				},
				yAxis:{
					gridLineWidth: 0,
					lineColor: '#000'
				},
				plotOptions:{
					series: {
						dataLabels: {
							enabled: true,
							borderRadius: 6,
							padding: 2,
							backgroundColor: '#ff5b2e',
							borderWidth: 0,
							y: -32,
							style:{
								fontSize: 12,
								fontWeight: 'none',
							}
						}
					},
					areaspline:{
						fillColor: {
							linearGradient: {
								x1: 0,
								y1: 0,
								x2: 0,
								y2: 1
							},
							stops: [
								[0, '#612e27'],
								[1, '#301f25']
							]
						}
					}
				},
				series: [{
					dataLabels: {
						color: '#fff',
					},
					color:'#ff5b2e',
					name: '异常数据',
					data: [231, 315, 316, 350, 458, 342, 209]
				}]
			},
			column:{
				chart:{
					type: 'column'
				},
				xAxis: {
					type: 'category',
					labels: {
						rotation: -45,  // 设置轴标签旋转角度
					},
					lineColor: '#000'					
				},
				yAxis:{
					gridLineWidth: 0,
					lineColor: '#000'
				},
				series: [{
					dataLabels: {
                        color: '#fc2d8a',
                        y: 0,
					},
					color:'#fc2d8a',
					name: '安装，实施人员',
					data: [
						['上海', 125],
						['卡拉奇', 150],
						['北京', 151],
						['德里', 178],
						['拉各斯', 106],
						['天津', 120],
						['伊斯坦布尔大旗网大旗网的', 116],
						['东京', 151],
						['广州', 108],
						['孟买', 144],
						['莫斯科', 119],
						['圣保罗', 103]
					]
				}]
			},
			column2:{
				chart:{
					type: 'column'
				},
				xAxis: {
					categories: ['苹果', '橘子', '梨', '葡萄', '香蕉'],
					lineColor: '#000'
				},
				yAxis: {
					stackLabels: {  // 堆叠数据标签
						enabled: true,
						style: {
							fontWeight: 'bold',
							color: '#fee578'
						}
					},
					gridLineWidth: 0,
					lineColor: '#000'
				},
				plotOptions: {
					series: {
						stacking: 'normal',
						dataLabels: {
							enabled: false,
						}
					},
				},
				series: [{
					name: '小张',
					data: [5, 3, 4, 7, 2],
					color: '#999999'
				}, {
					name: '小彭',
					data: [2, 2, 3, 2, 1],
					color: '#fee578'
				}]
			},
			
			type:'daterange',
	        pickerOptions2: {
	          shortcuts: [{
	            text: '最近一周',
	            onClick(picker) {
	              const end = new Date();
	              const start = new Date();
	              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
	              picker.$emit('pick', [start, end]);
	            }
	          }]
	        },
        }
    },
    computed:{
        ...mapGetters([ 'cityArr','cityIndex','quIndex','userInfo' ])
    },
    methods: {
        ...mapMutations([ 'SET_CITYINDEX','SET_QUINDEX','SET_QUNAME' ]),
        tabClick(index,item){
            this.nowIndex = index
        },
        Tolink(item,path){  //
            this.$router.push({
                path:'/'+path,
                name:path,
                query:item
            })
        },
        timeRange(val) {  //获取时间范围
            this.dateRange = val
        },
        onLdbChange() {  //台区选择
        },
        ldbConfirm() {   //台区选择确定事件
            this.ldbVisible = false
            let values = this.$refs.ldbPicker.getValues()
            let qIndex = this.cityArr[this.cityIndex].qu.indexOf(values[0])
            this.quName = values[0].xzqhmc.substring(0,3)
            this.xzqh = values[0].xzqh
            this.ldbArr = this.ldbArray.filter((item) => {return item.sjqhm == this.xzqh})
            this.SET_QUNAME(this.quName)
            this.SET_QUINDEX(qIndex)
            this.nowIndex = 0
        },
        aScroll(){
            let scrollL = this.$refs.scrollabnormal.scrollLeft 
            this.$refs.scrollrepair.scrollLeft = scrollL 
        },
        rScroll(){
            let scrollL = this.$refs.scrollrepair.scrollLeft
            this.$refs.scrollabnormal.scrollLeft = scrollL 
        },
        getAddress(){   //获取台区数据
            let _this = this
            this.cityId = this.$route.query.cityId;
            let cityLdb = {
                czrbh:this.userInfo.userId,
                city:this.cityId
            }
            api.getLdbList(cityLdb).then(function(res){
                _this.ldbArray = JSON.parse(res.ldb)
                _this.ldbArr = _this.ldbArray.filter((item) => {return item.sjqhm == _this.xzqh})
            })
        }
    },
    mounted(){
        this.ldbSlot[0].values = this.cityArr[this.cityIndex].qu
        this.ldbSlot[0].defaultIndex = this.quIndex
        this.quName=this.ldbSlot[0].values[this.quIndex].xzqhmc.substring(0,3)
        this.xzqh = this.cityArr[this.cityIndex].qu[this.quIndex].xzqh
        this.getAddress()
        this.$refs.scrollabnormal.addEventListener('scroll',this.aScroll)
        this.$refs.scrollrepair.addEventListener('scroll',this.rScroll)
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
    .gray{
        color: #cccccc
    }
    .b_radius{
        border-radius: 0.4rem;
    }
    .bg_gray{
        background: #161824
    }
    .t_l{
        text-align: left
    }
    .ldb_wrap{
        overflow-x: scroll;
        width: 100%;
    }
    .ldb_box{
        width: 1000rem;
    }
    .ldb_tab{
        float: left;
        padding: 0.12rem 0.3rem;
        color: white;
        border-radius: 40px;
    }
    .active{
        background:rgba(37,68,109,1);
    }
    .charts{
        @include wh(4.22rem,4.22rem)
        border-radius:50%;
        background:rgba(255,255,255,0.1);
        margin:auto;
    }
    .repairCharts{
        @include wh(3rem,3rem)
        border-radius:50%;
        background:rgba(255,255,255,0.1);
        margin:auto;
    }
</style>