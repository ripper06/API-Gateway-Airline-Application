const express = require('express');
const rateLimit = require('express-rate-limit');
const { createProxyMiddleware } = require('http-proxy-middleware');

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');

const app = express();

const limiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 2 minutes
  limit: 10 ,
  message: 'Too many requests, please try again later.',
});

// 🟢 Apply rate limiter
app.use( limiter);

// 🟢 Proxy middlewares FIRST — before body parsing
app.use('/flightsService', createProxyMiddleware({
  target: ServerConfig.FLIGHT_SERVICE,
  changeOrigin: true,
  pathRewrite: {
    '^/flightsService': '/',
  },
  onError(err, req, res) {
    console.error('Proxy error:', err.message);
    if (!res.headersSent) {
      res.status(500).json({ message: 'Proxy error' });
    }
  },
}));

app.use('/bookingService', createProxyMiddleware({
  target: ServerConfig.BOOKING_SERVICE,
  changeOrigin: true,
  pathRewrite: {
    '^/bookingService': '/',
  },
  onError(err, req, res) {
    console.error('Proxy error:', err.message);
    if (!res.headersSent) {
      res.status(500).json({ message: 'Proxy error' });
    }
  },
}));

// 🟢 Then use JSON and URL Encoded middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

// Start server
app.listen(ServerConfig.PORT, () => {
  console.log(`✅ Server started on port: ${ServerConfig.PORT}`);
});
