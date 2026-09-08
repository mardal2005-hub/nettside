# Haugesund Tak & Terrasse AS – demo-nettside

Moderne, mobilvennlig demo-nettside for **Haugesund Tak & Terrasse AS** – et lokalt
firma i Haugesund med 25 års erfaring med tak og terrasser.

> **Om innholdet:** Kun kontaktinfo, åpningstider og «25 års erfaring» er hentet fra
> kundens eget materiale. Alt annet (tjenestebeskrivelser, tekster og bilder) er
> eksempel-/plassholderinnhold som må bekreftes og tilpasses av firmaet før lansering.
> En egen infolinje øverst på siden sier tydelig fra om dette.

Siden er bygget som en statisk side (HTML, CSS og litt JavaScript) uten rammeverk eller
byggeprosess. Rask lastetid og enkel å hoste hvor som helst med gratis HTTPS.

> Dette er en **demo** som ligger i en egen undermappe, slik at den ikke rører den
> eksisterende siden i repoet. Den kan vises på egen adresse, f.eks.
> `…/haugesund-tak-terrasse/` på GitHub Pages.

## Struktur

```
haugesund-tak-terrasse/
├── index.html            # Hele forsiden (hero, tjenester, om oss, prosess, prosjekter, FAQ, kontakt)
├── css/styles.css        # All styling (palett: skifer + kobber + varm off-white)
├── js/main.js            # Meny, scroll-effekter, FAQ og skjemahåndtering
├── assets/img/           # Logo, hero, prosjektbilder, favicon, OG-bilde (SVG)
└── README.md
```

## Kjøre lokalt

```bash
cd haugesund-tak-terrasse
python3 -m http.server 8000
# åpne http://localhost:8000
```

## Innhold og kilder

Fra **informasjonsbildet** i Google Drive-mappen:

| Felt | Verdi |
|------|-------|
| Firma | Haugesund Tak & Terrasse AS |
| Erfaring | 25 år med tak og terrasser |
| Kontaktperson 1 | Gary L. Clarke · 917 09 446 · glc@haugesundtakterrasse.no |
| Kontaktperson 2 | Jan Atle Riise · 470 36 008 · jar@haugesundtakterrasse.no |
| Åpningstider | Mandag–fredag 07:00–15:00 |
| Nettadresse | haugesundtakterrasse.no |

Fra **offentlige registre** (proff.no, 1881.no, gulesider.no, 180.no, Takringen):

| Felt | Verdi |
|------|-------|
| Org.nr | 924 720 646 |
| Selskapsform | Aksjeselskap, stiftet 18.02.2020 |
| Adresse | Stølevegen 11, 5514 Haugesund |
| Ansatte | 1–4 |
| Spesialitet | Sarnafil og asfalt takbelegg (membran/taktekking) |
| Tjenester | Taktekking, membran, blikkenslagerarbeid, terrasse |
| Medlemskap | Takringen (bransjeforening for tak) |

> Ikke verifisert: Illustrasjonsbildene er laget for demoen og er **ikke** firmaets egne
> prosjekter. Bytt dem med ekte foto før lansering.

## Ting som bør fylles inn før lansering

| Hva | Hvor | Merket med |
|-----|------|-----------|
| **Tjenestebeskrivelse** | Seksjonen «Det vi driver med» | Plassholdertekst |
| **Ekte foto** | `assets/img/` (hero + eksempler) | Illustrasjons-SVG-er i dag |
| **Kontaktskjema** | `index.html` (`action="…your-form-id"`) | Formspree-ID |
| **Adresse/org.nr** | `index.html` (structured data + footer) | – |
| **Fjerne demo-linjen** | Infolinjen øverst i `index.html` (`.demo-bar`) | Fjernes ved lansering |

### Hero-bilde (bakgrunn øverst)

Legg et liggende foto i `assets/img/hero-photo.jpg`, så vises det automatisk øverst på
siden (JavaScript oppdager filen og bytter fra SVG-illustrasjonen). Anbefalt ca.
1920×1080 px eller større. Et mørkt sjikt legges automatisk over så teksten er lesbar.

### Prosjektbilder

Bytt ut `assets/img/prosjekt-*.svg` med ekte foto (samme filnavn, eller oppdater
`src` i `index.html`). Format 4:3 gir best resultat i galleriet.

### Kontaktskjema

Skjemaet fungerer med en gang: uten skjematjeneste åpner det e-postprogrammet med en
ferdig utfylt melding til `glc@haugesundtakterrasse.no`.

For å motta forespørsler automatisk, koble til en gratis tjeneste som
[Formspree](https://formspree.io):

1. Opprett et skjema og kopier skjema-ID-en.
2. Bytt ut `action="https://formspree.io/f/your-form-id"` i `index.html` med din egen URL.

JavaScript sender da skjemaet i bakgrunnen og viser en takkemelding.

## Design

- **Palett:** skifer/mørk blågrå (`#14202e`), kobber (`#d97a34`) og varm off-white (`#f6f4f0`)
- Runde knapper, tydelige overskrifter og ikoner ved hver tjeneste
- Responsivt og mobilvennlig, med hensyn til `prefers-reduced-motion`
- **SEO:** meta-tagger, Open Graph, strukturert data (RoofingContractor/LocalBusiness)
- Tilgjengelighet: «hopp til innhold», synlig fokusmarkering, ARIA på meny og FAQ
