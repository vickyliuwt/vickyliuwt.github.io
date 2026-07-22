# 📬 Make the contact form email you directly

Your site is hosted on GitHub Pages, which is **static** — it can't send email by
itself. To have the "Say hello" form (and the About-page form) deliver messages
straight to **liu.weiting@northeastern.edu**, connect one free relay service.
You only paste **one value** into `src/constants/profile.js`.

Both forms already work — pick **one** option below.

---

## ✅ Option A — Web3Forms (recommended, ~2 minutes, no login)

1. Go to **https://web3forms.com**
2. In the box, type your email: `liu.weiting@northeastern.edu`
3. Click **Create Access Key**. Web3Forms emails you an **Access Key**
   (looks like `a1b2c3d4-5678-90ab-cdef-1234567890ab`).
4. Copy that key.
5. Open `src/constants/profile.js`, find this line near the bottom:
   ```js
   const WEB3FORMS_KEY = '' // web3forms key
   ```
   Paste your key between the quotes:
   ```js
   const WEB3FORMS_KEY = 'a1b2c3d4-5678-90ab-cdef-1234567890ab' // web3forms key
   ```
6. Save → commit → push. Done! 🎉

Free tier: 250 messages/month. Replies go to the sender's email automatically.

---

## Option B — Formspree (alternative)

1. Go to **https://formspree.io** and sign up (free).
2. Create a **New Form**; set the destination to `liu.weiting@northeastern.edu`.
3. Copy the form endpoint. The **ID** is the part after `/f/`
   (e.g. `https://formspree.io/f/xdorwkbl` → the id is `xdorwkbl`).
4. Open `src/constants/profile.js`, find:
   ```js
   const FORMSPREE_ID = '' // formspree id
   ```
   Paste your id:
   ```js
   const FORMSPREE_ID = 'xdorwkbl' // formspree id
   ```
5. The **first** time someone submits, Formspree emails you to confirm the form — click the link once.
6. Save → commit → push.

Free tier: 50 messages/month.

---

## Notes
- If you fill in **both**, Web3Forms is used (it's checked first).
- Until you add a key/id, the form falls back to opening the visitor's email app
  (the little "Opens your email app 📮" hint shows in that mode; it disappears
  once a service is connected).
- To test after deploying: open your live site, use the form, and check your inbox
  (also peek in Spam the first time).
