const handler = require('serve-handler');
const http = require('http');
 
const server = http.createServer((req, res) => 
  handler(req, res, {
    public: 'build'
  })
)

const PORT = process.env.PORT || 8000
server.listen(PORT, () => {
  console.log(`Server running on ${PORT} port.`);
});