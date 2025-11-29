# Deployment Guide

This guide covers deploying the Angular Signals Ticket Dashboard to various platforms.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git configured

## Build for Production

```bash
npm run build:prod
```

This creates an optimized production build in the `dist/` directory.

## Deployment Options

### 1. Vercel (Recommended)

1. **Install Vercel CLI** (optional):
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

   Or connect your GitHub repository to Vercel dashboard:
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Vercel will auto-detect Angular and configure build settings

3. **Build Settings**:
   - Build Command: `npm run build:prod`
   - Output Directory: `dist/angular-signals-ticket-dashboard/browser`
   - Install Command: `npm install --legacy-peer-deps`

### 2. Netlify

1. **Install Netlify CLI** (optional):
   ```bash
   npm i -g netlify-cli
   ```

2. **Deploy**:
   ```bash
   netlify deploy --prod
   ```

   Or use Netlify dashboard:
   - Connect your repository
   - Build command: `npm run build:prod`
   - Publish directory: `dist/angular-signals-ticket-dashboard/browser`
   - Build command: `npm install --legacy-peer-deps && npm run build:prod`

3. **Create `netlify.toml`** (optional):
   ```toml
   [build]
     command = "npm install --legacy-peer-deps && npm run build:prod"
     publish = "dist/angular-signals-ticket-dashboard/browser"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

### 3. GitHub Pages

1. **Install angular-cli-ghpages**:
   ```bash
   npm install -g angular-cli-ghpages
   ```

2. **Build and deploy**:
   ```bash
   npm run build:prod -- --base-href=/angular-signals-ticket-dashboard/
   npx angular-cli-ghpages --dir=dist/angular-signals-ticket-dashboard/browser
   ```

3. **Enable GitHub Pages**:
   - Go to repository Settings > Pages
   - Select source branch (usually `gh-pages`)

### 4. Firebase Hosting

1. **Install Firebase CLI**:
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize Firebase**:
   ```bash
   firebase init hosting
   ```

3. **Configure `firebase.json`**:
   ```json
   {
     "hosting": {
       "public": "dist/angular-signals-ticket-dashboard/browser",
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
       ]
     }
   }
   ```

4. **Deploy**:
   ```bash
   npm run build:prod
   firebase deploy
   ```

### 5. AWS Amplify

1. **Connect Repository**:
   - Go to AWS Amplify Console
   - Connect your Git repository

2. **Build Settings**:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install --legacy-peer-deps
       build:
         commands:
           - npm run build:prod
     artifacts:
       baseDirectory: dist/angular-signals-ticket-dashboard/browser
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

### 6. Docker Deployment

1. **Create `Dockerfile`**:
   ```dockerfile
   FROM node:18-alpine AS build
   WORKDIR /app
   COPY package*.json ./
   RUN npm install --legacy-peer-deps
   COPY . .
   RUN npm run build:prod

   FROM nginx:alpine
   COPY --from=build /app/dist/angular-signals-ticket-dashboard/browser /usr/share/nginx/html
   COPY nginx.conf /etc/nginx/conf.d/default.conf
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. **Create `nginx.conf`**:
   ```nginx
   server {
     listen 80;
     server_name localhost;
     root /usr/share/nginx/html;
     index index.html;

     location / {
       try_files $uri $uri/ /index.html;
     }
   }
   ```

3. **Build and run**:
   ```bash
   docker build -t ticket-dashboard .
   docker run -p 80:80 ticket-dashboard
   ```

## Environment Variables

If you need environment variables, create `src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-api-url.com'
};
```

## Important Notes

1. **Peer Dependencies**: Use `--legacy-peer-deps` flag when installing dependencies due to PrimeNG 20 and Angular 19 compatibility.

2. **Base Href**: For subdirectory deployments, update `angular.json` or use `--base-href` flag.

3. **Routing**: Ensure your hosting provider supports SPA routing (all routes redirect to `index.html`).

4. **Build Output**: The production build output is typically in:
   `dist/angular-signals-ticket-dashboard/browser/`

## Post-Deployment Checklist

- [ ] Test all routes work correctly
- [ ] Verify API endpoints (if any) are accessible
- [ ] Check console for errors
- [ ] Test on mobile devices
- [ ] Verify HTTPS is enabled
- [ ] Check performance metrics
- [ ] Test all CRUD operations
- [ ] Verify charts render correctly

## Troubleshooting

### Build Errors
- Ensure Node.js 18+ is installed
- Clear `node_modules` and reinstall: `rm -rf node_modules package-lock.json && npm install --legacy-peer-deps`

### Routing Issues
- Ensure your hosting provider supports SPA routing
- Add redirect rules to serve `index.html` for all routes

### 404 Errors
- Check base href configuration
- Verify build output directory
- Ensure all assets are included in build

