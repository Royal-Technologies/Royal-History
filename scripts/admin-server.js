/**
 * Royal History — Localhost Admin Server
 * Brand: Royal History — ইতিহাসের এই দিনে
 * Credits: Royal Technologies (https://www.royaltechbd.com/)
 * 
 * Runs STRICTLY on localhost (127.0.0.1:3400)
 */
'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { exec } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const db = require('./db');

const PORT = process.env.PORT || 3400;
const HOST = '127.0.0.1'; // Strictly localhost only

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ttf': 'font/ttf',
  '.svg': 'image/svg+xml'
};

// Ensure database is initialized
db.initDatabase();

const server = http.createServer((req, res) => {
  // Security Check: Only allow local machine
  const clientIp = req.socket.remoteAddress;
  if (clientIp !== '127.0.0.1' && clientIp !== '::1' && clientIp !== '::ffff:127.0.0.1') {
    res.writeHead(403, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ error: 'Access denied. Admin server is strictly localhost only.' }));
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // ── API: Get All Items ──
  if (req.method === 'GET' && pathname === '/api/items') {
    const items = db.getAllItems();
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(items));
    return;
  }

  // ── API: Add or Update Item ──
  if (req.method === 'POST' && pathname === '/api/items') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const item = JSON.parse(body);
        if (!item.title || !item.event_year || !item.category) {
          res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ error: 'শিরোনাম, সাল ও ক্যাটাগরি আবশ্যক।' }));
          return;
        }

        const uid = db.insertItem(item);
        res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: true, uid: uid, message: 'ঐতিহাসিক ঘটনা সফলভাবে সংরক্ষিত হয়েছে।' }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // ── API: Delete Item ──
  if (req.method === 'DELETE' && pathname.startsWith('/api/items/')) {
    const id = parseInt(pathname.split('/').pop(), 10);
    if (!id) {
      res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ error: 'আইডি সঠিক নয়।' }));
      return;
    }
    db.deleteItem(id);
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ success: true, message: 'ঘটনাটি ডিলিট করা হয়েছে।' }));
    return;
  }

  // ── API: Trigger Generation ──
  if (req.method === 'POST' && pathname === '/api/generate') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      let params = {};
      try { if (body) params = JSON.parse(body); } catch (_) {}

      let cmd = 'node scripts/generate-history.js';
      if (params.category) cmd += ` --category=${params.category}`;
      if (params.theme) cmd += ` --theme=${params.theme}`;
      if (params.uid) cmd += ` --uid=${params.uid}`;

      exec(cmd, { cwd: rootDir }, (err, stdout, stderr) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ error: stderr || err.message }));
          return;
        }

        const todayJsonPath = path.join(rootDir, 'cards/today.json');
        let todayData = null;
        if (fs.existsSync(todayJsonPath)) {
          todayData = JSON.parse(fs.readFileSync(todayJsonPath, 'utf8'));
        }

        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: true, output: stdout, card: todayData }));
      });
    });
    return;
  }

  // ── Static File Serving ──
  let reqPath = pathname === '/' ? '/admin.html' : pathname;
  let safePath = path.normalize(path.join(rootDir, reqPath));

  if (!safePath.startsWith(rootDir)) {
    res.writeHead(403);
    res.end('Access Denied');
    return;
  }

  if (fs.existsSync(safePath) && fs.statSync(safePath).isFile()) {
    const ext = path.extname(safePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(safePath).pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('File Not Found');
  }
});

server.listen(PORT, HOST, () => {
  console.log(`====================================================`);
  console.log(`🏛️  Royal History — Localhost Admin Server Running`);
  console.log(`🌐 URL: http://${HOST}:${PORT}/admin.html`);
  console.log(`🔒 Security: Strictly 127.0.0.1 (Localhost Only)`);
  console.log(`====================================================`);
});
