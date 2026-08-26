# Haugaland Byggpartner AS — nettside

Ny, skreddersydd nettside for **Haugaland Byggpartner AS** — tømrer og entreprenør
med base på Kolnes, som jobber over hele Haugalandet og i Rogaland.

Designet er bygget fra bunnen av med en egen visuell identitet: et redaksjonelt,
arkitektonisk uttrykk med mørk «ink»-palett, varm «bone»-kontrast, merkevarens
slate-blå og en varm tømmer-oker som aksent. Store prosjektbilder, mye luft og
elegant typografi (Fraunces + Space Grotesk).

Siden er statisk (HTML, CSS og litt JavaScript) — ingen rammeverk eller
byggeprosess. Rask, enkel å hoste, og med automatisk HTTPS på GitHub Pages /
Netlify / Vercel / Cloudflare Pages.

## Struktur

```
.
├── index.html          # Hele forsiden (hero, intro, tjenester, prosjekter,
│                        #   hvorfor oss, om oss, område, anmeldelser, CTA, kontakt)
├── personvern.html     # Personvernerklæring
├── css/styles.css      # All styling + designsystem
├── js/main.js          # Meny, animasjoner, tellere, skjema
├── assets/img/         # Prosjektbilder + og-image (sosial deling)
├── favicon.svg         # HB-monogram
├── robots.txt · sitemap.xml · CNAME · .nojekyll
```

## Kjøre lokalt

```bash
python3 -m http.server 8000
# åpne http://localhost:8000
```

## Innhold som er lagt inn (hentet fra bedriftens egne kanaler)

| Felt | Verdi |
|------|-------|
| Slagord | Partner i alle bygg |
| Telefon | 407 41 934 |
| E-post | akbyggpartneras@gmail.com |
| Adresse | Skrevegen 69, 5541 Kolnes |
| Instagram | @haugaland_byggpartner_as |
| Google | 5,0 ★ (5 anmeldelser) |
| Område | Haugalandet & Rogaland |

Prosjektbildene er hentet og beskåret fra bedriftens Facebook/Google-profil.

## Ting du kan fylle inn / justere

Søk i koden etter disse:

- **Domene** — `index.html` (meta/canonical/OG), `robots.txt`, `sitemap.xml` og
  `CNAME` bruker `haugalandbyggpartner.no` som antatt domene. Bytt til det domenet
  dere faktisk eier, eller **slett `CNAME`** for å bruke standard `*.github.io`-adresse.
- **Org.nr.** — vises som `Org.nr. XXX XXX XXX` i footer og personvern. Bytt til
  riktig organisasjonsnummer.
- **Kontaktskjema** — se under.
- **Facebook-lenke** — footer peker på et Facebook-søk. Bytt til direkte side-URL
  når den er kjent.
- **Bedre bilder** — legg gjerne inn høyoppløste, rene prosjektfoto i `assets/img/`
  (behold samme filnavn) for enda skarpere resultat.

### Kontaktskjema

Skjemaet virker ut av boksen: uten skjematjeneste åpner det e-postprogrammet med en
ferdig utfylt melding til `akbyggpartneras@gmail.com`.

For å motta forespørsler automatisk, koble til en gratis tjeneste som
[Formspree](https://formspree.io):

1. Opprett et skjema og kopier skjema-ID-en.
2. I `index.html`, bytt `action="https://formspree.io/f/your-form-id"` med din URL.

JavaScript sender da skjemaet i bakgrunnen og viser en takkemelding.

## Design & teknikk

- Palett: ink `#141619`, bone `#f4f1ea`, slate `#33506b`, oker `#c69a5f`
- Typografi: Fraunces (display-serif) + Space Grotesk (UI/brødtekst) + JetBrains Mono (etiketter)
- Animasjoner: scroll-reveal, tellere, kinetisk hero, marquee, hover-bilder — alt
  respekterer `prefers-reduced-motion`
- 100 % responsivt (mobil → desktop)
- SEO: meta, Open Graph, `LocalBusiness`/`GeneralContractor` strukturert data,
  sitemap og robots.txt
