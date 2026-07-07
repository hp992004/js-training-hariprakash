const http = require('http')

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`)

  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('Hello from Node.js!')
})

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000')
})

/*
The req object contains the information sent by the client, such as the URL,
request method, and headers. The res object is used to send a response back
to the client, including the status code, headers, and the response data.
*/

/*
The req.method property contains the HTTP method used for the request,
such as GET or POST. The req.url property contains the requested URL
or path, such as "/" or "/about", helping the server identify which
resource the client wants to access.
*/