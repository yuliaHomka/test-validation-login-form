const http = require("http");
var url = require("url");

allowedLogins = ['admin', 'dev', 'user', '123'];

const VALIDATION_PATH_NAME = '/validate';
const QUERY_LOGIN = 'login';

const server =  http.createServer(function(request, response){
    const headers = {
        'Access-Control-Allow-Origin': '*',
      };
      const parsedUrl = url.parse(request.url, true);
      if(request.method === 'GET') {
        if(parsedUrl.pathname === VALIDATION_PATH_NAME && Object.keys(parsedUrl.query).includes(QUERY_LOGIN)) {
          setTimeout(() => {
            response.writeHead(200, headers);
            response.end(JSON.stringify({ valid: allowedLogins.includes(parsedUrl.query[QUERY_LOGIN]) }));
          }, 1000);
        }
      }
});
server.listen(3000, function(){ console.log("Mock API server is running... http://localhost:3000")});
