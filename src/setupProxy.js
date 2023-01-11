const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://1.234.189.11:8080',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '' // URL ^/api -> 공백 변경
        }
    })
  );
};