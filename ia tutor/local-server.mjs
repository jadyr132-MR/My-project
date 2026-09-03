import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const chat = (await import(pathToFileURL(path.resolve("..", "api", "chat.js")).href)).default;
const tts = (await import(pathToFileURL(path.resolve("..", "api", "tts.js")).href)).default;
const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8"
};

const server = http.createServer(async (req, res) => {
  try {
    if (req.url === "/api/chat" || req.url === "/api/tts") {
      const chunks = [];
      for await (const chunk of req) chunks.push(chunk);
      const body = Buffer.concat(chunks);
      const request = new Request(`http://localhost${req.url}`, {
        method: req.method,
        headers: req.headers,
        body: req.method === "POST" ? body : undefined
      });
      const response = await (req.url === "/api/chat" ? chat : tts)(request);
      res.writeHead(response.status, Object.fromEntries(response.headers));
      res.end(Buffer.from(await response.arrayBuffer()));
      return;
    }

    const requestPath = decodeURIComponent((req.url || "/").split("?")[0]);
    const filePath = path.resolve(root, `.${requestPath === "/" ? "/speaking-tutor.html" : requestPath}`);
    if (!filePath.startsWith(root) || !fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }

    res.writeHead(200, { "Content-Type": mimeTypes[path.extname(filePath)] || "application/octet-stream" });
    fs.createReadStream(filePath).pipe(res);
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: error.message }));
  }
});

server.listen(5500, "127.0.0.1", () => {
  console.log("Node server running at http://localhost:5500");
});