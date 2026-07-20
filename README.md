# Portfolio

Sitio de portfolio de una página para diseño gráfico, inspirado en la estructura
de [yesmaaike.com](https://yesmaaike.com): navegación fija con anclas a cada
categoría y una grilla de imágenes por sección.

## Paleta — tierras y verdes claros

| Color | Hex | Uso |
|---|---|---|
| Pergamino (fondo) | `#EDE7D9` | Fondo base |
| Panel | `#F7F4EA` | Tarjetas |
| Negro oliva (texto) | `#2B2A1F` | Texto principal |
| Terracota | `#A9623E` | Marketing |
| Tierra oscura | `#6B4A30` | Branding |
| Verde salvia | `#7C8B6F` | Web |
| Ocre / arena | `#C79D6E` | Ilustración |
| Verde bosque | `#4F5D3A` | Comics |
| Tierra media | `#8A6A4F` | Concept Art |
| Verde claro | `#9CAE87` | Diseño de Personaje |
| Marrón oscuro | `#59422E` | Motion & Storyboard |

## Secciones incluidas

1. Marketing
2. Branding
3. Web
4. Ilustración
5. Comics
6. Concept Art
7. Diseño de Personaje
8. Motion & Storyboard *(sugerencia agregada — guiones gráficos / animación)*
9. Sobre mí

Otras categorías que puedes sumar más adelante: **Packaging**, **Diseño editorial**,
**Murales / arte a gran formato**, **Type design / lettering**.

## Estructura

```
index.html
assets/
  css/style.css
  js/main.js
  img/            ← reemplaza los placeholders de picsum.photos por tus propias imágenes
```

## Cómo reemplazar los placeholders

- Todas las imágenes usan `https://picsum.photos/seed/...` como marcador de posición.
  Reemplaza cada `src` por la ruta a tu propia imagen en `assets/img/`.
- Los textos entre corchetes `[ ... ]` (hero, "Sobre mí") deben reemplazarse por tu
  contenido real.
- Actualiza el logo, el correo de contacto y los enlaces de redes sociales en el footer.

## Desarrollo local

No requiere build ni dependencias — es HTML/CSS/JS estático. Basta con abrir
`index.html` en el navegador, o servirlo con cualquier servidor estático
(por ejemplo `npx serve .`).
