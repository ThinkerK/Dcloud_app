<template>
    <div class="full" id="enlarge">
        <div class="transfrom_box">
            <div class="chart_tit">
                {{title}}
                <span class="time_range">当前显示时间：{{timeRange}}</span>
                <i @click='closeChart' class="close_icon"></i>
            </div>
            <div class="chart_box">
                <e-chart :option='cOption' v-if="showChart"></e-chart>
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
                title: '',
                timeRange: '',
            }
        },
        methods: {
            getWH() {
                let transfromBox = document.querySelector('.transfrom_box')
                let canvasBox = document.querySelector('.chart_box')
                let boxWidth = document.documentElement.clientWidth
                let boxHeight = document.documentElement.clientHeight
                transfromBox.style.height = boxWidth + 'px'
                transfromBox.style.width = boxHeight + 'px'
                canvasBox.style.width = boxHeight + 'px'
                canvasBox.style.height = boxWidth + 'px'
                transfromBox.style.top = (boxHeight - boxWidth) / 2 + 'px'
                transfromBox.style.left = 0 - (boxHeight - boxWidth) / 2 + 'px'
                transfromBox.style.transform = 'rotate(90deg)'
            },
            closeChart() {
                this.$router.go(-1)
            },
            ////////////////////////////////////////////////////////////////////////////////////////////////////
            // 1、touch 事件转换为 mouse 事件
            touchEventToMouseEvent(event, eventType) {
                console.log(event)
                if (!event.originalEvent || !event.originalEvent.targetTouches || event.originalEvent.targetTouches.length != 1)
                    return false;
                    event.touches[0]
                    event.targetTouches[0]
                var te = event.originalEvent.targetTouches[0];
                var clientX = te.clientX, clientY = te.clientY, screenX = te.screenX, screenY = te.screenY;

                var simEvent = new MouseEvent(eventType, {
                    clientX: clientX,
                    clientY: clientY,
                    screenX: screenX,
                    screenY: screenY,
                    button: 0,
                    buttons: 0
                });
                return simEvent;
            },

            findElm(targetElement) {
                let _this = this
                targetElement.addEventListener('touchstart', function (e) {
                    console.log('touchstart');
                    console.log(e);
                    var simEvent = _this.touchEventToMouseEvent(e, 'mousedown');
                    console.log("----------------------------------------------------------------"+simEvent)
                    if (simEvent != null) {
                        targetElement.dispatchEvent(simEvent);
                    }
                });

                targetElement.addEventListener('touchmove', function (e) {
                    e.preventDefault();
                    console.log('touchmove');
                    var simEvent = _this.touchEventToMouseEvent(e, 'mousemove');
                    if (simEvent != null) {
                        targetElement.dispatchEvent(simEvent);
                    }
                });

                targetElement.addEventListener('touchend', function (e) {
                    console.log('touchend');
                    console.log(e);
                    var simEvent = _this.touchEventToMouseEvent(e, 'mouseup');
                    if (simEvent != null) {
                        targetElement.dispatchEvent(simEvent);
                    }
                });
            }

            ////////////////////////////////////////////////////////////////////////////////////////////////////
        },
        created() {
        },
        watch: {
            cOption() {
                this.cOption.title.textStyle.color = 'translate'
                this.cOption.grid.left = '10%'
                this.cOption.grid.right = "10%"
                this.cOption.dataZoom = [{
                    type: 'inside',
                    throttle: '0',
                    startValue: 0,
                    endValue: 20,
                }],
                    this.showChart = true
            }
        },
        mounted() {
            this.getWH()
            // this.findElm(document.querySelector('#enlarge'))
            this.cOption = this.$route.query.pOption
            this.title = this.cOption.title.text
            this.timeRange = this.$route.query.timeRange
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
        z-index: 10000
    }

    .time_range {
        color: #999999;
        font-size: 0.32rem;
        padding-left: 0.5rem
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
        width: 18rem;
    }
</style>