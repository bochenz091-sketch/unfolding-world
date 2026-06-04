import { createReadStream, existsSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));
const host = '127.0.0.1';
const port = Number.parseInt(process.env.PORT ?? '4173', 10);

const types = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
]);

function resolvePath(requestUrl) {
  const url = new URL(requestUrl, `http://localhost:${port}`);
  const cleanPath = normalize(url.pathname === '/' ? '/index.html' : url.pathname);
  return join(root, cleanPath);
}

const server = createServer((request, response) => {
  const filePath = resolvePath(request.url ?? '/');

  if (!filePath.startsWith(root) || !existsSync(filePath)) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found');
    return;
  }

  response.writeHead(200, {
    'Content-Type': types.get(extname(filePath)) ?? 'application/octet-stream',
    'Cache-Control': 'no-store',
  });
  createReadStream(filePath).pipe(response);
});

server.listen(port, host, () => {
  console.log(`Unfolding World is running at http://${host}:${port}`);
});
