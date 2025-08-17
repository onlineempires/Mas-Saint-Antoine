# 🚀 Mas Saint Antoine - GitHub Pages Deployment Guide

## 📁 Repository Setup

### Step 1: Create GitHub Repository
1. Go to [GitHub.com](https://github.com) and sign in
2. Click **"New"** or **"+"** → **"New repository"**
3. Repository name: `mas-saint-antoine` (or any name you prefer)
4. Set to **Public** (required for free GitHub Pages)
5. ✅ Check **"Add a README file"**
6. Click **"Create repository"**

### Step 2: Upload Your Files
You have several options to upload your files:

#### Option A: Web Interface (Easiest)
1. In your new repository, click **"uploading an existing file"**
2. Drag and drop ALL the files from your project:
   ```
   📁 Project Files to Upload:
   ├── index.html ⭐ (Main page)
   ├── gites.html
   ├── services.html
   ├── region.html
   ├── contact.html
   ├── booking.html
   ├── 404.html (Custom error page)
   ├── .nojekyll (GitHub Pages config)
   ├── sitemap.xml
   ├── robots.txt
   ├── 📁 css/
   │   └── style.css
   ├── 📁 js/
   │   ├── simple-navigation.js
   │   ├── booking.js
   │   ├── language-toggle.js
   │   └── analytics.js
   └── 📁 .github/
       └── 📁 workflows/
           └── deploy.yml
   ```
3. Commit message: "Initial deployment of Mas Saint Antoine website"
4. Click **"Commit changes"**

#### Option B: Git Commands (Advanced)
```bash
git clone https://github.com/YOUR-USERNAME/mas-saint-antoine.git
cd mas-saint-antoine
# Copy all your files here
git add .
git commit -m "Initial deployment of Mas Saint Antoine website"
git push origin main
```

## ⚙️ Enable GitHub Pages

### Step 3: Configure GitHub Pages
1. In your repository, go to **Settings** tab
2. Scroll down to **"Pages"** in the left sidebar
3. Under **"Source"**, select:
   - **"Deploy from a branch"**
   - Branch: **"main"** (or "master")
   - Folder: **"/ (root)"**
4. Click **"Save"**

### Step 4: Wait for Deployment
- GitHub will show a yellow dot 🟡 (building) then green checkmark ✅ (deployed)
- Usually takes 1-5 minutes
- Your site will be available at: `https://YOUR-USERNAME.github.io/mas-saint-antoine/`

## 🔧 Files Created for GitHub Pages

### `.nojekyll`
- Tells GitHub Pages not to use Jekyll processing
- Ensures your files are served exactly as they are

### `404.html`
- Custom error page with navigation back to your site
- Matches your site's design and branding

### `.github/workflows/deploy.yml`
- Automated deployment workflow
- Rebuilds site automatically when you make changes

## 🌐 Your Live Website URLs

After deployment, your site will be accessible at:
- **Main site**: `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`
- **Gîtes page**: `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/gites.html`
- **Services**: `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/services.html`
- **Region**: `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/region.html`
- **Contact**: `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/contact.html`
- **Booking**: `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/booking.html`

## 🔍 Testing Your Deployment

### 1. Immediate Tests
Once deployed, test these pages:
- `simple-test.html` - Basic functionality test
- `debug-navigation.html` - Comprehensive navigation test
- `index.html` - Full homepage

### 2. Navigation Testing
- Click all header navigation links
- Test mobile menu on phone/tablet
- Verify smooth scrolling on anchor links
- Check language toggle (EN/FR)

### 3. Mobile Testing
- Test on different screen sizes
- Verify touch navigation works
- Check image loading and responsiveness

## 🛠️ Making Updates

### To Update Your Site:
1. Edit files in your repository (click pencil icon)
2. Or upload new versions of files
3. Commit changes with descriptive message
4. GitHub automatically rebuilds and redeploys (1-3 minutes)

### Common Updates:
- **Content changes**: Edit HTML files directly
- **Styling updates**: Modify `css/style.css`
- **Functionality**: Update JavaScript files in `js/` folder

## 🔒 Custom Domain (Optional)

### If you have your own domain:
1. Edit the `CNAME` file with your domain:
   ```
   massaintantoine.com
   ```
2. In your domain registrar, point DNS to:
   ```
   YOUR-USERNAME.github.io
   ```

## 🐛 Troubleshooting

### Site Not Loading?
- Check repository is **Public**
- Verify **Pages** is enabled in Settings
- Wait 5-10 minutes for initial deployment
- Check Actions tab for build errors

### Navigation Links Broken?
- All files must be in root directory
- Use relative paths (no leading slash)
- Test with `debug-navigation.html`

### Images Not Loading?
- Verify image URLs are correct
- Check browser developer console for errors
- Ensure images are properly uploaded

## 📞 Support

- **GitHub Pages Documentation**: https://docs.github.com/en/pages
- **Repository Issues**: Create issues in your GitHub repo
- **Status Check**: Visit Actions tab to see deployment status

---

## 🎉 Success Checklist

After following this guide, you should have:
- ✅ Live website on GitHub Pages
- ✅ All navigation links working
- ✅ Mobile-responsive design
- ✅ Automatic updates when you push changes
- ✅ Custom 404 error page
- ✅ SEO optimization (sitemap, robots.txt)

**Your Mas Saint Antoine website is now live on GitHub Pages! 🏡✨**