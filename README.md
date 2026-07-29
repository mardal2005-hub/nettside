# Mardal Utleie – nettside

Moderne, stilren og mobilvennlig nettside for **Mardal Utleie** – utleie av bord,
klappstoler, partytelt og høyttalere.

Nettsiden er bygget som en statisk side (HTML, CSS og litt JavaScript) uten
rammeverk eller byggeprosess. Det gir rask lastetid og gjør den enkel å hoste hvor
som helst.

## Struktur

```
.
├── index.html            # Hele forsiden (hero, produkter, om oss, galleri, FAQ, kontakt)
├── css/styles.css        # All styling (palett: hvitt, mørk blå, gråtoner)
├── js/main.js            # Meny, skjemahåndtering og småfunksjoner
├── assets/img/           # Logo, hero-bilde, produkt- og galleribilder (SVG)
├── robots.txt            # SEO
├── sitemap.xml           # SEO
└── .nojekyll             # Sikrer at alle filer serveres på GitHub Pages
```

## Kjøre lokalt

Åpne `index.html` direkte i nettleseren, eller start en enkel lokal server:

```bash
python3 -m http.server 8000
# åpne http://localhost:8000
```

## Publisere (med HTTPS/SSL)

Siden er statisk og kan publiseres gratis med automatisk HTTPS:

- **GitHub Pages** – Slå på Pages for repoet (Settings → Pages). `.nojekyll` er allerede med.
- **Netlify / Vercel / Cloudflare Pages** – Dra og slipp mappen, eller koble til repoet.

Alle disse gir gratis SSL-sertifikat (HTTPS) automatisk.

## Ting som skal fylles inn senere

Søk gjerne i koden etter disse for å finne dem raskt:

| Hva | Hvor | Merket med |
|-----|------|-----------|
| **Telefonnummer** | `index.html` (kontakt + footer) | `+47 00 00 00 00` / `tel:+4700000000` |
| **Adresse** | `index.html` (kontakt) | «Legges inn senere» |
| **Priser** | `index.html` (produktkort) | «Pris på forespørsel» / `data-price` |
| **Facebook / Instagram** | `index.html` (kontakt + footer) | `class="social-link"` med `href="#"` |
| **Domene** | `index.html` (meta), `robots.txt`, `sitemap.xml` | `www.mardalutleie.no` |

### Kontaktskjema

Skjemaet fungerer ut av boksen: hvis ingen skjematjeneste er satt opp, åpner det
kundens e-postprogram med en ferdig utfylt melding til `booking@mardalutleie.no`.

For å motta forespørsler automatisk uten at kunden må ha e-postprogram, koble til en
gratis tjeneste som [Formspree](https://formspree.io):

1. Opprett et skjema hos Formspree og kopier skjema-ID-en.
2. I `index.html`, bytt ut `action="https://formspree.io/f/your-form-id"` med din egen
   URL.

JavaScript sender da skjemaet i bakgrunnen og viser en takkemelding.

## Legge til flere produkter

Kopiér et `<article class="product-card">`-element i produktseksjonen i `index.html`,
bytt ut bilde, tittel, beskrivelse og `data-product`-verdien. Legg gjerne til et nytt
alternativ i `<select id="product">` i kontaktskjemaet.

## Design

- Palett: hvitt, mørk blå (`#1e3a5f` / `#16243d`) og gråtoner
- Runde knapper, tydelige overskrifter, ikoner ved hver produktkategori
- Responsivt/mobilvennlig, med hensyn til `prefers-reduced-motion`
- SEO: meta-tagger, Open Graph, strukturert data (LocalBusiness), sitemap og robots.txt
