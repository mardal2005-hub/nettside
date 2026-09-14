# O.J. Miljeteig AS – nettside

Moderne, mobilvennlig nettside for **O.J. Miljeteig AS** – autorisert entreprenør
innen graving, grunnarbeid, drenering, VA og massetransport.

Siden er en statisk side (HTML, CSS og litt JavaScript) uten rammeverk eller
byggeprosess. Det gir rask lastetid og enkel hosting hvor som helst.

> Denne mappa (`oj-miljeteig/`) er en egen, selvstendig nettside og påvirker
> ikke resten av repoet.

## Struktur

```
oj-miljeteig/
├── index.html          # Hele forsiden (hero, tjenester, prosess, om oss, galleri, kontakt)
├── personvern.html     # Personvernerklæring
├── css/styles.css      # All styling (palett: skogsgrønn, sort, lyse nøytraler)
├── js/main.js          # Meny, animasjoner, galleri-lightbox og skjema
├── assets/img/         # Logo og prosjektbilder
├── robots.txt          # SEO
└── sitemap.xml         # SEO
```

## Kjøre lokalt

```bash
cd oj-miljeteig
python3 -m http.server 8000
# åpne http://localhost:8000
```

## Ting som skal fylles inn (plassholdere)

Søk i koden etter disse og bytt dem ut. De står med hakeparentes så de er lette å finne:

| Plassholder | Betyr | Hvor |
|-------------|-------|------|
| `[TELEFON]` | Telefonnummer (også i `tel:`-lenker) | index.html, personvern.html |
| `[E-POST]` | E-postadresse (også i `mailto:`) | index.html, js/main.js, personvern.html |
| `[OMRÅDE]` | Område/kommune dere jobber i | index.html, personvern.html |
| `[ORG.NR]` | Organisasjonsnummer | index.html (footer), personvern.html |
| `[ÅR]+`, `[ANTALL]+` | Års erfaring / antall prosjekter (Om oss) | index.html |
| `[KL. 07–16]` | Åpningstider | index.html (kontakt) |
| `[DATO]` | Dato for personvernerklæring | personvern.html |
| `ojmiljeteig.no` | Riktig domene | meta-tagger, robots.txt, sitemap.xml |

Tips: åpne `index.html` i en editor og bruk «søk og erstatt» på hver plassholder.

## Kontaktskjema

Skjemaet virker ut av boksen: er ingen skjematjeneste satt opp, åpner det
kundens e-postprogram med en ferdig melding til `[E-POST]`.

For å motta forespørsler automatisk (uten at kunden trenger e-postprogram),
koble til gratistjenesten [Formspree](https://formspree.io):

1. Opprett et skjema hos Formspree og kopier skjema-ID-en.
2. I `index.html`, bytt ut `action="https://formspree.io/f/your-form-id"` med din egen URL.

JavaScripten sender da skjemaet i bakgrunnen og viser en takkemelding.

## Bilder

Prosjektbildene i `assets/img/` er hentet fra bedriftens eget materiale.
Vil du bytte et bilde, erstatt filen med samme navn (samme størrelse/format
anbefales). Hero-bildet er `hero.jpg`.

## Publisere (med gratis HTTPS)

Siden er statisk og kan publiseres gratis:

- **GitHub Pages** – legg siden i eget repo (eller pek Pages mot denne mappa).
- **Netlify / Vercel / Cloudflare Pages** – dra og slipp mappa, eller koble til repoet.

Alle gir gratis SSL-sertifikat (HTTPS) automatisk.

## Design

- Palett: skogsgrønn (`#1e7a37`), varm sort (`#16211a`) og lyse nøytraler
- Typografi: Sora (overskrifter) + Inter (brødtekst)
- Responsiv/mobilvennlig, med hensyn til `prefers-reduced-motion`
- SEO: meta-tagger, Open Graph, strukturert data (GeneralContractor), sitemap og robots.txt
