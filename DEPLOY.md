# Hosting Your Portfolio Online

Your site is static (HTML, CSS, JS), so you can host it for free on several platforms. Three simple options:

---

## Option 1: GitHub Pages (free)

1. **Create a GitHub account** (if you don’t have one): [github.com](https://github.com).

2. **Create a new repository**
   - Click **New repository**
   - Name it `username.github.io` (replace `username` with your GitHub username) for a site at `https://username.github.io`,  
     **or** any other name (e.g. `portfolio`) for `https://username.github.io/portfolio/`.

3. **Push your project**
   - In Terminal, go to your project folder:
     ```bash
     cd "/Users/williamhuang/Downloads/Essential Files/Cursor/Portfolio Website"
     ```
   - Initialize Git and push (replace `YOUR_USERNAME` and `YOUR_REPO` with your GitHub username and repo name):
     ```bash
     git init
     git add .
     git commit -m "Initial commit"
     git branch -M main
     git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
     git push -u origin main
     ```

4. **Turn on GitHub Pages**
   - In the repo: **Settings** → **Pages**
   - Under **Source**, choose **Deploy from a branch**
   - Branch: **main**, folder: **/ (root)** (or **/docs** if your files are in a `docs` folder)
   - Save. In a minute or two the site will be at `https://YOUR_USERNAME.github.io/YOUR_REPO/` (or `https://YOUR_USERNAME.github.io/` if the repo is `username.github.io`).

**If you use a repo that’s not `username.github.io`**, your site will live at `https://username.github.io/repo-name/`. So your links must include that path, e.g. `href="portfolio/about.html"` or use a base tag. Easiest is to name the repo `username.github.io` so the site is at the root.

---

## Option 2: Netlify (free, drag-and-drop)

1. **Sign up**: [netlify.com](https://www.netlify.com) (free account).

2. **Deploy**
   - Go to [app.netlify.com](https://app.netlify.com) → **Add new site** → **Deploy manually**
   - Drag and drop your **Portfolio Website** folder (the one that contains `index.html`, `style.css`, etc.) into the drop zone.

3. **Done**
   - Netlify will give you a URL like `https://random-name-123.netlify.app`. You can change it under **Site settings** → **Domain management** → **Edit site name**.

**Optional – deploy from Git (auto-updates)**  
- **Add new site** → **Import an existing project** → connect GitHub and select your repo.  
- Each push to `main` will redeploy the site.

---

## Option 3: Vercel (free)

1. **Sign up**: [vercel.com](https://vercel.com) (use GitHub, GitLab, or email).

2. **Deploy from GitHub (recommended – auto-updates on push)**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click **Import Git Repository**. If your project isn’t on GitHub yet, push it first (see GitHub Pages steps 2–3).
   - Select your portfolio repo → **Import**
   - **Framework Preset**: leave as **Other** (or **None**). Root directory: leave as `.` (your repo root).
   - Click **Deploy**. In under a minute you’ll get a URL like `https://your-project.vercel.app`.

3. **Or deploy with the Vercel CLI (one-off or manual updates)**
   - Install the CLI: `npm i -g vercel` (requires [Node.js](https://nodejs.org))
   - In Terminal, go to your project folder:
     ```bash
     cd "/Users/williamhuang/Downloads/Essential Files/Cursor/Portfolio Website"
     ```
   - Run:
     ```bash
     vercel
     ```
   - Log in if prompted, accept defaults (no build command needed for a static site). Vercel will give you a live URL.

**Custom domain on Vercel**  
- Project → **Settings** → **Domains** → add your domain and follow the DNS instructions.

---

## Before you go live

1. **Replace placeholders**: Update "Your Name", `you@example.com`, `your-handle`, `your-profile`, and any `#` links (e.g. Live/Code) with your real info.
2. **Resume PDF**: Put your real `resume.pdf` in the same folder as `index.html` so **View Resume** works.
3. **Test**: After deploying, click through every page and button (View Resume, Details, contact links) to make sure paths work.

---

## Custom domain (optional)

- **GitHub Pages**: Repo **Settings** → **Pages** → **Custom domain**.
- **Netlify**: **Site settings** → **Domain management** → **Add custom domain**.
- **Vercel**: Project **Settings** → **Domains** → add your domain.

Point your domain’s DNS to the host; each platform’s docs walk you through it.
