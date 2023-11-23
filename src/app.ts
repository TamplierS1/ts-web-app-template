import http from "http";

const port = 8000;

http.createServer((request, response) => {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Hello, World!");
}).listen(port);

console.log(`Listening on port ${port}`);
