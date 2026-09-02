# BJ Kran og Transport AS – nettside

Moderne, mobilvennlig nettside for **BJ Kran og Transport AS** i Haugesund –
kranbil, kranoppdrag, transport og krokbil.

Bygget som en statisk side (HTML, CSS og litt JavaScript) uten rammeverk eller
byggeprosess. Rask lastetid og enkel å hoste hvor som helst (GitHub Pages,
Netlify, Vercel osv. – alle gir gratis HTTPS).

## Struktur

```
.
├── index.html            # Hele forsiden (hero, tjenester, utstyr, om oss, galleri, kontakt)
├── personvern.html       # Personvernerklæring
├── css/styles.css        # All styling (marineblå, hvitt, gråtoner, blå detaljer)
├── js/main.js            # Meny, galleri/lightbox, skjema, scroll-effekter
├── assets/img/           # Logo-merke, favicon og bilde-plassholdere (SVG)
├── robots.txt · sitemap.xml
├── CNAME                 # bjkran.no
└── .nojekyll
```

## ⭐ Legge inn de ekte bildene (viktig)

Nettsiden er satt opp med **navngitte bilde-plasser**. Frem til de ekte bildene
er lagt inn, vises stilrene industri-illustrasjoner (SVG) automatisk, så siden
ser aldri tom eller ødelagt ut. **Så snart du legger en JPG med riktig filnavn i
`assets/img/`, vises den automatisk** – du trenger ikke endre noe i koden.

Last opp bildene fra Facebook slik (behold nøyaktig filnavn, kun selve fotografiet
– beskjær bort de svarte kantene først):

| Filnavn (`assets/img/…`) | Hvor det vises | Anbefalt bilde |
|--------------------------|----------------|----------------|
| `hero-trucks.jpg` | **Hero** (toppen) | De tre kranbilene – det beste bildet. Liggende, ca. 1920×1080 px |
| `crane-hiab.jpg` | Stor bildeseksjon «Når lasten skal på plass» | Kranbil med rød HIAB-kran foran bygget |
| `crane-white.jpg` | Utstyr-seksjonen | Den hvite kranbilen |
| `fleet.jpg` | Om oss | Flere lastebiler / dronebilde av området |
| `gallery-1.jpg` | Galleri (stort felt) | Beste kranarbeid-bilde |
| `gallery-2.jpg` … `gallery-6.jpg` | Galleri | Kranbiler, kranarbeid, transport, utstyr, område, det mørke BJ Kran-bildet |
| `og-image.jpg` | Delingsbilde (Facebook/Google, 1200×630 px) | Valgfritt – et representativt bilde |

Tips: liggende bilder fungerer best i hero og bredfelt; galleriet håndterer både
stående og liggende. Bildene beskjæres pent automatisk (`object-fit: cover`).

### Bytte ut logoen

Firmaets egen logo kan legges inn ved å erstatte `assets/img/mark.svg`
(kvadratisk merke ved siden av navnet i header og footer). Behold filnavnet.

## Kontaktskjema

Skjemaet fungerer ut av boksen: er ingen skjematjeneste satt opp, åpnes kundens
e-postprogram med en ferdig utfylt melding til `post@bjkran.no`.

For å motta forespørsler automatisk (uten at kunden trenger e-postprogram), koble
til en gratis tjeneste som [Formspree](https://formspree.io):

1. Opprett et skjema hos Formspree og kopier skjema-URL-en.
2. I `index.html`, bytt ut `action="https://formspree.io/f/your-form-id"` med din
   egen URL. JavaScript sender da skjemaet i bakgrunnen og viser en takkemelding.

## Facebook-lenke

Footeren lenker til firmaets Facebook-side. Sjekk at URL-en i `index.html`
(`class="social-link"`) peker til riktig side.

## Kjøre lokalt

```bash
python3 -m http.server 8000
# åpne http://localhost:8000
```

## Firmainformasjon (på siden)

- Etablert 14.02.2011 · Org.nr. 996 631 001
- Bokngata 11, 5537 Haugesund
- Telefon 982 04 372 · post@bjkran.no
- Åpningstid man–fre 07:00–16:00
- 3 kranbiler (50 / 60 / 85 TM), krokbil, rekkevidde opptil 33,5 m

## Design

- Palett: marineblå (`#0f2438` / `#12283f`), hvitt, gråtoner, blå detalj (`#2f88cf`)
- Typografi: Oswald (overskrifter) + Inter (brødtekst)
- Responsivt/mobilvennlig, hamburger-meny, klikkbart telefonnummer, bilde-lightbox
- SEO: meta-tagger, Open Graph, strukturert data (LocalBusiness), sitemap og robots.txt
