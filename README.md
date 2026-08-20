# Grønås Bygg – nettside (demo)

Profesjonell, mobilvennlig nettside-demo for **Grønås Bygg** – tømrer- og
byggetjenester i Haugesund og omegn.

Dette er en **salgsdemo** som skal vise hvordan en ferdig nettside for Grønås Bygg
kan se ut. Siden er ~90–95 % ferdig; innhold som må bekreftes av eieren er tydelig
merket i koden og diskret på siden.

Bygget som en statisk side (HTML, CSS og litt vanilla JavaScript) uten rammeverk
eller byggeprosess. Det gir rask lastetid og enkel hosting hvor som helst.

## Struktur

```
.
├── index.html            # Hele forsiden (hero, intro, tjenester, prosjekter, om oss, kontakt)
├── personvern.html       # Personvernerklæring
├── css/styles.css        # All styling (palett: sand, nær sort, mørk brun, jordfarget aksent)
├── js/main.js            # Navbar-scroll, mobilmeny, reveal, lightbox, skjema
├── assets/img/           # SVG-demobilder (hero, tjenester, prosjekter, portrett)
├── robots.txt            # SEO
├── sitemap.xml           # SEO
└── .nojekyll             # Sikrer at alle filer serveres på GitHub Pages
```

## Kjøre lokalt

```bash
python3 -m http.server 8000
# åpne http://localhost:8000
```

## Design

- **Palett:** varm off-white/sand, nær sort tekst, mørk brun sekundær, jordfarget aksent (treverk + arkitektur).
- **Typografi:** Fraunces (serif) til overskrifter, Inter (sans-serif) til brødtekst.
- **Animasjon:** diskré fade/translate ved scroll, rolig zoom på bilder, navbar bytter bakgrunn ved scroll. Respekterer `prefers-reduced-motion`.
- **Responsivt:** testet for desktop (1440), laptop (1366), tablet (768) og mobil (390/375). Ingen horisontal scrolling.
- **SEO/tilgjengelighet:** semantisk HTML, korrekt H1/H2-hierarki, alt-tekst, `lazy` bilder, JSON-LD (GeneralContractor), skip-link, tastaturnavigasjon.

## Bekreftede fakta som er brukt

- Grønås Bygg, Haugesund
- Enkeltpersonforetak – oppføring av bygninger
- Innehaver: Espen Grønås
- Etablert 2022
- Sentralt godkjent (uten å antyde godkjenningsområder)
- Org.nr. 929 612 671 (i footer)
- Telefon: 98 60 69 50

## Demo-innhold som skal fylles inn / erstattes

Søk i koden etter disse for å finne dem raskt:

| Hva | Hvor | Merket med |
|-----|------|-----------|
| **Prosjekt- og tjenestebilder** | `assets/img/*.svg` | `demo-tag` / «Demo – byttes med egne prosjektbilder» |
| **Portrett av innehaver** | `assets/img/portrait.svg` | «Plassholder – byttes med eget bilde» |
| **Tjenester** | `index.html` (`#tjenester`) | «Demo-innhold – tjenestene tilpasses …» |
| **Kontaktskjema → e-post** | `index.html` / `js/main.js` | «Demo – skjemaet kobles til e-post ved lansering.» |
| **Domene** | `index.html` (canonical/OG), `robots.txt`, `sitemap.xml` | `gronasbygg.no` (plassholder) |

## Bevisste valg for troverdighet

Det er **ikke** funnet opp kundeanmeldelser, antall år erfaring, antall ansatte,
prosjekttall, sertifiseringer, priser eller garantier. Der informasjon mangler, er
det brukt tydelige plassholdere som fylles inn etter avklaring med eieren.

## Kontaktskjema ved lansering

Skjemaet er visuelt ferdig, men er ikke koblet til e-post i demoen. Ved lansering
kan det kobles til f.eks. [Formspree](https://formspree.io) eller en serverløsning
ved å sende feltene `navn`, `telefon`, `epost`, `type` og `melding`.
