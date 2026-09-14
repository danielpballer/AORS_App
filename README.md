# AORS 2026 Wednesday planner

A phone-friendly, single-page web app for planning Wednesday, 16 September 2026 at the
64th Army Operations Research Symposium (Mallette Training Facility, Aberdeen Proving Ground).

- **Day selector** – the title at the top left switches between Monday (tutorials), Tuesday (senior
  leaders, awards, panel, town halls, reception) and Wednesday (working groups). Each day has its own
  timeline with Teams links and speaker details.
- **Schedule** – the full Wednesday timeline (welcome, seven working-group sessions, breaks, lunch,
  out-briefs, social). Each session shows the talk you picked; tap it to compare all talks running
  in that slot. Sessions where Daniel Baller is presenting or co-authoring are flagged.
- **All talks** – every abstract from the welcome packet, grouped by working group, with search and
  working-group filters. Tap a talk for the full abstract, presenters, room, and the room's Teams link.
- **Follow-up** – any talk or session can be saved for follow-up from its detail page or the session
  picker, whether or not it is on your schedule. The Follow-up tab lists them by day with the people
  (LinkedIn links), room, and a notes box, plus a copy-as-text button.
- **Settings (gear icon)** – choose who you are so your own presenting and co-author slots are
  flagged (anyone in the program can be selected, so colleagues can use the same link), copy a backup
  code of everything saved on the device, or restore from one on another phone or browser.
- Picks, follow-ups and notes are saved in the browser (localStorage) on the device you use. "Copy my plan" puts a plain-text
  version of the day on the clipboard.

## Offline use

The app is a small progressive web app. On first load over HTTPS (GitHub Pages) a service worker
caches the page, data, and icons, so it keeps opening with no signal; an "Offline" pill shows in the
header when the phone has no connection. Teams and LinkedIn links still need a connection. When
online, the app fetches the latest files first and falls back to the cache after a few seconds, so
updates arrive whenever there is signal. "Add to Home screen" installs it with its own icon.

## Files

- `index.html` – the app (no build step, no dependencies beyond Google Fonts).
- `sw.js`, `manifest.webmanifest`, `icons/` – offline caching and home-screen install.
- `data.js` – schedule, room links, working-group descriptions and all 82 abstracts, extracted from
  `2026_AORS_Welcome_Packet_TDAC.pdf`. Sessions and rooms follow the Working Group Master Schedule v2
  (14 SEP 2026); abstracts come from the original welcome packet. Two talks added in v2 have no abstract.

## Running it

Open `index.html` directly, or serve the folder with any static server. To host it on GitHub Pages,
enable Pages for this repository with the source set to the branch root; the app is then available at
`https://<user>.github.io/AORS_App/`.
