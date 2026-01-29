# Deep Link Redirect Service

Simple HTTP redirect service that converts `https://` URLs into custom app deep links (e.g., `ouraring://`, `sunsama://`). 

Built as a workaround for Telegram's limitation on inline keyboard URL buttons, which don't support custom URL schemes directly.

## Quick Start

```bash
cd ~/clawd/services/deeplink-redirect
npm install
npm start
```

Server runs on `http://localhost:3030`

## How It Works

1. **You send:** `https://yourserver.com/oura` in a Telegram button
2. **User taps:** Opens the URL in their browser
3. **Server redirects:** `302` redirect to `ouraring://`
4. **iOS opens:** Oura app launches

## Routes

- `/oura` → `ouraring://`
- `/sunsama` → `sunsama://`
- `/shortwave` → `shortwave://`
- `/reminders` → `x-apple-reminderkit://`
- `/weather` → `https://weather.com`

## Deployment Options

### Option 1: Local + ngrok (Fastest for testing)

```bash
# Terminal 1: Start the service
npm start

# Terminal 2: Expose it publicly
ngrok http 3030
```

Use the ngrok HTTPS URL (e.g., `https://abc123.ngrok.io/oura`) in your Telegram buttons.

**Pros:** Instant, no setup  
**Cons:** ngrok URL changes on restart (unless paid plan)

### Option 2: Railway.app (Free, persistent)

1. Push to GitHub
2. Connect Railway to your repo
3. Deploy (automatic)
4. Get permanent URL like `https://yourapp.up.railway.app`

**Pros:** Free, permanent URL, auto-deploys  
**Cons:** Requires GitHub account

### Option 3: Fly.io (Free tier)

```bash
# Install flyctl
brew install flyctl

# Deploy
fly launch
fly deploy
```

**Pros:** Free, persistent, fast  
**Cons:** Requires credit card for verification

### Option 4: Run on your Mac (Always-on)

```bash
# Make it a launchd service
# Create: ~/Library/LaunchAgents/com.clawd.deeplink-redirect.plist
```

Use your Mac's local network IP + ngrok or a dynamic DNS service.

## Adding New Links

Edit `server.js` and add to `DEEP_LINKS`:

```javascript
const DEEP_LINKS = {
  oura: 'ouraring://',
  myapp: 'myapp://open/here',
  // ...
};
```

## Testing

Visit `http://localhost:3030` to see all available routes.

Health check: `http://localhost:3030/health`

## Production Considerations

- Add HTTPS (Let's Encrypt via Caddy or nginx)
- Add rate limiting if public
- Add analytics/logging if needed
- Consider adding query params support: `/oura?date=2026-01-29` → `ouraring://?date=2026-01-29`

## Alternative: Apple Shortcuts

Instead of this service, you could create an iOS Shortcut that:
1. Receives the morning briefing text
2. Parses the app names
3. Opens each app automatically

But this redirect approach is simpler and more flexible.
