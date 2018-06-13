module.exports = {
    // 本地服务端口
    port: '8888',
    // 本地代理
    proxy: {
        '/api/*': {
            target: 'http://127.0.0.1:3000',
            secure: false
        }
    }
};