<template>
    <div class="page">
        <div class="page-remind">
            <div class="marquee_box">
                <!--<ul class="marquee_list" :class="{marquee_top:animate}">-->
                    <!--<li v-for="(item, index) in marqueeList" :key="index" v-html="item"></li>-->
                <!--</ul>-->
            </div>
        </div>
        <div class="page-block shop-info">
            <div class="shop-left">
                <div class="pull-left shop-avatar">
                </div>
                <div>
                    <a @click="">同步店铺信息</a>
                </div>
            </div>
            <div class="shop-right">
                <div class="pull-left">
                    <p>详情页数量</p>
                </div>
                <div class="line"></div>
                <div class="pull-left">
                    <p>商品数量</p>
                </div>
                <div class="line"></div>
                <div class="pull-left">
                    <p>图片数量</p>
                </div>
            </div>
        </div>
        <div class="flex-item">
            <div class="page-block page-block-item my-shop">
                <h3>
                </h3>
            </div>

            <div class="page-block page-block-item my-log">
                <h3>
                    操作日志
                    <router-link class="more" to="/main/personal/operationLog">更多</router-link>
                </h3>

            </div>
        </div>
        <div class="flex-item">
            <div class="page-block page-block-item my-news">
                <h3>新闻动态</h3>

            </div>
            <div class="page-block page-block-item my-help">
                <h3>帮助中心</h3>
                <div>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
    // import headDefault from 'src/images/head_default.png'
    // import {getInfoList, getStatistic, syncShopInfo, getDashboardLog} from 'src/api/index'

    export default {
        data() {
            return {
                // headDefault: headDefault,
                personalInfo: {},
                shops: [],
                brands: [],
                shopNum: '',
                brandNum: '',
                options: [{
                    value: 'day',
                    label: '最近1天'
                }, {
                    value: 'week',
                    label: '最近7天'
                }, {
                    value: 'month',
                    label: '最近30天'
                }, {
                    value: 'all',
                    label: '不限'
                }],
                dayTime: 'week',
                infoList: {
                    pdp: {},
                    spu: {},
                    pic: {}
                },
                shopStatistic: {
                    shopInfo: {}
                },
                logResult: [],
                marqueeList: ['<span style="color: #3366ff; font-weight: bold;">【喜大普奔】</span>1月10日PIM-Speedraw v1.5正式上线啦，首页工作台全新展示，快瞅瞅！',
                    '<span style="color: #3366ff; font-weight: bold;">注意！</span>天猫后台无线端详情页新工具【旺铺编辑】，会使PDP上传出错，请暂时不要切换。'],
                animate: false
            }
        },
        mounted() {
            // this.$ajaxAll([{
            //     ajax: getStatistic
            // }, {
            //     ajax: getDashboardLog
            // }, {
            //     ajax: getInfoList,
            //     params: {type: this.dayTime}
            // }]).then(([result1, result2, result3]) => {
            //     this.shopStatistic = result1;
            //     this.logResult = result2.docs;
            //     this.infoList = result3;
            // });
            setInterval(this.showMarquee, 5000);
        },
        computed: {
            //三位一逗
            formatCount() {
                return (number) => {
                    if (number === undefined) return 0;
                    let num = number.toString();
                    const reg = /(\d+)(\d{3})/;
                    while (reg.test(num)) {
                        num = num.replace(reg, '$1' + ',' + '$2');
                    }
                    return num;
                }
            }
        },
        methods: {
            shopChange() {
                // getInfoList({type: this.dayTime}).then(res => {
                //     this.infoList = res;
                // });
            },
            //同步店铺信息
            syncShopInfo() {
                // syncShopInfo().then(res => {
                //     this.$message({message: '同步成功', type: 'success'})
                // });
            },
            // 已完成切图
            pdpWithScreenshot() {
                this.$router.push({path: '/main/product/product/table', query: {type: 'pdpWithScreenshot', dateTime: this.dayTime}})
            },
            // 为切图详情页
            pdpWithoutScreenshot() {
                this.$router.push({path: '/main/product/product/table', query: {type: 'pdpWithoutScreenshot', dateTime: this.dayTime}})
            },
            // 切图失败
            pdpFailed() {
                this.$router.push({path: '/main/product/product/table', query: {type: 'pdpFailed', dateTime: this.dayTime}})
            },
            //已上架宝贝
            spuShelfed() {
                this.$router.push({path: '/main/grounding/grounding/table', query: {type: 'spuShelfed', dateTime: this.dayTime}})
            },
            //未上架宝贝
            spuUnshelfed() {
                this.$router.push({path: '/main/grounding/grounding/table', query: {type: 'spuUnshelfed', dateTime: this.dayTime}})
            },
            //上架失败宝贝
            spuShelfFailed() {
                this.$router.push({path: '/main/grounding/grounding/table', query: {type: 'spuShelfFailed', dateTime: this.dayTime}})
            },
            //滚动效果
            showMarquee: function () {
                this.animate = true;
                setTimeout(() => {
                    this.marqueeList.push(this.marqueeList[0]);
                    this.marqueeList.shift();
                    this.animate = false;
                }, 500);
            }
        }
    }
</script>
<style>
    .page-remind {
        background-color: #f5f5f5;
        padding: 16px 0;
    }

    .page-remind > div {
        background: #E9EFFF;
        border: 1px solid rgba(51, 102, 255, 0.20);
        width: 100%;
        height: 36px;
        line-height: 36px;
        font-size: 14px;
        color: #333333;
        letter-spacing: 0.44px;
        padding-left: 24px;
    }

    /* .page-remind > div > span {
        color: #3366FF;
        margin-right: 8px;
        font-weight: bold;
    } */
    /* 滚动效果 */
    .marquee_box {
        position: relative;
        overflow: hidden;
    }

    .marquee_list {
        position: absolute;
        top: 0;
        left: 0;
    }

    .marquee_list li {
        padding-left: 24px;
    }

    .marquee_top {
        transition: all 0.5s;
        margin-top: -36px
    }

    .shop-info {
        padding: 24px 0 24px 32px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 16px;
    }

    .shop-avatar {
        width: 74px;
        height: 74px;
        margin-right: 24px;
        border: 1px solid #D9D9D9;
    }

    .shop-avatar > img {
        width: 100%;
        height: 100%;
    }

    .shop-left {
        flex: 1;
    }

    .shop-left div:nth-child(2) {
        margin-top: 5px;
        margin-left: 98px;
    }

    .shop-left p {
        font-size: 22px;
        letter-spacing: 0.5px;
        line-height: 22px;
        margin-bottom: 16px;
    }

    .shop-left a {
        font-size: 12px;
        color: #666666;
        display: inline-block;
        width: 88px;
        line-height: 22px;
        text-align: center;
        border: 1px solid #D9D9D9;
        border-radius: 2px;
        cursor: pointer;
    }

    .shop-left a:hover {
        color: #3366FF;
        border-color: #3366FF;
    }

    .shop-left a:active {
        color: #2148D9;
        border-color: #2148D9;
    }

    .shop-left .fa-question-circle-o {
        color: #bfbfbf;
    }

    .shop-right {
        display: flex;
        align-items: center;
    }

    .shop-right > div {
        padding: 0 32px;
        text-align: center;
    }

    .shop-right > .line {
        padding: 0;
        height: 32px;
        border: 0.5px solid #e8e8e8;
        float: left;
    }

    .shop-right p:first-child {
        margin-bottom: 16px;
        color: #666666;
    }

    .shop-right p:last-child {
        font-size: 22px;
        color: #3366FF;
        letter-spacing: 0;
        line-height: 22px;
        cursor: pointer;
    }

    .shop-right p:last-child:hover {
        color: #2148D9;
    }

    .shop-right p:last-child:active {
        color: #122FB3;
    }

    .flex-item {
        display: flex;
        justify-content: space-between;
    }

    .page-block-item.my-shop, .page-block-item.my-news {
        width: 67%;
    }

    .page-block-item.my-log, .page-block-item.my-help {
        width: 33%;
    }

    .page-block-item {
        padding: 0;
    }

    .page-block-item + .page-block-item {
        margin-left: 16px;
    }

    .page-block-item h3 {
        padding: 0 32px;
        height: 55px;
        font-size: 16px;
        letter-spacing: 0;
        line-height: 55px;
        border-bottom: 1px solid #eee;
    }

    .page-block-item .el-select {
        float: right;
        width: 105px;
    }

    .page-block-item .el-select .el-input__inner {
        border: 0;
    }

    .my-shop ul {
        padding: 30px 32px 40px 32px;
    }

    .my-shop ul li h4 {
        margin-bottom: 20px;
    }

    .my-shop ul li {
        margin-bottom: 28px;
    }

    .my-shop ul li:last-child {
        margin-bottom: 0;
    }

    .my-shop ul li span:first-child {
        color: #666;
        display: inline-block;
        width: 95px;
    }

    .my-shop ul li span:last-child {
        color: #3366FF;
        cursor: pointer;
    }

    .my-shop ul li span:last-child:hover {
        color: #2148D9;
    }

    .my-shop ul li span:last-child:active {
        color: #122FB3;
    }

    .my-shop ul li span.noData {
        color: #333;
        cursor: auto;
    }

    .my-shop ul li span.noData:hover, .my-shop ul li span.noData:active {
        color: #333;
    }

    .my-log a {
        float: right;
        font-size: 14px;
        color: #3366FF;
        letter-spacing: 0;
        text-align: right;
        line-height: 55px;
        font-weight: normal;
    }

    .my-log ul, .my-news ul {
        padding: 20px 32px 24px 32px;
    }

    .my-log ul li p, .my-news ul li p {
        line-height: 22px;
    }

    .my-log ul li p:first-child {
        margin-bottom: 4px;
    }

    .my-news ul li p:first-child {
        margin-bottom: 10px;
    }

    .my-log ul li:not(:last-child), .my-news ul li:not(:last-child) {
        margin-bottom: 20px;
    }

    .my-log ul li p:nth-of-type(2), .my-news ul li p:nth-of-type(2) {
        font-size: 12px;
        color: #999999;
        letter-spacing: 0;
        line-height: 12px;
    }

    .my-news ul li {
        display: flex;
        justify-content: space-between;
    }

    .my-shop, .my-log {
        margin-bottom: 0;
    }

    .flex-item + .flex-item {
        margin-top: 16px;
    }

    .my-help > div {
        padding: 24px 32px 31px 32px;
    }

    .my-help > div ul > li {
        line-height: 14px;
        margin-bottom: 24px;
        color: #3366ff;
        cursor: pointer;
    }

    .my-help > div > div {
        background-color: #fafafa;
        padding: 24px;
    }

    .my-help > div > div p {
        margin-bottom: 8px;
    }

    .my-help > div > div p:nth-child(3) {
        margin-top: 24px;
    }
</style>