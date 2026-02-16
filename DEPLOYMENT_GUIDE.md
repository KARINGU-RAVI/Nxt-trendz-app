# Complete Deployment Guide for Nxt-Trendz

This guide covers deploying your Nxt-Trendz React app to various platforms.

---

## Table of Contents

1. [Netlify](#netlify)
2. [Vercel](#vercel)
3. [Render](#render)
4. [GitHub Pages](#github-pages)
5. [AWS (S3 + CloudFront)](#aws)
6. [Heroku](#heroku)
7. [Azure Static Web Apps](#azure)
8. [Firebase Hosting](#firebase)
9. [Comparison Table](#comparison)

---

## Netlify

### Easiest Option - Recommended for Beginners ⭐

#### Method 1: Git Connection (Recommended)

1. **Prepare Repository**
   ```bash
   git add .
   git commit -m "Ready for Netlify deployment"
   git push origin main
   ```

2. **Connect on Netlify**
   - Go to https://netlify.com
   - Click "New site from Git"
   - Select GitHub (authorize if needed)
   - Choose your `Nxt-trendz-app` repository

3. **Configure Build Settings**
   - **Build command**: `npm run build`
   - **Publish directory**: `build`
   - **Node version**: 18 (set in netlify.toml)

4. **Create netlify.toml**
   ```toml
   [build]
     command = "npm run build"
     publish = "build"
   
   [build.environment]
     NODE_VERSION = "18"
     NODE_OPTIONS = "--openssl-legacy-provider"
   
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

5. **Deploy**
   - Netlify automatically deploys on every push to main
   - View your site at: `https://[your-site-name].netlify.app`

#### Method 2: Manual Deployment

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the app
npm run build

# Deploy
netlify deploy --prod --dir=build
```

#### Environment Variables

1. Go to **Site Settings** → **Build & Deploy** → **Environment**
2. Add variables:
   ```
   REACT_APP_API_URL = https://apis.ccbp.in
   NODE_OPTIONS = --openssl-legacy-provider
   ```

#### Troubleshooting Netlify

```bash
# Test build locally
npm run build

# If build fails with OpenSSL error
export NODE_OPTIONS=--openssl-legacy-provider
npm run build

# View deploy logs on Netlify dashboard
# Settings → Deployments → Recent deploys
```

---

## Vercel

### Optimized for React ⭐⭐

#### Setup

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```
   - Answer prompts:
     - Scope: Your account
     - Project name: nxt-trendz
     - Directory: ./
     - Override settings: N
   - Your app is live! 🎉

#### Automatic Deployment

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect Repository**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Click Deploy

3. **Configure Environment Variables**
   - Go to **Settings** → **Environment Variables**
   - Add:
     ```
     REACT_APP_API_URL = https://apis.ccbp.in
     NODE_OPTIONS = --openssl-legacy-provider
     ```

#### Build Configuration

Create `vercel.json`:
```json
{
  "buildCommand": "NODE_OPTIONS='--openssl-legacy-provider' npm run build",
  "outputDirectory": "build",
  "env": {
    "NODE_OPTIONS": "--openssl-legacy-provider"
  }
}
```

#### Commands

```bash
# Deploy production
vercel --prod

# Preview deployment
vercel

# View logs
vercel logs

# Check deployments
vercel list
```

---

## Render

### Good All-Around Option ⭐⭐

#### Method 1: Git Connection (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for Render deployment"
   git push origin main
   ```

2. **Create on Render**
   - Go to https://render.com
   - Click "New +"
   - Select "Web Service"
   - Connect GitHub account
   - Select `Nxt-trendz-app` repository

3. **Configure Settings**
   - **Name**: nxt-trendz
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run build && npx serve -s build -l 3000`
   - **Node Version**: 18

4. **Environment Variables**
   - Click "Environment"
   - Add:
     ```
     NODE_OPTIONS = --openssl-legacy-provider
     REACT_APP_API_URL = https://apis.ccbp.in
     ```

5. **Deploy**
   - Click "Create Web Service"
   - Render automatically deploys
   - View at: `https://nxt-trendz.onrender.com`

#### Method 2: Manual Through Docker

```bash
# Build Docker image
docker build -t nxt-trendz:latest .

# Push to Docker Hub
docker tag nxt-trendz:latest yourname/nxt-trendz:latest
docker push yourname/nxt-trendz:latest

# On Render dashboard, create a Web Service
# Select "Docker" as environment
# Point to your Docker image
```

#### render.yaml (Infrastructure as Code)

```yaml
services:
  - type: web
    name: nxt-trendz
    env: node
    buildCommand: npm install && npm run build
    startCommand: npx serve -s build -l 3000
    envVars:
      - key: NODE_OPTIONS
        value: --openssl-legacy-provider
      - key: REACT_APP_API_URL
        value: https://apis.ccbp.in
    plan: free
```

#### Free Tier Limitations
- 0.5 GB RAM
- Free tier spins down after 15 minutes of inactivity
- Cold starts (~30 seconds after inactivity)

---

## GitHub Pages

### Free Option ✅

#### Setup

1. **Update package.json**
   ```json
   {
     "name": "nxt-trendz",
     "homepage": "https://KARINGU-RAVI.github.io/Nxt-trendz-app",
     ...
   }
   ```

2. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Update package.json Scripts**
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build",
     "start": "react-scripts start",
     "build": "react-scripts build",
     ...
   }
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

5. **Configure GitHub**
   - Go to Repository **Settings**
   - Click **Pages**
   - Source: Deploy from a branch
   - Branch: gh-pages
   - Save

6. **Your Site**
   - Available at: `https://KARINGU-RAVI.github.io/Nxt-trendz-app`

#### Automatic Deployment with GitHub Actions

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: 18
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build
```

Then just push:
```bash
git push origin main
```

---

## AWS

### Scalable & Professional ☁️

#### S3 + CloudFront Deployment

1. **Create S3 Bucket**
   ```bash
   # Using AWS CLI
   aws s3 mb s3://nxt-trendz-app
   
   # Enable static website hosting
   aws s3api put-bucket-website \
     --bucket nxt-trendz-app \
     --website-configuration file://website-config.json
   ```

2. **Build & Upload**
   ```bash
   # Build
   npm run build
   
   # Upload to S3
   aws s3 sync build/ s3://nxt-trendz-app --delete
   
   # Invalidate CloudFront cache
   aws cloudfront create-invalidation \
     --distribution-id YOUR_DISTRIBUTION_ID \
     --paths "/*"
   ```

3. **Create CloudFront Distribution**
   - Origin: S3 bucket
   - Enable compression
   - Set index.html as default
   - Add error routing for SPA

4. **Custom Domain**
   - Buy domain
   - Point to CloudFront distribution via Route 53

#### Using AWS Amplify

```bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Initialize
amplify init

# Add hosting
amplify add hosting

# Deploy
amplify publish
```

---

## Heroku

### Full-Stack Ready (Paid) 💸

**Note**: Heroku killed free tier in Nov 2022. Paid plans start at $7/month.

1. **Install Heroku CLI**
   ```bash
   # Windows
   choco install heroku-cli
   
   # Mac
   brew tap heroku/brew && brew install heroku
   
   # Linux
   curl https://cli-assets.heroku.com/install.sh | sh
   ```

2. **Login**
   ```bash
   heroku login
   ```

3. **Create App**
   ```bash
   heroku create nxt-trendz-app
   ```

4. **Create Procfile**
   ```
   web: npx serve -s build -l $PORT
   ```

5. **Set Environment Variables**
   ```bash
   heroku config:set NODE_OPTIONS=--openssl-legacy-provider
   heroku config:set REACT_APP_API_URL=https://apis.ccbp.in
   ```

6. **Deploy**
   ```bash
   npm run build
   git push heroku main
   ```

7. **Monitor**
   ```bash
   heroku logs --tail
   ```

---

## Azure Static Web Apps

### Microsoft Azure ☁️

1. **Create Static Web App**
   - Go to https://portal.azure.com
   - Create "Static Web App"
   - Sign in with GitHub
   - Select repository

2. **Build Configuration**
   - App location: `/`
   - API location: (leave blank)
   - Output location: `build`
   - Node version: 18

3. **Environment Variables**
   - Set in Azure Portal Settings

4. **Auto-Deploy**
   ```bash
   # Just push to main branch
   git push origin main
   ```

---

## Firebase Hosting

### Google Firebase 🔥

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize
firebase init hosting

# When prompted:
# - What do you want to use as your public directory? build
# - Single-page app? Yes
# - GitHub deployment? Yes (optional)

# Build & Deploy
npm run build
firebase deploy
```

---

## Comparison Table

| Platform | Cost | Ease | Performance | Git Integration | Limitations |
|----------|------|------|-------------|-----------------|-------------|
| **Netlify** | Free tier | ⭐⭐⭐⭐⭐ | Good | Yes | 100 GB/month |
| **Vercel** | Free tier | ⭐⭐⭐⭐⭐ | Excellent | Yes | 100 GB/month |
| **Render** | Free tier | ⭐⭐⭐⭐⭐ | Good | Yes | Spins down after 15m |
| **GitHub Pages** | Free | ⭐⭐⭐⭐ | Good | Yes | Limited services |
| **Firebase** | Free tier | ⭐⭐⭐⭐ | Excellent | Yes | 1 GB/month |
| **AWS** | Pay-as-you-go | ⭐⭐⭐ | Excellent | Optional | Complex setup |
| **Azure** | Free tier | ⭐⭐⭐⭐ | Good | Yes | Limited features |
| **Heroku** | $7+/month | ⭐⭐⭐⭐ | Good | Yes | Paid only |

---

## Recommended Deployment Path

### For Beginners: **Netlify** or **Vercel**
```bash
# One-click deploy, auto-scaling, free tier is generous
# Perfect for learning and prototyping
```

### For Production: **Vercel** or **AWS**
```bash
# Vercel: React-optimized, excellent performance
# AWS: Maximum control and scaling
```

### For Full-Stack: **Render** or **AWS**
```bash
# Render: Easier than AWS, good all-around
# AWS: Most powerful, steeper learning curve
```

---

## Pre-Deployment Checklist

- [ ] All code committed to GitHub
- [ ] Environment variables documented
- [ ] API endpoints configured
- [ ] Build tested locally: `npm run build`
- [ ] No console errors or warnings
- [ ] Responsive design checked
- [ ] All features tested
- [ ] Security best practices applied

---

## Environment Variables Reference

Add these to your chosen platform:

```
# API Configuration
REACT_APP_API_URL=https://apis.ccbp.in

# Node Configuration (for webpack)
NODE_OPTIONS=--openssl-legacy-provider

# App Metadata
REACT_APP_NAME=Nxt Trendz
```

---

## Post-Deployment Steps

1. **Test Your Site**
   - Visit your deployed URL
   - Test login/signup
   - Check product fetching
   - Verify cart functionality

2. **Monitor Performance**
   - Check build logs
   - Monitor error rates
   - Set up alerts

3. **Setup Custom Domain** (Optional)
   - Buy domain from registrar
   - Point to deployment platform
   - Configure SSL/TLS

4. **Continue Development**
   ```bash
   # Push to main branch to auto-deploy
   git add .
   git commit -m "Your message"
   git push origin main
   ```

---

## Common Deployment Issues & Solutions

### OpenSSL Error During Build
```bash
# Add to environment variables:
NODE_OPTIONS=--openssl-legacy-provider
```

### Build Fails with "npm: command not found"
```bash
# Ensure Node version is set (18+)
# Most platforms default to older versions
```

### App Loads But Shows Blank Page
```bash
# Check public/index.html
# Check for console errors (browser dev tools)
# Verify API endpoints are accessible
```

### API Calls Failing (CORS)
```bash
# API at apis.ccbp.in should work cross-origin
# Check network tab in browser dev tools
# Verify REACT_APP_API_URL is set correctly
```

### Port 3000 Already in Use
```bash
# Most platforms don't expose port, they assign automatically
# Don't hardcode port in your code
# Use process.env.PORT for server-side code
```

---

## Useful Resources

- **Netlify Docs**: https://docs.netlify.com/
- **Vercel Docs**: https://vercel.com/docs
- **Render Docs**: https://render.com/docs
- **GitHub Pages**: https://pages.github.com/
- **Firebase Docs**: https://firebase.google.com/docs/hosting
- **AWS S3 + CloudFront**: https://docs.aws.amazon.com/
- **Azure Static Web Apps**: https://docs.microsoft.com/en-us/azure/static-web-apps/

---

## Quick Deploy Commands

```bash
# Netlify (manual)
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=build

# Vercel
npm install -g vercel
vercel --prod

# GitHub Pages
npm install --save-dev gh-pages
# Update package.json, then:
npm run deploy

# Firebase
npm install -g firebase-tools
firebase init hosting
npm run build
firebase deploy

# AWS S3
aws s3 sync build/ s3://your-bucket-name --delete

# Render (Git push to main, auto-deploys)
git push origin main
```

---

## Next Steps

1. **Choose Your Platform** (Netlify/Vercel recommended)
2. **Push to GitHub**
3. **Connect Repository**
4. **Add Environment Variables**
5. **Deploy!** 🚀
6. **Share Your URL** 

Your Nxt-Trendz app will be live! ✨
