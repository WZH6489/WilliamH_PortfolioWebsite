# Deploy Your Portfolio

Your site is static (HTML, CSS, JS). Here are two free ways to put it online.

---

## Option 1: GitHub Pages (recommended)

1. **Create a new repository on GitHub**
   - Go to [github.com/new](https://github.com/new)
   - Name it e.g. `portfolio` or `your-username.github.io` (the latter gives you `https://your-username.github.io`)
   - Leave it empty (no README, no .gitignore)
   - Click **Create repository**

2. **Push this folder to GitHub** (run in Terminal, from this folder):

   ```bash
   cd "/Users/williamhuang/Downloads/Essential Files/Cursor/Portfolio Website"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```
   Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your GitHub username and repo name.

3. **Turn on GitHub Pages**
   - In the repo: **Settings** → **Pages**
   - Under **Source**: choose **Deploy from a branch**
   - **Branch**: `main`, **Folder**: `/ (root)`
   - Save. In 1–2 minutes the site will be at:
     - `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`  
     or, if the repo is `your-username.github.io`:  
     - `https://your-username.github.io/`

---

## Option 2: Netlify (drag & drop)

1. Go to [app.netlify.com](https://app.netlify.com) and sign in (or create a free account).
2. Drag the **Portfolio Website** folder onto the “Deploy” area on the Netlify dashboard.
3. Netlify will give you a URL like `random-name-123.netlify.app`. You can change it in **Site settings** → **Domain management**.

---

## After deploying

- **GitHub Pages**: To update the site, run `git add .`, `git commit -m "Update"`, then `git push`.
- **Netlify**: Re-drag the folder to deploy again, or connect the same folder to a Git repo for automatic deploys on push.
