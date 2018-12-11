<template>
    <div class="full" id="enlarge">
        <div class="transfrom_box">
            <div class="chart_tit">
                台区异常数据曲线图
                <span class="time_range">当前显示时间：2018-10-01—2018-10-16</span>
                <i @click='closeChart' class="close_icon"></i>
            </div>
            <div class="chart_box" v-if="showChart">
                <e-chart :option='cOption'></e-chart>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                cOption: '',
                showChart: false,
            }
        },
        props: ['pOption'],
        methods: {
            getWH() {
                let transfromBox = document.querySelector('.transfrom_box')
                let boxWidth = document.documentElement.clientWidth
                let boxHeight = document.documentElement.clientHeight
                transfromBox.style.height = boxWidth + 'px'
                transfromBox.style.width = boxHeight + 'px'
                transfromBox.style.top = (boxHeight - boxWidth) / 2 + 'px'
                transfromBox.style.left = 0 - (boxHeight - boxWidth) / 2 + 'px'
                transfromBox.style.transform = 'rotate(90deg)'
            },
            closeChart() {
                this.$emit('chartHide', false)
            }
        },
        created() {
        },
        watch: {
            pOption() {
                this.cOption = this.pOption
                this.cOption.title.textStyle.color = 'translate'
                this.cOption.grid.left = '10%'
                this.showChart = true
            }
        },
        mounted() {
            this.getWH()

        },
    }
</script>

<style scoped lang="scss">
    @import '@/style/mixin.scss';
    #enlarge {
        width: 100%;
        height: 100%;
        background: #161824
    }

    .transfrom_box {
        position: absolute;
        /* @include bg('../../images/common/bgpng.png') */
    }

    .chart_tit {
        padding: 0.6rem 0 0.6rem 0.6rem;
        background: #161824;
        color: #FF5B2E;
        font-size: 0.48rem;
        text-align: left;
        position: relative;
        ;
        z-index: 10000
    }

    .time_range {
        color: #999999;
        font-size: 0.32rem;
    }

    .close_icon {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        height: 0.58rem;
        width: 0.58rem;
        @include bg('../../images/common/close.png');
    }

    .chart_box {
        position: absolute;
        z-index: 100;
        top: 0;
        height: 10.80rem;
        width: 19.20rem;
    }
</style>