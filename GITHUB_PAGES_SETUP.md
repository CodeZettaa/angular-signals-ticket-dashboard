# GitHub Pages Deployment Setup

This guide will help you deploy the Angular Signals Ticket Dashboard to GitHub Pages.

## Automatic Deployment (Recommended)

The repository includes a GitHub Actions workflow that automatically deploys to GitHub Pages when you push to the `main` branch.

### Setup Steps

1. **Enable GitHub Pages**:
   - Go to your repository: https://github.com/CodeZettaa/angular-signals-ticket-dashboard
   - Click on **Settings** tab
   - Scroll down to **Pages** section (left sidebar)
   - Under **Source**, select **GitHub Actions**
   - Save the settings

2. **Trigger Deployment**:
   - The workflow will automatically run when you push to `main` branch
   - Or manually trigger it: Go to **Actions** tab > **Deploy to GitHub Pages** > **Run workflow**

3. **Access Your Site**:
   - After deployment completes, your site will be available at:
   - `https://codezettaa.github.io/angular-signals-ticket-dashboard/`

### Workflow Details

The GitHub Actions workflow (`.github/workflows/deploy.yml`) will:
- Install dependencies with `--legacy-peer-deps`
- Build the project for production with base-href configured
- Deploy to GitHub Pages automatically

## Manual Deployment (Alternative)

If you prefer to deploy manually:

1. **Install angular-cli-ghpages**:
   ```bash
   npm install -g angular-cli-ghpages
   ```

2. **Build and Deploy**:
   ```bash
   npm run deploy:gh-pages
   ```

   This will:
   - Build the project with the correct base-href
   - Deploy to the `gh-pages` branch
   - Make it available on GitHub Pages

3. **Enable GitHub Pages**:
   - Go to repository Settings > Pages
   - Select source: `gh-pages` branch
   - Save

## Base Href Configuration

The project is configured to work with GitHub Pages subdirectory:
- Base href: `/angular-signals-ticket-dashboard/`
- This is set in the build command and workflow

If you want to deploy to the root domain (custom domain), you'll need to:
1. Update the base-href to `/` in the workflow
2. Configure a custom domain in GitHub Pages settings

## Troubleshooting

### 404 Errors on Routes
- Ensure the base-href is correctly set
- GitHub Pages serves from a subdirectory, so all routes need the base-href prefix

### Build Failures
- Check GitHub Actions logs
- Ensure Node.js 18+ is used
- Verify `--legacy-peer-deps` flag is used

### Assets Not Loading
- Check that base-href matches your deployment path
- Verify all assets are included in the build output

## Updating the Site

Every time you push to the `main` branch, the site will automatically rebuild and redeploy. You can also manually trigger the workflow from the Actions tab.

## Viewing Deployment Status

- Go to **Actions** tab in your repository
- Click on the latest workflow run
- View build and deployment logs

