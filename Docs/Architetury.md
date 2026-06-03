# Arquitetura do Projeto

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 15 (App Router) |
| Linguagem | TypeScript 5 |
| Estilização | Tailwind CSS v4 (CSS-first, sem `tailwind.config.ts`) |
| Animações | Framer Motion |
| Fontes | `next/font/google` — Archivo Black + Montserrat |

---

## Estrutura de Diretórios

```
src/
  app/
    page.tsx          ← apenas imports de Blocks, zero lógica de UI
    layout.tsx        ← fontes globais + metadata
    globals.css       ← @theme Tailwind v4 (cores, fontes)
  components/
    Blocks/           ← seções completas da página
    Ui/               ← componentes atômicos reutilizáveis
```

### Regra de camadas

```
page.tsx
  └── Blocks/         (seções: HomeBlock, ExperienceBlock, ...)
        └── Ui/       (átomos: Header, Footer, NavItem, ...)
```

- `page.tsx` **não** contém JSX de UI — só `<HomeBlock />`, `<ExperienceBlock />`, etc.
- `Blocks/` orquestra estado local e monta a seção com componentes de `Ui/`
- `Ui/` é stateless sempre que possível; recebe props, não acessa contexto global

---

## Tema (globals.css)

```css
@import "tailwindcss";

@theme {
  --color-dark:   #151515;   /* fundo principal */
  --color-cream:  #F4EDED;   /* accent/destaque  */
  --color-white:  #FEFEFE;   /* textos e ícones  */
  --color-muted:  #676767;   /* textos secundários */
  --color-light:  #FAFAFA;   /* fundos alternativos */

  --font-archivo:    "Archivo Black", sans-serif;   /* títulos */
  --font-montserrat: "Montserrat", sans-serif;      /* corpo   */
}
```

Classes geradas automaticamente pelo Tailwind v4:
`bg-dark`, `text-white`, `text-muted`, `font-archivo`, `font-montserrat`, etc.

---

## Seções (Páginas)

O site é uma única página (`/`) com múltiplas seções em scroll contínuo. Cada seção tem comportamento de scroll diferente:

| Seção | Bloco | Scroll |
|---|---|---|
| HOME | `HomeBlock` | Vertical normal — `100vh` |
| EXPERIÊNCIAS | `ExperienceBlock` | Horizontal hijackado — `N×100vh` de espaço vertical, conteúdo desliza lateralmente |
| (futura) | — | A definir |

### Scroll Hijacking (ExperienceBlock)

```
ExperienceBlock               height: N×100vh
  └── div sticky top-0        height: 100vh, overflow: hidden
        └── div flex row      width: N×100vw
              ├── Card 1
              ├── Card 2
              └── Card N
```

`useScroll({ target: ref })` → `scrollYProgress` [0–1]
`useTransform(scrollYProgress, [0,1], ["0%", "-(N-1)/N×100%"])` → `x` do row

---

## Convenções de Código

- Componentes `'use client'` apenas quando necessário (animações, eventos)
- Componentes puramente visuais sem estado ficam como Server Components
- Nenhum componente de `Ui/` importa outro de `Ui/` diretamente — composição feita nos `Blocks/`
- Props tipadas com `interface` local no próprio arquivo
- Sem barrel exports (`index.ts`) — imports diretos por caminho

---

## Dependências

```bash
framer-motion       # animações declarativas e scroll utilities
next/font/google    # já incluso no Next.js — sem install extra
```

---

## Changelog

| Data | Descrição |
|---|---|
| 2026-06-03 | Definição inicial da arquitetura — stack, estrutura de diretórios, tema, convenções |
