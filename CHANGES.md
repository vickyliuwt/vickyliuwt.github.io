# What changed 🐾

A summary of the updates in this version of the portfolio.

## Bugs fixed
- **Mobile horizontal overflow** — the skill marquee ran ~5000px wide and only got clipped by the page. It's now properly contained, so every page fits its screen exactly (verified at 360px, 390px, and 768px).
- **About photo was a giant block** — conflicting CSS forced the portrait to full width. It's now a clean profile card (240px, 4:5), two-column beside the bio on desktop and centered on mobile.
- **Achievements did nothing** — `achievements.js` was an empty stub, so every unlock call was ignored even though the toast/panel/badge styles already existed. Now fully working.
- **Footer had a trailing “·”** — from an empty footer note. Fixed, and added a real note.
- Removed leftover commented-out code across several files for tidiness.

## New / restored features
- **Swipe gestures** — swipe left/right through the project and artwork lightboxes on touch devices.

> **Currently commented out (off "for now", easy to switch back on):**
> - **Achievements** — the whole system is built (`achievements.js`, `Achievements.jsx`) but its render is commented out in `App.jsx`. Uncomment the import + `<Achievements />` to turn it back on.
> - **Project sort** (Newest / Oldest / A–Z) — the `<div className="sort-bar">…</div>` block in `ProjectsPage.jsx` is commented out. (The tech-tag filter is still on.)
> - **Artwork category filter** (All / Drawing / Painting / Animation) — the `<div className="filter-bar">…</div>` block in `ArtworkPage.jsx` is commented out; all pieces show.

## Mobile & layout
- New `src/mobile.css` — a single, organized responsive layer (safety → photo → marquee → tablet → phone → small phone → touch).
- Artwork gallery is 2-up on phones (was 1-up and extremely long).
- Comfortable tap targets for footer links; smaller, tighter floating buttons on small screens.
- Sticky hover transforms disabled on touch.

## Housekeeping
- Every code comment is now 1–2 words.
- Shortened the long comments in `index.html` and the deploy workflow.

## Files added
- `src/mobile.css`
- `src/components/Achievements.jsx`
- `src/hooks/useSwipe.js`

## Latest tweaks
- **About photo** shown full-width and horizontal (natural 4:3, uncropped), bio stacked below.
- **Nav icons** now keep a constant size when the window is resized (they no longer scale with the breakpoint).
- **"Say hello" popup** (the avatar badge, bottom-left) now closes when you click anywhere outside it or press Esc — and your typed message/name is saved (via `localStorage`, key `cform.sayhello`), so reopening restores it. Cleared automatically once a message sends.

## Contact form → emails you directly
- The contact form (both the **Say hello** popup and the **About** page) can now deliver messages straight to **liu.weiting@northeastern.edu**.
- Added **Web3Forms** support (plus the existing **Formspree**). A static GitHub Pages site can't send mail on its own, so this uses a free relay — you paste **one key/id** into `src/constants/profile.js`. See **EMAIL_SETUP.md** for the 2-minute setup.
- The sender's email is set as **reply-to**, so you can reply to them directly from your inbox.
- Until a key is added, the form falls back to opening the visitor's mail app (shows a small "Opens your email app 📮" hint).
