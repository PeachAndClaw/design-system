# Peach & Claw — règles d’identité v0.2

## Hiérarchie

1. **Emblème pêche/griffe** : symbole maître, seul ou avec le logotype.
2. **Logotype horizontal** : signature institutionnelle et en-têtes larges.
3. **Monogramme P/C Fusion enveloppante** : signature secondaire approuvée, espaces réduits hors favicon.
4. **Favicon** : emblème maître sur encre, jamais le monogramme.

## Variantes

- Sur fond encre : pêche `#F6C2AE`.
- Sur fond papier : encre `#0C090A`.
- Monochrome : noir ou blanc pur seulement si la production l’impose.
- L’avatar historique avec dégradé reste une variante illustrative ; le logo canonique est plat.

## Espace de protection

Conserver autour de l’emblème une marge minimale égale à la largeur d’une feuille supérieure. Aucun texte, cadre ou entaille décorative ne doit pénétrer cette zone.

## Tailles minimales

- Emblème numérique : 24 px minimum.
- Emblème imprimé : 8 mm minimum.
- Logotype horizontal : 280 px minimum.
- Sous 280 px, employer l’emblème ou le monogramme selon le contexte.

## Usages interdits

- Ne pas modifier les proportions ni redessiner la silhouette.
- Ne pas ajouter d’ombre, contour, extrusion ou verre.
- Ne pas recolorer avec un orange vitaminé.
- Ne pas placer la version pêche sur un fond de contraste insuffisant.
- Ne pas utiliser le monogramme comme symbole maître.

## Source et reproductibilité

Le fichier raster historique reste la source visuelle de l’emblème. `npm run build:logo` reconstruit ses SVG plats avec `scripts/vectorize-logo.js`.

Le logotype approuvé associe Fraunces 650 pour « Peach » et l’esperluette à Archivo Narrow 700 pour « Claw ». Les fichiers `wordmark-approved-*.svg` contiennent exclusivement des tracés : leur rendu ne dépend d’aucune police installée. `scripts/build_wordmark_outlined.py` documente la génération reproductible.
