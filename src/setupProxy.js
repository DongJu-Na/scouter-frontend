const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/kr',
    createProxyMiddleware({
      target: 'https://kr.api.riotgames.com',
      changeOrigin: true,
      secure : false,
      pathRewrite: {
        '^/kr': ''
      },
    })
  );

  app.use(
    '/asia',
    createProxyMiddleware({
      target: 'https://asia.api.riotgames.com',
      changeOrigin: true,
      secure : false,
      pathRewrite: {
        '^/asia': ''
      },
    })
  );

  app.use(
    '/api',
    createProxyMiddleware({
      target: process.env.REACT_APP_BACK_END_SERVER,
      changeOrigin: true,
      secure : false,

      
    })
  );
  
  app.use(function (err, req, res, next) {
    console.error('Got an error!', err);
    console.error('error Req',req)
    res.end();
  });

  
};