# Muhibbullah MD (Mahee) — GitHub Pages Website

A complete static personal website designed for free hosting on GitHub Pages.

## Included

- Responsive one-page portfolio
- Research, publications, projects, experience and notes sections
- Print-friendly CV page
- Dark/light mode
- Mobile navigation
- Publication filtering
- SEO and social-sharing metadata
- Custom 404 page
- Sample notes/blog structure
- No framework, database or paid hosting required

## Fast setup

### 1. Create the repository

For the website address `https://maheemd.github.io`, create a **public** repository named exactly:

```text
maheemd.github.io
```

If your GitHub username is different, both the username and repository must match:

```text
YOUR-USERNAME.github.io
```

### 2. Upload the website

Upload all files and folders from this package to the repository root.

The repository root should look like this:

```text
index.html
cv.html
404.html
assets/
notes/
README.md
.nojekyll
robots.txt
sitemap.xml
site.webmanifest
```

### 3. Enable GitHub Pages

Open:

```text
Repository → Settings → Pages
```

Choose:

```text
Source: Deploy from a branch
Branch: main
Folder: / (root)
```

Save. GitHub will publish the site.

## Edit your information

Most website cards and profile links are in one file:

```text
assets/js/site-data.js
```

Update:

- Email
- GitHub URL
- LinkedIn URL
- Google Scholar
- ORCID
- ResearchGate
- YouTube
- Publications
- Projects
- Timeline
- Notes

Keep a link as `""` when it is not available.

## Replace the profile image

Replace:

```text
assets/images/profile-placeholder.svg
```

with your own photo. You may instead add a JPG or PNG, for example:

```text
assets/images/profile.jpg
```

Then change the image path in both `index.html` and `cv.html`.

Recommended image:

- Square
- At least 800 × 800 pixels
- Professional background
- Optimized below 500 KB

## Change the GitHub username or website address

Search the project for:

```text
maheemd.github.io
```

Replace it with your final GitHub Pages address in:

- `index.html`
- `assets/js/site-data.js`
- `robots.txt`
- `sitemap.xml`

## Add a real CV PDF later

1. Put your PDF inside a new `documents` folder:
   ```text
   documents/Muhibbullah-MD-CV.pdf
   ```
2. Change the CV button link in `index.html` from:
   ```html
   href="cv.html"
   ```
   to:
   ```html
   href="documents/Muhibbullah-MD-CV.pdf"
   ```

The included `cv.html` can already be printed or saved as a PDF through the browser.

## Add a new note

1. Copy `notes/welcome.html`.
2. Rename it, for example:
   ```text
   notes/green-hydrogen-data-scarcity.html
   ```
3. Change its title and content.
4. Add the note inside `assets/js/site-data.js`.

## Custom domain later

GitHub Pages allows you to connect a custom domain later. You do not need to rebuild the website.

## Local preview

Open `index.html` directly, or run a small local web server:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## License

The code is released under the MIT License. Personal biographical content remains the property of Muhibbullah MD.
