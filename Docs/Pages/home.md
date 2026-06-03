# HOME — Documentação de Implementação

## Visão Geral

Primeira seção do portfólio. Sem Scroll por enquanto, altura `100vh`. Serve como apresentação do dev com username, logo e links sociais. Fundo escuro (`#151515`) com código JS animado no plano de fundo.

---

## Mapa de Componentes

```
page.tsx
└── HomeBlock              (Blocks/HomeBlock.tsx)
    ├── Header             (Ui/Header.tsx)
    │   ├── [ícones sociais: GitHub, LinkedIn, Gmail]
    │   └── HamburgerButton (Ui/HamburgerButton.tsx)
    ├── NavDrawer          (Blocks/NavDrawer.tsx)
    │   └── NavItem × N   (Ui/NavItem.tsx)
    ├── CodeBackground     (Ui/CodeBackground.tsx)
    ├── HeroContent        (Ui/HeroContent.tsx)
    │   ├── [Username + stroke text]
    │   ├── [Logo SVG]
    │   └── [Botão Download Currículo]
    └── Footer             (Ui/Footer.tsx)
        ├── [Texto de attribution com link GitHub]
        └── CircularProgress (Ui/CircularProgress.tsx)
```

---

## Componentes — Detalhes

### `Blocks/HomeBlock.tsx`
Container principal da seção HOME. Gerencia o estado `isDrawerOpen` e repassa para Header e NavDrawer. Posição `relative`, altura `100vh`, fundo `#151515`.

```tsx
'use client'
// estado: isDrawerOpen (boolean)
// renderiza: Header, NavDrawer, CodeBackground, HeroContent, Footer
```

---

### `Ui/Header.tsx`
Barra superior fixa. Transparente, `z-50`.

| Lado | Conteúdo |
|------|----------|
| Esquerda | Ícones SVG: GitHub, LinkedIn, Gmail — cor `#FEFEFE`, tamanho 24px |
| Direita | `<HamburgerButton />` |

---

### `Ui/HamburgerButton.tsx`
Botão toggle com 3 barras horizontais. Recebe `isOpen: boolean` e `onToggle: () => void`. Quando `isOpen`, anima para ícone de fechar (X) com Framer Motion.

---

### `Blocks/NavDrawer.tsx`
Overlay fullscreen que cobre toda a tela quando aberto.

- **Fundo**: `#151515`
- **Animação de entrada**: slide da direita para o centro (`x: "100%" → 0`) via Framer Motion `AnimatePresence`
- **Itens**: HOME, EXPERIÊNCIAS, CONTATO
- **Fonte**: Archivo Black, `~9rem` (ajustar para caber na tela)

---

### `Ui/NavItem.tsx`
Item de navegação individual dentro do drawer.

**Hover effect**:
1. Container tem `overflow: hidden`
2. Ao hoverar: fundo desliza para branco (`bg-white`), texto muda para `#151515`
3. O texto "cai" de cima para baixo suavemente — implementado com dois textos sobrepostos via clip + `y` transform do Framer Motion
4. Transição: `duration: 0.3s, ease: easeInOut`

---

### `Ui/CodeBackground.tsx`
Texto de código JS com syntax highlighting decorativo.

- **Posição**: `absolute right-0 top-0 h-full w-[55%]` — apenas lado direito
- **Opacidade**: `0.15` a `0.20` (muito sutil)
- **Conteúdo**: código JS/TS hardcoded em múltiplas linhas, com `<span>` coloridos por token type:
  - Keywords (`const`, `function`, `if`): `#7EB8F7` (azul pastel)
  - Strings: `#CE9178` (laranja pastel)
  - Comentários: `#6A9955` (verde pastel)
  - Padrão: `#D4D4D4` (cinza claro)
- **Animação**: `translateY` de `0` até `-50%` em loop infinito, `ease: "linear"`, ~30s de duração. O conteúdo é duplicado para loop seamless.
- **Font**: monospace, `text-xs` a `text-sm`, uppercase como na imagem
- `pointer-events: none`, `user-select: none`, `z-index: 0`

---

### `Ui/HeroContent.tsx`
Conteúdo central da HOME. Layout `flex justify-between items-center h-full px-16`.

**Lado esquerdo**:
- "USER" e "NAME" em linhas separadas
- Fonte: Archivo Black
- Tamanho: `~8rem` ou maior
- Efeito outline: `-webkit-text-stroke: 2px #FEFEFE`, `color: transparent` (texto vazado como na imagem)

**Lado direito**:
- Logo SVG (globo com 4 pontas — template padrão)
- Tamanho: ~200px × 200px
- Cor: `#FEFEFE`

**Abaixo do username** (esquerda):
- Botão `DOWNLOAD CURRÍCULO`
- Estilo: `border border-white text-white bg-transparent`
- Fonte: Montserrat, uppercase, `tracking-widest`
- Hover: `bg-white text-dark`
- Transição: `0.2s ease`

---

### `Ui/Footer.tsx`
Barra inferior fixa. Fundo semitransparente ou totalmente transparente, `z-50`.

| Lado | Conteúdo |
|------|----------|
| Esquerda | `® Template made by` + link GitHub do autor |
| Direita | `<CircularProgress />` |

Fonte: Montserrat, `text-sm`, cor `#676767`.

---

### `Ui/CircularProgress.tsx`
Indicador circular de progresso de scroll.

- SVG com um `circle` de raio ~24px
- `stroke-dasharray`: circunferência total (`2 × π × r`)
- `stroke-dashoffset`: calculado em tempo real — `circunferência × (1 - scrollProgress)`
- `scrollProgress` via `useScroll` do Framer Motion (scroll da página inteira)
- Cor do stroke: `#FEFEFE`
- Stroke width: 2px
- Fundo do circle (trilha): `#676767` com opacidade baixa

---

## Transição HOME → Experiências

A seção de Experiências fica logo abaixo da HOME no DOM. Quando o usuário chega ao fim da HOME e continua scrollando, o conteúdo da seção de Experiências se move horizontalmente (para a esquerda) em vez de verticalmente.

**Como funciona**:

```
<main>
  <HomeBlock />                    ← height: 100vh
  <ExperienceBlock />              ← height: 400vh (cria espaço de scroll)
    <div sticky top-0 h-screen>    ← fica preso no topo
      <div flex row>               ← row horizontal de cards
        [Card 1] [Card 2] [Card 3] [Card 4]
      </div>
    </div>
</main>
```

`useScroll({ target: experienceRef })` retorna `scrollYProgress` (0 → 1).
`useTransform(scrollYProgress, [0, 1], ["0%", "-75%"])` aplica no `x` do row.

A transição é suave e nativa — sem JS de scroll customizado, apenas interpolação CSS via Framer Motion.

---

## Paleta de Cores

| Variável | Hex | Uso |
|---|---|---|
| `--color-dark` | `#151515` | Fundo principal |
| `--color-cream` | `#F4EDED` | Destaque/accent |
| `--color-white` | `#FEFEFE` | Textos e elementos |
| `--color-muted` | `#676767` | Textos secundários |
| `--color-light` | `#FAFAFA` | Fundos alternativos |

---

## Tipografia

| Fonte | Uso | Variável CSS |
|---|---|---|
| Archivo Black | Títulos, username, nav items | `--font-archivo` |
| Montserrat | Corpo, botões, footer, labels | `--font-montserrat` |

---

## Dependências

- `framer-motion` — animações (drawer, CodeBackground loop, CircularProgress, hover de NavItem)
- `next/font/google` — carregamento das fontes (já incluso no Next.js)

---

## Arquivos a Criar/Modificar

| Arquivo | Ação |
|---|---|
| `src/app/globals.css` | Modificar — `@theme` com cores e fontes |
| `src/app/layout.tsx` | Modificar — Archivo Black + Montserrat via `next/font/google` |
| `src/app/page.tsx` | Modificar — apenas imports de Blocks |
| `src/components/Blocks/HomeBlock.tsx` | Criar |
| `src/components/Blocks/ExperienceBlock.tsx` | Criar (estrutura com scroll hijack) |
| `src/components/Blocks/NavDrawer.tsx` | Criar |
| `src/components/Ui/Header.tsx` | Criar |
| `src/components/Ui/HamburgerButton.tsx` | Criar |
| `src/components/Ui/HeroContent.tsx` | Criar |
| `src/components/Ui/CodeBackground.tsx` | Criar |
| `src/components/Ui/Footer.tsx` | Criar |
| `src/components/Ui/CircularProgress.tsx` | Criar |
| `src/components/Ui/NavItem.tsx` | Criar |
