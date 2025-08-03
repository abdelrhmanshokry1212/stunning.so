const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ 
    message: 'Test server is running!',
    timestamp: new Date().toISOString(),
    url: req.url,
    method: req.method
  }));
});

const PORT = 3001;

server.listen(PORT, () => {
  console.log(`🚀 Test server running on http://localhost:${PORT}`);
  console.log(`📡 Ready to accept requests...`);
});

server.on('error', (error) => {
  console.error('❌ Server error:', error);
}); 