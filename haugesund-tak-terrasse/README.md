# Haugesund Tak & Terrasse AS — nettside

Redaksjonell, mobilvennlig nettside for **Haugesund Tak & Terrasse AS** — lokal taktekker
i Haugesund, spesialist på Sarnafil og asfalt takbelegg.

Statisk side (HTML, CSS og litt JavaScript) uten rammeverk eller byggeprosess — rask og
enkel å hoste med gratis HTTPS.

> **Om innholdet:** Tekst og fakta bygger på firmaets eget materiale og offentlige
> registre (Brønnøysund/proff, 1881, gulesider, Google, Takringen). Hero- og
> referansebildene er firmaets egne prosjektfoto. Et lite «Demo»-merke i bunnen
> markerer at dette er en eksempelnettside.

## Design

- **Typografi:** Fraunces (display-serif) + Archivo (grotesk), lastet fra Google Fonts.
- **Palett:** merkevarefarger fra logoen — azurblå (`#1e82be`) og rød (`#cf2b2b`) på hvitt, med dyp marineblå (`#0e3252`) på mørke flater.
- **Uttrykk:** redaksjonelt/asymmetrisk grid, hårfine linjer, mono-etiketter, nummerert
  tjeneste-indeks (trekkspill), marquee, ekte prosjektfoto og et spesifikasjons-
  oppsett — for et byrå-preg fremfor mal.
- Tilgjengelig (tastatur, fokusmarkering, `prefers-reduced-motion`) og responsiv.
- SEO: meta, Open Graph og structured data (`RoofingContractor`).

## Struktur

```
.
├── index.html            # Forsiden (hero, om oss, tjenester, spec, referanser, kontakt)
├── css/styles.css        # Designsystemet
├── js/main.js            # Meny, sticky header, trekkspill, skjema
├── assets/img/foto/       # Prosjektfoto (hero + referanser)
├── assets/img/           # Logo (PNG), favicon, OG-bilde
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

- Koble skjemaet til en tjeneste (f.eks. Formspree) — bytt `action`-URL i `index.html`.
- Fjern «Demo»-merket i bunnen.
- Legg til flere prosjektfoto i `assets/img/foto/` ved behov.
