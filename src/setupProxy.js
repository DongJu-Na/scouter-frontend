const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  console.log(app);
  app.use(
    '/lol', // 불러오려는 server 의 api path
    createProxyMiddleware({
      target: process.env.REACT_APP_RIOT_API_URL, // server 주소를 넣어주면 된다.
      changeOrigin: true,
    })
  );
};