# Repository Setup Instructions

Follow these steps to create and push the repository to your CodeZetta GitHub account.

## Step 1: Create Repository on GitHub

1. Go to [GitHub](https://github.com) and sign in to your CodeZetta account
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Repository name: `angular-signals-ticket-dashboard`
5. Description: `Modern Ticket Management Dashboard built with Angular 19, Signals, and PrimeNG`
6. Choose visibility (Public or Private)
7. **DO NOT** initialize with README, .gitignore, or license (we already have these)
8. Click "Create repository"

## Step 2: Connect Local Repository to GitHub

After creating the repository on GitHub, run these commands:

```bash
cd /Users/nourhansaieedadmin/Documents/codeZetta/protoflio_code/angular-signals-ticket-dashboard

# Add remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/angular-signals-ticket-dashboard.git

# Or if using SSH:
# git remote add origin git@github.com:YOUR_USERNAME/angular-signals-ticket-dashboard.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 3: Verify

1. Go to your repository on GitHub
2. Verify all files are present
3. Check that README.md displays correctly

## Step 4: Deploy (Optional)

Choose one of the deployment options from `DEPLOYMENT.md`:

### Quick Deploy with Vercel (Recommended)

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import your `angular-signals-ticket-dashboard` repository
5. Configure:
   - Framework Preset: Angular
   - Build Command: `npm run build:prod`
   - Output Directory: `dist/angular-signals-ticket-dashboard/browser`
   - Install Command: `npm install --legacy-peer-deps`
6. Click "Deploy"

Your app will be live at: `https://your-project-name.vercel.app`

## Alternative: Netlify

1. Go to [netlify.com](https://netlify.com)
2. Sign in with GitHub
3. Click "Add new site" > "Import an existing project"
4. Select your repository
5. Configure:
   - Build command: `npm install --legacy-peer-deps && npm run build:prod`
   - Publish directory: `dist/angular-signals-ticket-dashboard/browser`
6. Click "Deploy site"

## Repository Information

- **Repository Name**: `angular-signals-ticket-dashboard`
- **Description**: Modern Ticket Management Dashboard built with Angular 19, Signals, and PrimeNG
- **Topics** (suggested): `angular`, `angular19`, `typescript`, `primeng`, `signals`, `dashboard`, `ticket-management`, `crud`, `portfolio`

## Next Steps

1. ✅ Repository created and pushed
2. ✅ Deploy to hosting platform (Vercel/Netlify)
3. ✅ Update README with live demo link
4. ✅ Add repository to portfolio

