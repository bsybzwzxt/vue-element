<template>
    <section class="prtscn">
        <div class="screen-shot flex">
            <div class="img" :class="data.id ? '' : 'border'"><img v-if="data.id"
                    :src="'http://10.8.108.115:3000/static/images/'+data.id+'-1-1.png'" alt="预览图片"/></div>
            <div style="flex: 1">
                <h5>基本信息&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;PRODUCT FILE</h5>
                <div class="info">
                    <p>货号：{{data.info['货号'] || ''}}</p>
                    <p>吊牌价：¥{{data.info['吊牌价'] || ''}}</p>
                    <p>产品名称：{{data.info['产品名称'] || ''}}</p>
                    <p>产地：{{data.info['产地'] || ''}}</p>
                    <p>系列：{{data.info['系列'] || ''}}</p>
                    <p>面料：{{data.info['面料'] || ''}}</p>
                    <p>洗涤：{{data.info['洗涤'] || ''}}</p>
                </div>
                <h5>商品指数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;COMMODITY INDEX</h5>
                <div :class="data.id ? '' : 'border'"><img v-if="data.id"
                        :src="'http://10.8.108.115:3000/static/images/'+data.id+'-1-2.png'" alt="图片"/></div>
            </div>
        </div>
        <div class="screen-shot">
            <div>
                <h4 class="sub-title">尺码表&nbsp;&nbsp;&nbsp;SIZE TABLE</h4>
                <div><img src="src/image/line.jpg"/></div>
            </div>
            <table>
                <tr v-for="item in data.size">
                    <td v-if="item.length > 0" v-for="s in item">{{s}}</td>
                </tr>
            </table>
            <p>注：抽样测量可能存在1-2CM误差，请购买时确认尺码</p>
            <p><span class="red">温馨提示：</span>尺码表仅针对次品类，结合个人情况仅供参考，也可联系在线客服做相关咨询！</p>
        </div>
        <div class="screen-shot">
            <div>
                <h4 class="sub-title">模特展示&nbsp;&nbsp;&nbsp;MODEL SHOWS</h4>
                <div><img src="src/image/line.jpg"/></div>
            </div>
            <div v-if="data.id"><img :src="'http://10.8.108.115:3000/static/images/'+data.id+'-2-1.png'"/></div>
            <div v-if="data.id"><img :src="'http://10.8.108.115:3000/static/images/'+data.id+'-2-2.png'"/></div>
            <div v-if="data.id"><img :src="'http://10.8.108.115:3000/static/images/'+data.id+'-2-3.png'"/></div>
        </div>
        <div class="screen-shot">
            <div>
                <h4 class="sub-title">颜色展示&nbsp;&nbsp;&nbsp;COLOR DISPLAY</h4>
                <div><img src="src/image/line.jpg"/></div>
            </div>
            <div v-if="data.id"><img :src="'http://10.8.108.115:3000/static/images/'+data.id+'-3-1.png'"/></div>
        </div>
        <div class="screen-shot">
            <div>
                <h4 class="sub-title">平铺展示&nbsp;&nbsp;&nbsp;LAYDOWN VIEWS</h4>
                <div><img src="src/image/line.jpg"/></div>
            </div>
            <div v-if="data.id"><img :src="'http://10.8.108.115:3000/static/images/'+data.id+'-4-1.png'"/></div>
            <div v-if="data.id"><img :src="'http://10.8.108.115:3000/static/images/'+data.id+'-4-2.png'"/></div>
            <p>*因拍摄过程中由于灯光、照相机等器材原因，可能造成图片和产品实际颜色存在细微差异，颜色以实物为准！</p>
        </div>
        <div class="screen-shot">
            <div>
                <h4 class="sub-title">细节展示&nbsp;&nbsp;&nbsp;PRODUCT DETAILS</h4>
                <div><img src="src/image/line.jpg"/></div>
            </div>
            <div v-if="data.id"><img :src="'http://10.8.108.115:3000/static/images/'+data.id+'-5-1.png'"/></div>
            <div v-if="data.id"><img :src="'http://10.8.108.115:3000/static/images/'+data.id+'-5-2.png'"/></div>
            <div v-if="data.id"><img :src="'http://10.8.108.115:3000/static/images/'+data.id+'-5-3.png'"/></div>
        </div>
        <div class="screen-shot">
            <div>
                <h4 class="sub-title">洗涤吊牌展示&nbsp;&nbsp;&nbsp;TAGS</h4>
                <div><img src="src/image/line.jpg"/></div>
            </div>
            <div v-if="data.id"><img :src="'http://10.8.108.115:3000/static/images/'+data.id+'-6-1.png'"/></div>
        </div>
    </section>
</template>
<script>
    export default {
        data() {
            return {}
        },
        props: {
            data: {
                type: Object,
                default: () => {
                    return {id: '', info: {}, size: []}
                }
            }
        },
        watch: {
            data: {
                immediate: true,
                handler(value) {
                    console.log(value)
                }
            }
        },
        methods: {}
    }
</script>
<style>
    .prtscn > div {
        margin-bottom: 20px;
    }

    section {
        width: 750px;
        margin: 0 auto;
    }

    .red {
        color: #861459;
    }

    .sub-title {
        font-size: 16px;
        text-indent: 2em;
        margin: 10px auto;
    }

    .img {
        width: 353px;
    }

    .img img {
        width: 100%;
    }

    .border {
        border: 1px solid #c1c1c1;
    }

    h5 {
        margin: 0 auto 10px;
        padding-bottom: 8px;
        font-size: 14px;
        font-weight: normal;
        color: #010101;
        border-bottom: 1px solid #000;
    }

    p {
        margin: 0 0 5px;
        line-height: 150%;
        font-size: 14px;
        color: #6b6e75;
    }

    .info {
        margin-bottom: 10px;
    }

    table {
        margin: 20px auto;
        width: 100%;
        font-size: 12px;
        text-align: center;
        border-collapse: collapse;
        background-color: #f2f2f2;
        table-layout: fixed;
    }

    td {
        padding: 5px;
        border: 1px solid #ffffff;
    }

    table tr td:first-child {
        width: 200px;
    }
</style>