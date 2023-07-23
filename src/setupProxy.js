const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  console.log("====proxy middleware=====")  

  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3001',
      changeOrigin: true,
    })
  );
};