import mime from "mime";
import http from "http";
import { readFile } from "fs/promises";

const port = 8000;
const host = "localhost";

type Response = {
    code: 200 | 404 | 405;
    headers: {
        "content-type":
            | "text/plain"
            | "text/html"
            | "text/css"
            | "text/javascript"
            | string;
    };
    body: string;
};

/*  
    Takes a request and returns a response containing the requested file's contents.
    Returns appropriate 4XX responses if prerequisites are not satisfied 
    or errors are encountered.
    Unexpected errors on file reading are propagated to the caller by throwing.
*/
async function handleRequest(request: http.IncomingMessage): Promise<Response> {
    if (request.method != "GET") {
        return {
            code: 405,
            headers: { "content-type": "text/plain" },
            body: "Only GET method is allowed.",
        };
    }

    const url = new URL(request.url ?? "/", `http://${request.headers.host}`);
    let filename = url.pathname == "/" ? "/index.html" : url.pathname;

    let fileContent: string = "";
    try {
        fileContent = await readFile("dist/client" + filename, {
            encoding: "utf-8",
        });
    } catch (e: any) {
        if (e.code == "ENOENT") {
            return {
                code: 404,
                headers: { "content-type": "text/plain" },
                body: "Could not find the requested file.",
            };
        } else {
            console.log(`Unexpected error: ${e}`);
            throw e;
        }
    }

    return {
        code: 200,
        headers: { "content-type": mime.getType(filename) ?? "text/plain" },
        body: fileContent,
    };
}

http.createServer((request, response) => {
    handleRequest(request).then((value) => {
        response.writeHead(value.code, value.headers);
        response.end(value.body);
    });
}).listen(port);

console.log(`Listening on port ${port}`);
