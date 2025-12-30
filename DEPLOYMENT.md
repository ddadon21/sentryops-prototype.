# Deploying SentryOps to Vercel

## Quick Deploy (Recommended)

### Option 1: Deploy via GitHub (Easiest)

1. **Push your code to GitHub** (if not already done):
   ```bash
   git push origin claude/setup-vite-react-project-01Q9VBHJKgQdeRNorcbbYo8x
   ```

2. **Go to [vercel.com](https://vercel.com)** and sign up/login with GitHub

3. **Click "Add New Project"**

4. **Import your GitHub repository**: `ddadon21/sentryops-prototype`

5. **Configure the project**:
   - Framework Preset: **Vite**
   - Root Directory: `./` (leave as default)
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `dist` (auto-detected)

6. **Click "Deploy"**

7. **Get your live URL**: Vercel will provide a URL like:
   - `https://sentryops-prototype.vercel.app`
   - `https://sentryops-prototype-<username>.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Follow the prompts**:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - What's your project's name? **sentryops** (or keep default)
   - In which directory is your code located? **./**
   - Want to override the settings? **N**

5. **Production deployment**:
   ```bash
   vercel --prod
   ```

## What's Included

- ✅ Vercel configuration (`vercel.json`)
- ✅ SPA routing support
- ✅ Optimized production build
- ✅ All 36 pages configured
- ✅ Professional Landing page

## After Deployment

Your app will be live at the provided URL. You can access:
- Landing page: `https://your-url.vercel.app/landing`
- All other routes as configured

## Environment Variables (if needed later)

If you need to add environment variables:
1. Go to your Vercel project dashboard
2. Settings → Environment Variables
3. Add your variables

## Custom Domain (optional)

To add a custom domain:
1. Go to your Vercel project
2. Settings → Domains
3. Add your domain and follow DNS instructions

## Automatic Deployments

Once connected to GitHub:
- Every push to your branch automatically deploys
- Preview deployments for pull requests
- Production deployment when merged to main
