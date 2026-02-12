# Push This Project to GitHub

Your folder is already a Git repo. Follow these steps to get it on GitHub.

---

## 1. Create a new repository on GitHub

1. Go to [github.com](https://github.com) and sign in.
2. Click the **+** (top right) → **New repository**.
3. **Repository name**: e.g. `portfolio` or `username.github.io` (see DEPLOY.md).
4. Leave it **Public**. Do **not** check "Add a README" (you already have files).
5. Click **Create repository**. Leave the page open; you’ll need the repo URL.

---

## 2. Add, commit, and push from Terminal

Open **Terminal** and run these commands one at a time.  
```bash
# Go to your project folder
cd "/Users/williamhuang/Downloads/Essential Files/Cursor/Portfolio Website"

# Stage all files
git add .

# Commit
git commit -m "Portfolio site ready for deploy"

# Add the remote and push
git remote add origin https://github.com/WZH6489/WilliamH_PortfolioWebsite.git
git branch -M main
git push -u origin main
```

If GitHub says the repo already has a `main` branch and you’re on another branch (e.g. `2026-02-12-m54e`), either:

- Push your current branch and set upstream:
  ```bash
  git push -u origin 2026-02-12-m54e
  ```
  Then on GitHub you can change the default branch to this one, or merge into `main`.

- Or switch to `main` and push:
  ```bash
  git checkout main
  git push -u origin main
  ```
  (Use this only if you’re okay with your current branch becoming `main`.)

---

## 3. If you already added `origin` before

If you get **"remote origin already exists"**, use:

```bash
git remote set-url origin https://github.com/WZH6489/WilliamH_PortfolioWebsite.git
git push -u origin main
```

---

## Summary

| Step | Command |
|------|--------|
| Go to project | `cd "/Users/williamhuang/Downloads/Essential Files/Cursor/Portfolio Website"` |
| Stage all | `git add .` |
| Commit | `git commit -m "Portfolio site ready for deploy"` |
| Add GitHub remote (first time) | `git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git` |
| Add remote | `git remote add origin https://github.com/WZH6489/WilliamH_PortfolioWebsite.git` |
| Push | `git branch -M main` then `git push -u origin main` |

After this, your code will be on GitHub and you can connect it to Vercel, Netlify, or GitHub Pages (see **DEPLOY.md**).
