# Platform-Specific Configuration Files

This file contains ready-to-use configuration files for different deployment platforms.

---

## Netlify Configuration

### netlify.toml

```toml
[build]
  command = "npm run build"
  publish = "build"
  environment = { NODE_OPTIONS = "--openssl-legacy-provider" }

[build.environment]
  NODE_VERSION = "18"
  NODE_OPTIONS = "--openssl-legacy-provider"
  REACT_APP_API_URL = "https://apis.ccbp.in"

# SPA redirects all routes to index.html
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

# Cache headers for static assets
[[headers]]
  for = "/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

# Cache index.html with short TTL
[[headers]]
  for = "/index.html"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"
```

**How to use:**
1. Save as `netlify.toml` in project root
2. Commit: `git add netlify.toml && git commit -m "Add Netlify config"`
3. Deploy: Push to main or deploy via Netlify dashboard

---

## Vercel Configuration

### vercel.json

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "installCommand": "npm install",
  "env": {
    "NODE_OPTIONS": "--openssl-legacy-provider",
    "REACT_APP_API_URL": "https://apis.ccbp.in"
  },
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/static/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

**How to use:**
1. Save as `vercel.json` in project root
2. Commit and push
3. Vercel auto-deploys

---

## Render Configuration

### render.yaml

```yaml
services:
  - type: web
    name: nxt-trendz
    env: node
    plan: free
    buildCommand: npm install && npm run build
    startCommand: npm install -g serve && serve -s build -l 3000
    staticPublishPath: build
    envVars:
      - key: NODE_OPTIONS
        value: --openssl-legacy-provider
      - key: REACT_APP_API_URL
        value: https://apis.ccbp.in
      - key: NODE_VERSION
        value: 18
    routes:
      - path: /
        dest: index.html
      - path: /static
        dest: /static
```

**How to use:**
1. Save as `render.yaml` in project root
2. Commit and push
3. On Render: Blueprint → Connect repo → Auto-deploy

---

## GitHub Pages Configuration

### package.json (Updated)

```json
{
  "name": "nxt-trendz",
  "version": "0.1.0",
  "private": true,
  "homepage": "https://KARINGU-RAVI.github.io/Nxt-trendz-app",
  "dependencies": {
    ...
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --watchAll",
    "eject": "react-scripts eject",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  },
  ...
}
```

**How to deploy:**
```bash
npm install --save-dev gh-pages
npm run deploy
```

---

## Firebase Configuration

### firebase.json

```json
{
  "hosting": {
    "public": "build",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "/static/**",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000"
          }
        ]
      }
    ],
    "cleanUrls": true
  }
}
```

**How to deploy:**
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

---

## Azure Static Web Apps Configuration

### staticwebapps.config.json

```json
{
  "navigationFallback": {
    "rewrite": "/index.html",
    "exclude": ["/images/*", "/css/*", "/js/*"]
  },
  "mimeTypes": {
    ".json": "text/json"
  },
  "auth": {
    "identityProviders": {
      "github": {
        "registration": {
          "openIdConnectMetadata": "https://token.actions.githubusercontent.com/.well-known/openid-configuration",
          "clientIdSettingName": "GITHUB_CLIENT_ID",
          "clientSecretSettingName": "GITHUB_CLIENT_SECRET"
        }
      }
    }
  },
  "routes": [
    {
      "route": "/static/*",
      "allowedRoles": ["anonymous"],
      "headers": {
        "cache-control": "public, max-age=31536000, immutable"
      }
    }
  ]
}
```

**How to deploy:**
1. Go to Azure Portal
2. Create Static Web App
3. Connect GitHub
4. Azure creates workflow automatically

---

## GitHub Actions for CI/CD

### .github/workflows/deploy.yml

```yaml
name: Deploy to Production

on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [18.x]
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linter
      run: npm run lint || true  # Don't fail build on lint errors
    
    - name: Build
      run: npm run build
      env:
        NODE_OPTIONS: --openssl-legacy-provider
        REACT_APP_API_URL: https://apis.ccbp.in
    
    - name: Upload build artifact
      uses: actions/upload-artifact@v3
      with:
        name: build
        path: build/

  deploy-netlify:
    needs: build-and-test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/download-artifact@v3
      with:
        name: build
    
    - name: Deploy to Netlify
      uses: netlify/actions/cli@master
      with:
        args: deploy --prod --dir=.
      env:
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
```

**How to use:**
1. Save as `.github/workflows/deploy.yml`
2. Create GitHub secrets:
   - `NETLIFY_SITE_ID`
   - `NETLIFY_AUTH_TOKEN`
3. Push → Auto-deploys!

---

## Docker for All Platforms

### Dockerfile (Already in project)

```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
ENV NODE_OPTIONS=--openssl-legacy-provider

COPY package.json pnpm-lock.yaml ./
RUN npm install

COPY . .
RUN npm run build

FROM node:18-alpine

WORKDIR /app
ENV NODE_OPTIONS=--openssl-legacy-provider

RUN npm install -g serve

COPY --from=builder /app/build ./build
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
ENV NODE_ENV=production

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

CMD ["serve", "-s", "build", "-l", "3000"]
```

---

## Environment Variables Template

### .env.example

```
# API Configuration
REACT_APP_API_URL=https://apis.ccbp.in

# Node Configuration
NODE_OPTIONS=--openssl-legacy-provider

# App Configuration
REACT_APP_NAME=Nxt Trendz
REACT_APP_VERSION=1.0.0

# Analytics (optional)
# REACT_APP_GA_ID=

# Debug Mode (optional)
# REACT_APP_DEBUG=false
```

---

## Quick Setup Scripts

### setup-netlify.sh

```bash
#!/bin/bash

echo "🚀 Setting up Netlify configuration..."

# Create netlify.toml if it doesn't exist
if [ ! -f netlify.toml ]; then
  cat > netlify.toml << 'EOF'
[build]
  command = "npm run build"
  publish = "build"
  environment = { NODE_OPTIONS = "--openssl-legacy-provider" }

[build.environment]
  NODE_VERSION = "18"
  NODE_OPTIONS = "--openssl-legacy-provider"
  REACT_APP_API_URL = "https://apis.ccbp.in"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
EOF
  echo "✅ Created netlify.toml"
else
  echo "✅ netlify.toml already exists"
fi

# Git commit
echo "📝 Committing..."
git add netlify.toml
git commit -m "Add Netlify configuration" || true

echo "✨ Ready to deploy to Netlify!"
echo "📍 Go to: https://netlify.com → New site from Git → Choose repo"
```

### setup-vercel.sh

```bash
#!/bin/bash

echo "🚀 Setting up Vercel configuration..."

# Create vercel.json if it doesn't exist
if [ ! -f vercel.json ]; then
  cat > vercel.json << 'EOF'
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "env": {
    "NODE_OPTIONS": "--openssl-legacy-provider",
    "REACT_APP_API_URL": "https://apis.ccbp.in"
  },
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
EOF
  echo "✅ Created vercel.json"
else
  echo "✅ vercel.json already exists"
fi

# Git commit
echo "📝 Committing..."
git add vercel.json
git commit -m "Add Vercel configuration" || true

echo "✨ Ready to deploy to Vercel!"
echo "📍 Go to: https://vercel.com/new → Import repo"
```

---

## Copy & Paste Ready Configs

### For Netlify:
```toml
[build]
  command = "npm run build"
  publish = "build"

[build.environment]
  NODE_VERSION = "18"
  NODE_OPTIONS = "--openssl-legacy-provider"
  REACT_APP_API_URL = "https://apis.ccbp.in"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### For Vercel:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "env": {
    "NODE_OPTIONS": "--openssl-legacy-provider",
    "REACT_APP_API_URL": "https://apis.ccbp.in"
  },
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### For Render:
```yaml
services:
  - type: web
    env: node
    buildCommand: npm install && npm run build
    startCommand: npm install -g serve && serve -s build -l 3000
    envVars:
      - key: NODE_OPTIONS
        value: --openssl-legacy-provider
      - key: REACT_APP_API_URL
        value: https://apis.ccbp.in
```

---

## Deployment Checklist

Before deploying, ensure:

- [ ] All code committed to GitHub
- [ ] No local changes (run `git status`)
- [ ] `npm run build` succeeds locally
- [ ] Build produces `/build` folder
- [ ] No console errors in build output
- [ ] Environment variables configured
- [ ] API endpoints accessible
- [ ] App tested locally with `npm start`

---

## Post-Deployment Checklist

After deploying:

- [ ] Visit your deployed URL
- [ ] Test login/signup flow
- [ ] Test product browsing
- [ ] Test cart functionality
- [ ] Check all images load
- [ ] Check API calls work
- [ ] Test on mobile devices
- [ ] Check browser console for errors

---

## Need Help?

See **DEPLOYMENT_GUIDE.md** for detailed instructions for each platform.

Good luck with your deployment! 🚀
