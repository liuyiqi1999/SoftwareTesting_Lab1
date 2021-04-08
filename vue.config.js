module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://10.176.122.174:8012',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}
