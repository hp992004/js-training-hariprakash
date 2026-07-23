const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const filePath = path.join(__dirname, 'data.json');

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  const users = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  res.setHeader('Content-Type', 'application/json');

  if (req.url === '/users') {
    res.writeHead(200);
    res.end(JSON.stringify(users));

  } else   if (req.url === '/health') {
    const totalMB = Math.round(os.totalmem() / 1024 / 1024);
    const freeMB = Math.round(os.freemem() / 1024 / 1024);
    res.writeHead(200);
    res.end(JSON.stringify({
    status: 'ok',
    platform: os.platform(),
    memory: {
      totalMB: totalMB,
      freeMB: freeMB
    },
    uptime: process.uptime()
  }));
  } 
  else if (req.url === '/users/top') {
    const topUsers = users.filter(user => user.score >= 90);
    res.writeHead(200);
    res.end(JSON.stringify(topUsers));

  } else if (req.url.startsWith('/users/')) {
    const id = parseInt(req.url.split('/')[2]);

    const user = users.find(user => user.id === id);

    if (user) {
      res.writeHead(200);
      res.end(JSON.stringify(user));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'User not found' }));
    }

  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Route not found' }));
  }
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});


/*
Health check endpoints help verify that a server is running properly.
Monitoring tools use them to check the server's status and detect problems quickly.
This makes it easier to know when a service is down or not responding.
*/