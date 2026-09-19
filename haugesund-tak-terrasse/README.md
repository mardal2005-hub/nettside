# Haugesund Tak & Terrasse AS — nettside

Redaksjonell, mobilvennlig nettside for **Haugesund Tak & Terrasse AS** — lokal taktekker
i Haugesund, spesialist på Sarnafil og asfalt takbelegg.

Statisk side (HTML, CSS og litt JavaScript) uten rammeverk eller byggeprosess — rask og
enkel å hoste med gratis HTTPS.

> **Om innholdet:** Tekst og fakta bygger på firmaets eget materiale og offentlige
> registre (Brønnøysund/proff, 1881, gulesider, Takringen). Grafikkene er egendesignede
> illustrasjoner laget for demoen — ikke firmaets egne prosjekter — og bør byttes med
> ekte foto før lansering. Et lite «Demo»-merke i bunnen sier fra om dette.

## Design

- **Typografi:** Fraunces (display-serif) + Archivo (grotesk), lastet fra Google Fonts.
- **Palett:** varm kremhvit (`#efe8db`), varm sort (`#181310`) og «jernmønje»-rust (`#bd4a2b`).
- **Uttrykk:** redaksjonelt/asymmetrisk grid, hårfine linjer, mono-etiketter, nummerert
  tjeneste-indeks (trekkspill), marquee, teknisk «takoppbygging»-grafikk og et spesifikasjons-
  oppsett — for et byrå-preg fremfor mal.
- Tilgjengelig (tastatur, fokusmarkering, `prefers-reduced-motion`) og responsiv.
- SEO: meta, Open Graph og structured data (`RoofingContractor`).

## Struktur

```
.
├── index.html            # Forsiden (hero, om oss, tjenester, spec, referanser, kontakt)
├── css/styles.css        # Designsystemet
├── js/main.js            # Meny, sticky header, trekkspill, skjema
├── assets/img/           # Mark/favicon, hero-panel, prosjektgrafikk, OG-bilde (SVG)
├── .nojekyll             # For GitHub Pages
└── README.md
```

## Fakta og kilder

Fra **informasjonsbildet** (Google Drive): 25 års erfaring; kontaktpersoner Gary L. Clarke
(917 09 446 · glc@haugesundtakterrasse.no) og Jan Atle Riise (470 36 008 ·
jar@haugesundtakterrasse.no); åpningstider man–fre 07:00–15:00; haugesundtakterrasse.no.

Fra **offentlige registre**: Org.nr 924 720 646 · aksjeselskap stiftet 18.02.2020 ·
Stølevegen 11, 5514 Haugesund · spesialist på Sarnafil og asfalt takbelegg · blikkenslag ·
medlem av Takringen.

## Kjøre lokalt

```bash
python3 -m http.server 8000   # åpne http://localhost:8000
```

## Publisere med GitHub Pages

Settings → Pages → Deploy from a branch → `main` / `/ (root)`. `.nojekyll` er med.

## Før lansering

- Bytt illustrasjonene i `assets/img/` med ekte foto (legg et bredt hero-foto som
  `assets/img/hero-photo.jpg`).
- Koble skjemaet til en tjeneste (f.eks. Formspree) — bytt `action`-URL i `index.html`.
- Fjern «Demo»-merket i bunnen.
