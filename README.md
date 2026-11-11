# Brewsome

Website for [@brewsome.coffee](https://instagram.com/brewsome.coffee), a home-brewing diary from Goa.
Built with React, Vite, Tailwind and [Animate UI](https://animate-ui.com), with scroll parallax.

It ships as a plain static folder, so the same build runs in two places:

- **Web3:** on IPFS, linked to an [Unstoppable Domains](https://unstoppabledomains.com) `.u` domain. It opens natively in Brave and other Web3-aware browsers.
- **Web2 fallback:** on Firebase Hosting, which works in every browser.

## Develop

```bash
npm install
npm run dev      # http://localhost:8765
npm run build    # outputs dist/
```

The build uses relative asset paths (`base: './'`) and a flat output with no subfolders. That keeps it working
from an IPFS gateway path (`/ipfs/<cid>/`) and from Unstoppable's file uploader, which takes a flat list of files.

## Update the feed

Save the image into `public/` (named `img-NN.jpg`) and add a line to `FEED` in `src/data.ts` (newest first).
Brew guides and timer steps live in the same file. Rebuild and redeploy to both targets.

## Deploy: web2 (Firebase Hosting)

1. Create a Firebase project and a Hosting site, then put your IDs in `.firebaserc` and the `site` field of `firebase.json`.
2. Log in and deploy:

```bash
npm run build
npx firebase-tools login
npx firebase-tools deploy --only hosting
```

## Deploy: web3 (IPFS + Unstoppable Domains)

1. `npm run build`
2. In the Unstoppable dashboard go to My Domains, Manage, Website. If a site is already launched, click **Remove** and wait for "Pending Changes" to clear.
3. Choose **Upload Website Files**, select every file in `dist/`, and click **Launch Website** once. A second click while the first is running shows a harmless `CONCURRENT_OPERATION` error.
4. Wait for "Pending Changes" to clear. The dashboard then shows the IPFS hash for the new version.

Browsers without Web3 support can open the same site through an IPFS gateway: `https://ipfs.io/ipfs/<hash>/`

The built-in uploader removes the old site before the new one goes up, so there is a short gap on each update.
For zero-downtime updates, pin `dist/` with a service such as Pinata or Filebase and paste the new CID under
Website, Custom website linking.

On the first visit, Brave loads the site through an in-browser IPFS gateway, which can be slow while peers find
the new files. Tap "Check CID availability" or retry if it shows a download screen.

## Repository layout

- `src/`: React app (`components/` for sections, `data.ts` for editable content)
- `public/`: Instagram feed images and favicon
- `legacy-static/`: the earlier plain HTML version, kept for reference
- `firebase.json`, `.firebaserc`: Firebase Hosting config
