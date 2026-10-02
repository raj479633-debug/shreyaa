# Shreya Makeovers â€” Haute Bridal Artistry & Beauty Academy

Ultra-premium luxury bridal beauty brand website and academy platform.

## Design Highlights
- **Aesthetic**: Luxury Indian bridal editorial + high-end beauty studio + fashion magazine direction
- **Palette**: Warm ivory/cream (`#FAF8F4`), matte black ink (`#131211`), champagne gold accents (`#C4A47C`), soft beige
- **Typography**: Playfair Display (editorial serif), Plus Jakarta Sans (clean body & navigation), Alex Brush (script signature)
- **Features**:
  - Full-screen editorial hero section with high-res portrait and botanical motifs
  - Bespoke services showcase (Mandap HD, Engagement, Cocktail Gala, Hair Artistry, Draping)
  - Interactive Bridal Lookbook with filter pills and full-view lightbox
  - The Shreya Experience 3-step ritual timeline & single-artist sanctuary guarantee
  - Academy Masterclass enrollment portal
  - Verified client testimonials & editorial journal
  - Instant WhatsApp booking inquiry bridge (`wa.me`)
  - Fully responsive mobile drawer navigation and sticky mobile booking bar

## Project Structure
```text
shreya-makeovers/
â”œâ”€â”€ index.html        # Main landing page structure
â”œâ”€â”€ styles.css        # Luxury design tokens, typography & component classes
â”œâ”€â”€ app.js            # Interactive behaviors (lightbox, filters, drawer, WhatsApp bridge)
â”œâ”€â”€ assets/
â”‚   â””â”€â”€ shreya/       # High-resolution bridal and academy photography
â”œâ”€â”€ .gitignore        # Git ignore rules
â””â”€â”€ README.md         # Documentation
```

## How to Deploy to GitHub & GitHub Pages

### 1. Initialize Git & Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit: Shreya Makeovers luxury bridal website"
git branch -M main
git remote add origin https://github.com/<YOUR_USERNAME>/<REPO_NAME>.git
git push -u origin main
```

### 2. Enable Free 24/7 Hosting on GitHub Pages
1. Go to your repository on GitHub.
2. Click **Settings** > **Pages** (in the left sidebar).
3. Under **Build and deployment** > **Branch**, select `main` and `/ (root)`.
4. Click **Save**.
5. Your website will be live at `https://<YOUR_USERNAME>.github.io/<REPO_NAME>/` in under a minute!

## Local Preview
Open `index.html` directly in any web browser, or run a local static server:
```bash
# Using Node (npx)
npx serve

# Or open directly
start index.html
```
