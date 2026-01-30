# Deployment Guide

The redirect service is built and running locally on `http://localhost:3030`. 

**To make it work with Telegram, you need a public HTTPS URL.**

## ✅ What's Done

- ✅ Service built and tested
- ✅ Running on `http://localhost:3030`
- ✅ All redirect routes working

## 🚀 Next: Make It Public

### Option A: ngrok (Fastest - 2 minutes)

**Install ngrok:**
```bash
brew install ngrok
```

**Expose the service:**
```bash
ngrok http 3030
```

You'll get a public URL like: `https://abc123.ngrok-free.app`

**Use in Telegram buttons:**
- `https://abc123.ngrok-free.app/oura` → Opens Oura
- `https://abc123.ngrok-free.app/sunsama` → Opens Sunsama
- etc.

**Pros:**
- Instant
- No configuration
- Perfect for testing

**Cons:**
- URL changes every time you restart ngrok (unless you have a paid account)
- Free tier has a "Are you a bot?" interstitial page (annoying but works)

---

### Option B: Railway.app (Free, Permanent)

**1. Create a GitHub repo:**
```bash
cd ~/clawd/services/deeplink-redirect
git init
git add .
git commit -m "Deep link redirect service"
gh repo create deeplink-redirect --public --source=. --push
```

**2. Deploy to Railway:**
- Go to https://railway.app
- Sign in with GitHub
- "New Project" → "Deploy from GitHub repo"
- Select your repo
- Railway auto-detects Node.js and deploys

**3. Get your URL:**
Railway gives you a permanent URL like `https://deeplink-redirect.up.railway.app`

**Pros:**
- Free (500 hours/month)
- Permanent URL
- Auto-deploys on git push
- No interstitial pages

**Cons:**
- Requires GitHub account
- Takes 5-10 minutes to set up

---

### Option C: Fly.io (Free Tier)

**1. Install Fly CLI:**
```bash
brew install flyctl
fly auth login
```

**2. Deploy:**
```bash
cd ~/clawd/services/deeplink-redirect
fly launch
# Follow prompts (accept defaults)
fly deploy
```

**3. Get your URL:**
Fly gives you a URL like `https://deeplink-redirect.fly.dev`

**Pros:**
- Free tier (3 small VMs)
- Fast, global CDN
- Permanent URL

**Cons:**
- Requires credit card for verification
- Slightly more technical

---

### Option D: Run on Your Mac (Local Network)

If you're always on the same WiFi as your phone:

**1. Get your Mac's local IP:**
```bash
ipconfig getifaddr en0
```

**2. Use that in Telegram:**
`http://192.168.1.XXX:3030/oura` (replace with your IP)

**Pros:**
- No external service needed
- Completely private

**Cons:**
- Only works on your local network
- IP might change
- HTTP (not HTTPS) — some apps might complain

---

## Recommended: ngrok for Testing, Railway for Production

**Quick test (ngrok):**
```bash
brew install ngrok
ngrok http 3030
# Use the HTTPS URL in Telegram buttons
```

**Permanent deployment (Railway):**
1. Push to GitHub
2. Deploy on Railway
3. Update your morning briefing script with the permanent URL

---

## Testing the Redirect

Once you have a public URL, test it:

1. Send yourself a Telegram message with a button:
   ```
   Test button with URL: https://your-url.com/oura
   ```

2. Tap the button on your iPhone

3. It should redirect and open the Oura app

If it shows an interstitial "Are you sure?" page first, that's normal (especially with ngrok free tier).

---

## Next Steps

1. **Choose a deployment method** (I recommend ngrok for immediate testing)
2. **Get your public URL**
3. **Test one redirect** (try the `/oura` route)
4. **Update the morning briefing** to use your new URLs

Want me to help with any of these steps?
