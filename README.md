使用:
1) 安装node.js (下载地址: https://nodejs.org/en/)
2  npm切换到淘宝源 (淘宝镜像地址: https://npm.taobao.org/)
   npm config set registry https://registry.npm.taobao.org
   (可选安装cnpm)
   npm install -g cnpm --registry=https://registry.npm.taobao.org
3) 安装依赖包
   npm install
4) 两种开发模式
    npm run development 开发模式
    npm run production 生产模式