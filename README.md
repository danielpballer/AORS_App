# AORS 2026 Wednesday planner

A phone-friendly, single-page web app for planning Wednesday, 16 September 2026 at the
64th Army Operations Research Symposium (Mallette Training Facility, Aberdeen Proving Ground).

- **My day** – the full Wednesday timeline (welcome, seven working-group sessions, breaks, lunch,
  out-briefs, social). Each session shows the talk you picked; tap it to compare all talks running
  in that slot. Sessions where Daniel Baller is presenting or co-authoring are flagged.
- **All talks** – every abstract from the welcome packet, grouped by working group, with search and
  working-group filters. Tap a talk for the full abstract, presenters, room, and the room's Teams link.
- Picks are saved in the browser (localStorage) on the device you use. "Copy my plan" puts a plain-text
  version of the day on the clipboard.

## Files

- `index.html` – the app (no build step, no dependencies beyond Google Fonts).
- `data.js` – schedule, room links, working-group descriptions and all 82 abstracts, extracted from
  `2026_AORS_Welcome_Packet_TDAC.pdf`. Sessions and rooms come from the master schedule grid, which
  corrects a few typos in the abstract pages.

## Running it

Open `index.html` directly, or serve the folder with any static server. To host it on GitHub Pages,
enable Pages for this repository with the source set to the branch root; the app is then available at
`https://<user>.github.io/AORS_App/`.
