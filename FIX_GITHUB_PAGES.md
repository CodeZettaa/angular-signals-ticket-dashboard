# Fix GitHub Pages - Showing README Instead of App

If GitHub Pages is showing the README file instead of your Angular app, follow these steps:

## Step 1: Enable GitHub Actions as Source

1. Go to your repository: https://github.com/CodeZettaa/angular-signals-ticket-dashboard
2. Click on **Settings** tab
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, you'll see options:
   - If it says "Deploy from a branch" → **Change this!**
   - Select **"GitHub Actions"** instead
5. Click **Save**

## Step 2: Trigger the Workflow

After enabling GitHub Actions:

1. Go to the **Actions** tab in your repository
2. You should see "Deploy to GitHub Pages" workflow
3. If it hasn't run yet, click on it and then click **"Run workflow"**
4. Select the `main` branch
5. Click **"Run workflow"**

## Step 3: Wait for Deployment

1. The workflow will take 2-3 minutes to complete
2. You can watch the progress in the **Actions** tab
3. Once complete, you'll see a green checkmark
4. Your site will be available at: `https://codezettaa.github.io/angular-signals-ticket-dashboard/`

## Step 4: Verify Deployment

1. After the workflow completes, go to **Settings** > **Pages**
2. You should see: "Your site is live at https://codezettaa.github.io/angular-signals-ticket-dashboard/"
3. Visit the URL to verify the app is working

## Troubleshooting

### If workflow fails:
- Check the workflow logs in the **Actions** tab
- Common issues:
  - Node version mismatch
  - Build errors
  - Path issues

### If still showing README:
- Make sure GitHub Actions is selected as the source (not a branch)
- Wait a few minutes for the deployment to propagate
- Clear your browser cache
- Try incognito/private browsing mode

### Manual Deployment (Alternative)

If GitHub Actions isn't working, you can deploy manually:

```bash
# Install angular-cli-ghpages globally
npm install -g angular-cli-ghpages

# Build and deploy
npm run deploy:gh-pages
```

Then in GitHub Settings > Pages, select `gh-pages` branch as source.

## Current Status

- ✅ Workflow file is configured correctly
- ✅ Build command includes correct base-href
- ✅ Output path is configured: `dist/angular-signals-ticket-dashboard/browser`
- ⚠️ **Action Required**: Enable GitHub Actions in repository Settings > Pages

