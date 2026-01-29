#!/usr/bin/env node

/**
 * Deep Link Redirect Service
 * 
 * Simple Express server that redirects HTTPS URLs to custom app deep links.
 * Solves the problem of Telegram not making custom URL schemes clickable.
 * 
 * Usage:
 *   npm install
 *   npm start
 *   
 * Then use URLs like:
 *   https://yourserver.com/oura → ouraring://
 *   https://yourserver.com/sunsama → sunsama://
 */

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3030;

// Deep link mappings
const DEEP_LINKS = {
  oura: 'ouraring://',
  sunsama: 'sunsama://',
  shortwave: 'shortwave://',
  reminders: 'x-apple-reminderkit://',
  weather: 'carrotweather://',
};

// Homepage - list all available redirects
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Deep Link Redirect Service</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; }
        h1 { color: #333; }
        .link { background: #f5f5f5; padding: 10px; margin: 10px 0; border-radius: 5px; }
        .link a { color: #0066cc; text-decoration: none; font-weight: bold; }
        .link code { color: #666; font-size: 0.9em; }
      </style>
    </head>
    <body>
      <h1>🔗 Deep Link Redirect Service</h1>
      <p>Click a link below to test app redirects:</p>
      ${Object.entries(DEEP_LINKS).map(([key, url]) => `
        <div class="link">
          <a href="/${key}">/${key}</a> → <code>${url}</code>
        </div>
      `).join('')}
    </body>
    </html>
  `);
});

// Redirect routes
Object.entries(DEEP_LINKS).forEach(([key, deepLink]) => {
  app.get(`/${key}`, (req, res) => {
    console.log(`Redirecting /${key} → ${deepLink}`);
    
    // 302 redirect to the deep link
    res.redirect(302, deepLink);
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', links: Object.keys(DEEP_LINKS) });
});

// 404 handler
app.use((req, res) => {
  res.status(404).send(`
    <!DOCTYPE html>
    <html>
    <head><title>404 - Not Found</title></head>
    <body>
      <h1>404 - Route not found</h1>
      <p>Available routes: ${Object.keys(DEEP_LINKS).map(k => `/${k}`).join(', ')}</p>
      <p><a href="/">← Back to home</a></p>
    </body>
    </html>
  `);
});

// Start server
app.listen(PORT, () => {
  console.log(`🔗 Deep Link Redirect Service running on http://localhost:${PORT}`);
  console.log(`\nAvailable routes:`);
  Object.entries(DEEP_LINKS).forEach(([key, url]) => {
    console.log(`  http://localhost:${PORT}/${key} → ${url}`);
  });
  console.log(`\nHealth check: http://localhost:${PORT}/health`);
});
