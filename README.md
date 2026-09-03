# Mardal Digital — studio

Porteføljen og salgsverktøyet til **Mardal Digital**, et lite digitalt designstudio.
Siden er selve beviset på arbeidet: en egen, distinkt visuell identitet som bevisst
skiller seg fra kundeprosjektene.

Bygget som en statisk side (HTML, CSS, litt vanilla JavaScript) — ingen rammeverk,
ingen byggeprosess. Rask, enkel å hoste, enkel å utvide.

## Design & identitet

- **Palett:** near-black (`#0C0C0D`), varm off-white (`#EDEBE2`), signalaksent (`#FF4B12`).
  Ingen navy — helt annet uttrykk enn kundesidene.
- **Typografi:** `Syne` (display) + `Inter` (brødtekst) + `Space Mono` (tekniske labels/nummer).
- **Struktur:** editorial og nummerert — `01 Intro → 02 Selected Work → 03 Capabilities
  → 04 Approach → 05 About → 06 Contact`.
- **Interaksjon:** custom cursor, preloader, reveal-on-scroll, subtil parallax, marquee,
  live Oslo-klokke og magnetisk kontaktlenke — alt bak `prefers-reduced-motion`.
- **MD-monogram:** brukes som logo, favicon, cursor-detalj og grafisk element.

## Struktur

```
.
├── index.html          # Hele siden (hero, arbeid, capabilities, approach, om, kontakt)
├── personvern.html     # Personvernerklæring i samme stil
├── css/styles.css      # Designsystemet
├── js/main.js          # Cursor, reveal, parallax, meny, klokke
├── assets/img/         # MD-favicon, og-image, Førre Bygg-mockups (SVG)
├── robots.txt · sitemap.xml · CNAME · .nojekyll
```

## Kjøre lokalt

```bash
python3 -m http.server 8000   # åpne http://localhost:8000
```

## Portefølje — legge til nye prosjekter

Porteføljen er laget for å skaleres: ett prosjekt kan stå stort og imponerende,
og nye legges til uten at siden ser tom ut i mellomtiden.

- **Stor case:** dupliser `<article class="case">` i `#work` og bytt ut tittel, meta,
  bilder (`assets/img/…`) og tekst.
- **Kommende:** radene i `.work__more` (`02`, `03`, …) er plassholdere som fylles inn
  etter hvert som nye kunder kommer til. Ingen falske prosjekter.

## Ting som skal fylles inn

| Hva | Hvor |
|-----|------|
| Domene | `CNAME`, meta i `index.html`, `robots.txt`, `sitemap.xml` (satt til `mardaldigital.no` — endre ved behov) |
| E-post | `hei@mardaldigital.no` i `index.html` / `personvern.html` |
| Sosiale lenker | `href="#"` i kontaktseksjonen (`class="socials"`) |
| Førre Bygg-bilder | SVG-mockups i `assets/img/` kan byttes med ekte skjermbilder |

## Publisere

Statisk side med gratis HTTPS: GitHub Pages (`.nojekyll` er med), Netlify, Vercel
eller Cloudflare Pages.
