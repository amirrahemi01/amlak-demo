# املاک توافق (Amlak Tavafogh)

Static RTL (Persian) real-estate site.

## Pages
- `index.html` — Home
- `search.html` — Property search / listings
- `property.html` — Property detail page
- `team.html` — Our team
- `projects.html` — Building projects (under construction / delivered / upcoming, with filter chips)
- `contact.html` — Contact form + info cards + stylized map

All pages are linked via the nav bar (desktop + mobile hamburger menu), logo, and property/project cards.

Note: `projects.html` and `contact.html` reuse a couple of the placeholder photos already used elsewhere in the demo (same asset host as the rest of the mock). Swap in real photography and hook the contact form up to your backend/email service before going live — right now it just shows a success message locally.

## Deploy
No build step needed — plain static HTML.

```
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

Then import the repo in Vercel (Framework Preset: **Other**) and deploy.
