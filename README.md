# CraftUI — Complete Production System README
> **The developer-owned, Tailwind-native UI component system built for modern React applications.**
> Zero lock-in. Full customization. Production-ready from day one.

---

## Table of Contents

1. [Project Vision & Philosophy](#1-project-vision--philosophy)
2. [What Makes CraftUI Different](#2-what-makes-craftui-different)
3. [System Architecture Overview](#3-system-architecture-overview)
4. [Monorepo Structure (Full)](#4-monorepo-structure-full)
5. [Tech Stack — Every Tool Justified](#5-tech-stack--every-tool-justified)
6. [Getting Started — Bootstrap Commands](#6-getting-started--bootstrap-commands)
7. [Turborepo Setup (Step-by-Step)](#7-turborepo-setup-step-by-step)
8. [Package: `packages/ui` — Component Templates](#8-package-packagesui--component-templates)
9. [Complete Component List with Variants & API](#9-complete-component-list-with-variants--api)
10. [Theming System (CSS Variables + Tailwind)](#10-theming-system-css-variables--tailwind)
11. [Variants System with CVA](#11-variants-system-with-cva)
12. [Forms System (Zod + React Hook Form)](#12-forms-system-zod--react-hook-form)
13. [Accessibility Layer](#13-accessibility-layer)
14. [Composition Patterns](#14-composition-patterns)
15. [Package: `packages/cli` — Full CLI Architecture](#15-package-packagescli--full-cli-architecture)
16. [CLI Commands (Deep Spec)](#16-cli-commands-deep-spec)
17. [Package: `packages/registry` — Component Registry](#17-package-packagesregistry--component-registry)
18. [Package: `packages/config` — Shared Configs](#18-package-packagesconfig--shared-configs)
19. [Package: `packages/utils` — Utility Functions](#19-package-packagesutils--utility-functions)
20. [App: `apps/docs` — Documentation Site](#20-app-appsdocs--documentation-site)
21. [App: `apps/playground` — Live Sandbox](#21-app-appsplayground--live-sandbox)
22. [Testing Strategy (Unit + A11y + Visual)](#22-testing-strategy-unit--a11y--visual)
23. [TypeScript Configuration](#23-typescript-configuration)
24. [ESLint + Prettier Setup](#24-eslint--prettier-setup)
25. [Changesets & Versioning](#25-changesets--versioning)
26. [Publishing to npm](#26-publishing-to-npm)
27. [CI/CD Pipeline (GitHub Actions)](#27-cicd-pipeline-github-actions)
28. [Deployment — Docs & Playground](#28-deployment--docs--playground)
29. [Performance Optimization](#29-performance-optimization)
30. [Component Design Patterns (with Code)](#30-component-design-patterns-with-code)
31. [Full Component Source Code — All Core Components](#31-full-component-source-code--all-core-components)
32. [Theme Generator CLI Feature](#32-theme-generator-cli-feature)
33. [Documentation Site Architecture](#33-documentation-site-architecture)
34. [Roadmap: V1 → V2 → V3](#34-roadmap-v1--v2--v3)
35. [Project Execution Plan (Week by Week)](#35-project-execution-plan-week-by-week)
36. [Common Pitfalls to Avoid](#36-common-pitfalls-to-avoid)
37. [Launch Strategy](#37-launch-strategy)
38. [Master Prompt — Generate Full Project in One Shot](#38-master-prompt--generate-full-project-in-one-shot)

---

## 1. Project Vision & Philosophy

### What is CraftUI?

CraftUI is a **developer-owned, Tailwind-native, copy-paste UI component system** for React and Next.js. It is NOT a traditional component library you install as a dependency. Instead, CraftUI works like this:

1. You run the CLI
2. The CLI copies production-ready, fully typed component source code into your project
3. You own the code — edit it, extend it, delete it
4. No runtime lock-in. No version hell. No black boxes.

### Core Philosophy

| Principle | What it means |
|-----------|---------------|
| **Developer Ownership** | Every component lives in YOUR codebase, not inside `node_modules` |
| **Zero Lock-in** | No runtime dependency on CraftUI after install |
| **Tailwind Native** | Built with Tailwind CSS utility classes, no CSS-in-JS |
| **Composable First** | Small, flexible primitives over rigid monolithic components |
| **Accessibility Always** | WCAG 2.1 AA compliance out of the box |
| **TypeScript Everywhere** | 100% typed. No escape hatches. |
| **DX Above All** | The developer experience is a feature, not an afterthought |

### Who is this for?

- Frontend engineers building production React/Next.js apps
- Teams that want a consistent design system without framework lock-in
- Developers who are tired of fighting with Material UI customization
- Startups and indie hackers who want professional UI without a designer

### What problem does it solve?

| Problem | How CraftUI solves it |
|---------|----------------------|
| Material UI is too opinionated | You own the source — change anything |
| Chakra UI has runtime overhead | Zero runtime dependency after install |
| shadcn/ui is amazing but still evolving | CraftUI builds on the same model but goes deeper |
| Radix is headless — too much work | CraftUI ships with design already applied |
| Starting from scratch is slow | CLI install in seconds, customize after |

---

## 2. What Makes CraftUI Different

### The Core Differentiator

```
Other UI libraries:    YOU → import → library → black box → rendered UI
CraftUI:               YOU → CLI → source code in YOUR project → YOUR UI
```

### Comparison Table

| Feature | Material UI | Chakra UI | shadcn/ui | **CraftUI** |
|---------|-------------|-----------|-----------|------------|
| Runtime dependency | ✅ Heavy | ✅ Medium | ❌ None | ❌ None |
| Tailwind native | ❌ | ❌ | ✅ | ✅ |
| Copy-paste model | ❌ | ❌ | ✅ | ✅ |
| TypeScript | ✅ | ✅ | ✅ | ✅ |
| Full source ownership | ❌ | ❌ | ✅ | ✅ |
| CLI install | ❌ | ❌ | ✅ | ✅ |
| Dark mode | ✅ | ✅ | ✅ | ✅ |
| Accessibility | Medium | Good | Good | **First-class** |
| Forms integration | Plugin | Plugin | Manual | **Built-in** |
| Composition API | Limited | Limited | Partial | **Full** |
| Theme generator | ❌ | ❌ | ❌ | ✅ |
| Component registry | ❌ | ❌ | ✅ | ✅ |

---

## 3. System Architecture Overview

```
CraftUI System
│
├── packages/
│   ├── ui/              ← Component source templates
│   ├── cli/             ← npx craftui CLI tool
│   ├── registry/        ← Component metadata & dependency graph
│   ├── config/          ← Shared ESLint, TS, Tailwind configs
│   └── utils/           ← Shared utility functions (cn, etc.)
│
├── apps/
│   ├── docs/            ← Next.js documentation site
│   └── playground/      ← Vite-based live component sandbox
│
└── tooling/
    ├── .github/         ← CI/CD workflows
    └── scripts/         ← Build & publish scripts
```

### Data Flow

```
Developer runs: npx craftui add button

CLI reads:      packages/registry/components/button.json
CLI fetches:    packages/ui/components/button/button.tsx
CLI writes:     {user-project}/components/ui/button.tsx
CLI installs:   dependencies listed in registry (e.g., class-variance-authority)
CLI updates:    tailwind.config.ts if needed
```

---

## 4. Monorepo Structure (Full)

```
craftui/
│
├── apps/
│   ├── docs/
│   │   ├── app/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── docs/
│   │   │   │   ├── [slug]/
│   │   │   │   │   └── page.tsx
│   │   │   ├── components/
│   │   │   │   ├── sidebar.tsx
│   │   │   │   ├── header.tsx
│   │   │   │   ├── component-preview.tsx
│   │   │   │   ├── code-block.tsx
│   │   │   │   ├── props-table.tsx
│   │   │   │   └── copy-button.tsx
│   │   ├── content/
│   │   │   ├── docs/
│   │   │   │   ├── getting-started.mdx
│   │   │   │   ├── installation.mdx
│   │   │   │   ├── theming.mdx
│   │   │   │   ├── cli.mdx
│   │   │   │   └── components/
│   │   │   │       ├── button.mdx
│   │   │   │       ├── input.mdx
│   │   │   │       └── ...
│   │   ├── public/
│   │   ├── next.config.ts
│   │   ├── tailwind.config.ts
│   │   └── package.json
│   │
│   └── playground/
│       ├── src/
│       │   ├── App.tsx
│       │   ├── examples/
│       │   │   ├── ButtonExample.tsx
│       │   │   ├── FormExample.tsx
│       │   │   └── ...
│       ├── vite.config.ts
│       ├── tailwind.config.ts
│       └── package.json
│
├── packages/
│   ├── ui/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── button/
│   │   │   │   │   ├── button.tsx
│   │   │   │   │   ├── button.test.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── input/
│   │   │   │   │   ├── input.tsx
│   │   │   │   │   ├── input.test.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── modal/
│   │   │   │   │   ├── modal.tsx
│   │   │   │   │   ├── modal.test.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── textarea/
│   │   │   │   ├── select/
│   │   │   │   ├── checkbox/
│   │   │   │   ├── radio/
│   │   │   │   ├── switch/
│   │   │   │   ├── label/
│   │   │   │   ├── badge/
│   │   │   │   ├── avatar/
│   │   │   │   ├── card/
│   │   │   │   ├── tooltip/
│   │   │   │   ├── popover/
│   │   │   │   ├── drawer/
│   │   │   │   ├── tabs/
│   │   │   │   ├── accordion/
│   │   │   │   ├── table/
│   │   │   │   ├── toast/
│   │   │   │   ├── alert/
│   │   │   │   ├── progress/
│   │   │   │   ├── spinner/
│   │   │   │   ├── skeleton/
│   │   │   │   ├── separator/
│   │   │   │   ├── breadcrumb/
│   │   │   │   ├── dropdown-menu/
│   │   │   │   ├── command/
│   │   │   │   ├── combobox/
│   │   │   │   ├── date-picker/
│   │   │   │   ├── form/
│   │   │   │   │   ├── form.tsx
│   │   │   │   │   ├── form-field.tsx
│   │   │   │   │   ├── form-label.tsx
│   │   │   │   │   ├── form-message.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── navbar/
│   │   │   │   ├── sidebar/
│   │   │   │   └── layout/
│   │   │   │       ├── container.tsx
│   │   │   │       ├── grid.tsx
│   │   │   │       └── stack.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── use-disclosure.ts
│   │   │   │   ├── use-click-outside.ts
│   │   │   │   ├── use-media-query.ts
│   │   │   │   ├── use-toast.ts
│   │   │   │   └── index.ts
│   │   │   ├── lib/
│   │   │   │   ├── cn.ts
│   │   │   │   └── utils.ts
│   │   │   └── index.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   ├── cli/
│   │   ├── src/
│   │   │   ├── index.ts          ← CLI entry point
│   │   │   ├── commands/
│   │   │   │   ├── init.ts
│   │   │   │   ├── add.ts
│   │   │   │   ├── remove.ts
│   │   │   │   ├── list.ts
│   │   │   │   ├── diff.ts
│   │   │   │   └── theme.ts
│   │   │   ├── utils/
│   │   │   │   ├── detect-framework.ts
│   │   │   │   ├── detect-typescript.ts
│   │   │   │   ├── detect-tailwind.ts
│   │   │   │   ├── file-writer.ts
│   │   │   │   ├── dependency-installer.ts
│   │   │   │   ├── config-reader.ts
│   │   │   │   └── registry-fetcher.ts
│   │   │   └── templates/
│   │   │       ├── tailwind.config.ts.tpl
│   │   │       ├── globals.css.tpl
│   │   │       └── craftui.config.json.tpl
│   │   ├── bin/
│   │   │   └── craftui.js
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   ├── registry/
│   │   ├── src/
│   │   │   ├── index.ts
│   │   │   ├── types.ts
│   │   │   └── components/
│   │   │       ├── button.json
│   │   │       ├── input.json
│   │   │       ├── modal.json
│   │   │       └── ...
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   ├── config/
│   │   ├── eslint/
│   │   │   ├── base.js
│   │   │   ├── react.js
│   │   │   └── next.js
│   │   ├── typescript/
│   │   │   ├── base.json
│   │   │   ├── react.json
│   │   │   └── nextjs.json
│   │   ├── tailwind/
│   │   │   └── base.ts
│   │   └── package.json
│   │
│   └── utils/
│       ├── src/
│       │   ├── cn.ts
│       │   ├── format.ts
│       │   ├── types.ts
│       │   └── index.ts
│       ├── tsconfig.json
│       └── package.json
│
├── tooling/
│   ├── .github/
│   │   └── workflows/
│   │       ├── ci.yml
│   │       ├── release.yml
│   │       └── preview.yml
│   └── scripts/
│       ├── build-registry.ts
│       └── sync-versions.ts
│
├── .changeset/
│   └── config.json
├── turbo.json
├── package.json
├── pnpm-workspace.yaml
└── README.md
```

---

## 5. Tech Stack — Every Tool Justified

### Monorepo Management
| Tool | Why |
|------|-----|
| **Turborepo** | Parallel builds, smart caching, task pipeline. Fastest monorepo tool available |
| **pnpm** | Disk-efficient, strict node_modules, workspace support |

### Frontend
| Tool | Why |
|------|-----|
| **React 18+** | Industry standard, concurrent features, server components ready |
| **TypeScript 5+** | Type safety everywhere, better DX, eliminates runtime bugs |
| **Tailwind CSS v3** | Utility-first, no runtime, perfect for copy-paste model |
| **class-variance-authority (CVA)** | Type-safe variant system for components |
| **clsx + tailwind-merge** | Safely merge Tailwind classes without conflicts |
| **Radix UI Primitives** | Headless accessible primitives for complex components (Modal, Select, etc.) |

### Forms
| Tool | Why |
|------|-----|
| **React Hook Form** | Best-in-class form management, minimal re-renders |
| **Zod** | Runtime validation + TypeScript type inference |

### CLI
| Tool | Why |
|------|-----|
| **Commander.js** | CLI framework, clean API |
| **Inquirer.js** | Interactive prompts |
| **fs-extra** | Enhanced filesystem operations |
| **ora** | Spinner/loading indicators |
| **chalk** | Terminal color output |
| **tsup** | Bundle the CLI to a single JS file |

### Docs
| Tool | Why |
|------|-----|
| **Next.js 14+** | App Router, MDX, fast static site |
| **Contentlayer / next-mdx-remote** | MDX processing pipeline |
| **Shiki** | Beautiful syntax highlighting |
| **Fumadocs / custom** | Docs layout system |

### Testing
| Tool | Why |
|------|-----|
| **Vitest** | Fast unit testing, works with Vite ecosystem |
| **Testing Library** | DOM testing, accessibility-focused |
| **jest-axe** | Automated accessibility testing |
| **Playwright** | E2E testing for docs/playground |

### Tooling
| Tool | Why |
|------|-----|
| **Changesets** | Versioning and changelog for monorepo packages |
| **ESLint** | Linting, enforces code quality |
| **Prettier** | Code formatting |
| **Husky + lint-staged** | Pre-commit hooks |

---

## 6. Getting Started — Bootstrap Commands

Run these commands in order to set up the full CraftUI monorepo from scratch.

```bash
# 1. Create root directory
mkdir craftui && cd craftui

# 2. Initialize pnpm workspace
pnpm init

# 3. Create workspace config
cat > pnpm-workspace.yaml << EOF
packages:
  - "apps/*"
  - "packages/*"
EOF

# 4. Install Turborepo
pnpm add -D turbo -w

# 5. Initialize Turborepo
npx turbo init

# 6. Create package directories
mkdir -p apps/docs apps/playground
mkdir -p packages/ui packages/cli packages/registry packages/config packages/utils

# 7. Create apps
cd apps/docs && npx create-next-app@latest . --typescript --tailwind --eslint --app
cd ../../apps/playground && npm create vite@latest . -- --template react-ts

# 8. Initialize packages
for pkg in ui cli registry config utils; do
  cd ../../packages/$pkg
  pnpm init
  mkdir -p src
  cd ../../
done

# 9. Install shared dev dependencies at root
pnpm add -D typescript eslint prettier husky lint-staged -w

# 10. Install Changesets
pnpm add -D @changesets/cli -w
npx changeset init
```

---

## 7. Turborepo Setup (Step-by-Step)

### Root `package.json`

```json
{
  "name": "craftui",
  "private": true,
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "lint": "turbo run lint",
    "test": "turbo run test",
    "format": "prettier --write \"**/*.{ts,tsx,md}\"",
    "clean": "turbo run clean",
    "changeset": "changeset",
    "version-packages": "changeset version",
    "release": "turbo run build --filter=@craftui/cli && changeset publish"
  },
  "devDependencies": {
    "turbo": "^2.0.0",
    "typescript": "^5.4.0",
    "prettier": "^3.2.0",
    "eslint": "^8.57.0",
    "husky": "^9.0.0",
    "lint-staged": "^15.0.0",
    "@changesets/cli": "^2.27.0"
  },
  "engines": {
    "node": ">=18.0.0",
    "pnpm": ">=8.0.0"
  }
}
```

### `turbo.json`

```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**", "!.next/cache/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "outputs": []
    },
    "test": {
      "outputs": ["coverage/**"],
      "inputs": ["src/**/*.tsx", "src/**/*.ts", "test/**/*.ts"]
    },
    "clean": {
      "cache": false
    }
  }
}
```

---

## 8. Package: `packages/ui` — Component Templates

### `packages/ui/package.json`

```json
{
  "name": "@craftui/ui",
  "version": "0.0.1",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "scripts": {
    "lint": "eslint src/",
    "test": "vitest run",
    "test:watch": "vitest",
    "clean": "rm -rf dist"
  },
  "dependencies": {
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-popover": "^1.0.7",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-tooltip": "^1.0.7",
    "@radix-ui/react-checkbox": "^1.0.4",
    "@radix-ui/react-switch": "^1.0.3",
    "@radix-ui/react-tabs": "^1.0.4",
    "@radix-ui/react-accordion": "^1.1.2",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-toast": "^1.1.5",
    "@radix-ui/react-progress": "^1.0.3",
    "@radix-ui/react-separator": "^1.0.3",
    "@radix-ui/react-avatar": "^1.0.4",
    "@radix-ui/react-label": "^2.0.2",
    "react-hook-form": "^7.51.0",
    "zod": "^3.22.4",
    "@hookform/resolvers": "^3.3.4",
    "cmdk": "^0.2.1",
    "react-day-picker": "^8.10.0",
    "date-fns": "^3.6.0",
    "lucide-react": "^0.369.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "react": "^18.2.0",
    "vitest": "^1.4.0",
    "@testing-library/react": "^15.0.0",
    "jest-axe": "^8.0.0"
  },
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
```

### `packages/utils/src/cn.ts`

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS classes safely, resolving conflicts.
 * Use this everywhere instead of plain string concatenation.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

---

## 9. Complete Component List with Variants & API

### Full Component Inventory

#### Category 1: Basic Inputs
| Component | Variants | Key Props |
|-----------|----------|-----------|
| **Button** | default, destructive, outline, secondary, ghost, link | variant, size, loading, disabled, leftIcon, rightIcon, asChild |
| **Input** | default, error | type, placeholder, disabled, readOnly, leftElement, rightElement, error |
| **Textarea** | default, error | rows, resize, autoResize, error |
| **Label** | - | htmlFor, required, optional |
| **Checkbox** | default, error | checked, indeterminate, disabled, onCheckedChange |
| **Radio + RadioGroup** | - | value, onValueChange, disabled |
| **Switch** | - | checked, onCheckedChange, disabled |

#### Category 2: Overlay
| Component | Variants | Key Props |
|-----------|----------|-----------|
| **Modal (Dialog)** | default, destructive | open, onOpenChange, trigger, title, description |
| **Drawer** | left, right, top, bottom | open, onOpenChange, direction |
| **Popover** | - | open, onOpenChange, trigger, align, side |
| **Tooltip** | - | content, side, align, delayDuration |
| **AlertDialog** | - | open, onOpenChange, title, description, onConfirm |

#### Category 3: Navigation
| Component | Variants | Key Props |
|-----------|----------|-----------|
| **Navbar** | default, transparent, bordered | brand, links, actions, mobileBreakpoint |
| **Sidebar** | default, collapsed, floating | collapsed, onCollapsedChange, items |
| **Tabs** | default, pills, underline | value, onValueChange, orientation |
| **Breadcrumb** | - | items, separator |
| **Pagination** | - | page, totalPages, onPageChange |
| **NavigationMenu** | - | items, orientation |

#### Category 4: Data Display
| Component | Variants | Key Props |
|-----------|----------|-----------|
| **Table** | - | columns, data, sortable, filterable, paginated, loading |
| **DataTable** | - | Built on Table with full features |
| **Card** | default, bordered, elevated | header, footer, padding |
| **Avatar** | circle, square | src, fallback, size, status |
| **AvatarGroup** | - | avatars, max, size |
| **Badge** | default, secondary, destructive, outline | variant, size |
| **List** | unordered, ordered, none | items, spacing |
| **Separator** | horizontal, vertical | orientation, decorative |
| **ScrollArea** | - | maxHeight, orientation |
| **Code** | inline, block | language, showLineNumbers |

#### Category 5: Feedback
| Component | Variants | Key Props |
|-----------|----------|-----------|
| **Toast** | default, success, error, warning | title, description, action, duration |
| **Alert** | default, destructive, success, warning | title, description, icon |
| **Spinner** | default | size, color |
| **Progress** | default, striped | value, max, animated |
| **Skeleton** | - | width, height, radius, animate |

#### Category 6: Layout
| Component | Variants | Key Props |
|-----------|----------|-----------|
| **Container** | sm, md, lg, xl, full | maxWidth, padding |
| **Grid** | - | cols, gap, rowGap, colGap |
| **Stack** | horizontal, vertical | direction, spacing, align, justify, wrap |
| **AspectRatio** | - | ratio |

#### Category 7: Advanced Inputs
| Component | Variants | Key Props |
|-----------|----------|-----------|
| **Select** | - | value, onValueChange, placeholder, searchable, disabled |
| **Combobox** | - | value, onValueChange, options, searchable, async, multiple |
| **Command** | - | Built on cmdk, searchable list |
| **DatePicker** | single, range | value, onChange, disabledDates, minDate, maxDate |
| **MultiSelect** | - | values, onValuesChange, options, max |
| **FileUpload** | - | accept, multiple, maxSize, onDrop |
| **Slider** | - | value, min, max, step, onValueChange |
| **ColorPicker** | - | value, onChange, presets |

#### Category 8: Disclosure
| Component | Variants | Key Props |
|-----------|----------|-----------|
| **Accordion** | single, multiple | type, collapsible, defaultValue |
| **Collapsible** | - | open, onOpenChange |
| **DropdownMenu** | - | trigger, items, align, side |

#### Category 9: Forms (Full System)
| Component | Purpose |
|-----------|---------|
| **Form** | Root wrapper with react-hook-form context |
| **FormField** | Connects input to form state |
| **FormItem** | Layout wrapper for a field |
| **FormLabel** | Accessible label |
| **FormControl** | Input wrapper with ARIA |
| **FormDescription** | Helper text |
| **FormMessage** | Error message display |

---

## 10. Theming System (CSS Variables + Tailwind)

### Step 1: Global CSS Variables

Create `globals.css` in the user's project:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Colors (HSL format for easy manipulation) */
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;

    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;

    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;

    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;

    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;

    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;

    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;

    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;

    --success: 142.1 76.2% 36.3%;
    --success-foreground: 355.7 100% 97.3%;

    --warning: 32.1 94.6% 43.7%;
    --warning-foreground: 26 83.3% 14.1%;

    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;

    /* Radius */
    --radius: 0.5rem;
    --radius-sm: calc(var(--radius) - 4px);
    --radius-lg: calc(var(--radius) + 4px);

    /* Spacing */
    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;

    /* Typography */
    --font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
    --font-mono: 'Fira Code', ui-monospace, monospace;

    /* Shadows */
    --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;

    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;

    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;

    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 47.4% 11.2%;

    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;

    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;

    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;

    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;

    --success: 142.1 70.6% 45.3%;
    --success-foreground: 144.9 80.4% 10%;

    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 224.3 76.3% 48%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground font-sans;
  }
}
```

### Step 2: Tailwind Config Integration

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius)",
        sm: "var(--radius-sm)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-in-from-top": {
          from: { transform: "translateY(-10px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "slide-in-from-bottom": {
          from: { transform: "translateY(10px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.2s ease-in-out",
        "slide-in-top": "slide-in-from-top 0.2s ease-out",
        "slide-in-bottom": "slide-in-from-bottom 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
```

---

## 11. Variants System with CVA

Every component uses `class-variance-authority` for type-safe variants.

### Pattern

```typescript
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const componentVariants = cva(
  // Base classes applied always
  "base-class-1 base-class-2",
  {
    variants: {
      variant: {
        default: "...",
        destructive: "...",
        outline: "...",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        default: "h-10 px-4",
        lg: "h-12 px-6 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
    compoundVariants: [
      {
        variant: "outline",
        size: "lg",
        class: "border-2",
      },
    ],
  }
);

// Type inference from variants
type ComponentProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof componentVariants> & {
    // additional custom props
  };
```

---

## 12. Forms System (Zod + React Hook Form)

### Architecture

CraftUI's form system wraps React Hook Form with a clean, composable API.

```typescript
// Usage example in user project:

const formSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Min 8 characters"),
});

type FormValues = z.infer<typeof formSchema>;

function LoginForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    // values are fully typed
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" {...field} />
              </FormControl>
              <FormDescription>Your work email address</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" loading={form.formState.isSubmitting}>
          Sign In
        </Button>
      </form>
    </Form>
  );
}
```

### Form Component Source

```typescript
// packages/ui/src/components/form/form.tsx
"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { cn } from "@/lib/cn";
import { Label } from "@/components/label/label";

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  );
});
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}`
      id={formMessageId}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = "FormMessage";

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormField,
  FormMessage,
  FormDescription,
};
```

---

## 13. Accessibility Layer

### Requirements (WCAG 2.1 AA)

Every component must meet:

| Criterion | Requirement |
|-----------|-------------|
| **1.4.3** | Color contrast ≥ 4.5:1 for text, 3:1 for large text |
| **1.4.11** | Non-text contrast ≥ 3:1 for UI components |
| **2.1.1** | All functionality via keyboard |
| **2.4.3** | Logical focus order |
| **2.4.7** | Focus visible |
| **3.3.1** | Error identification |
| **4.1.2** | Name, role, value for all components |

### Keyboard Navigation Map

| Component | Keys |
|-----------|------|
| Button | `Enter`, `Space` |
| Modal | `Escape` to close, `Tab` trap inside |
| Select | `Enter`, `Space`, `ArrowUp`, `ArrowDown`, `Escape` |
| Checkbox | `Space` to toggle |
| Switch | `Space`, `Enter` |
| Tabs | `ArrowLeft`, `ArrowRight`, `Home`, `End` |
| Accordion | `Enter`, `Space`, `ArrowDown`, `ArrowUp` |
| DropdownMenu | `Enter`, `Escape`, `Arrow keys` |
| Combobox | `Enter`, `Escape`, `Arrow keys`, Type to search |
| DatePicker | Full keyboard date navigation |
| Table | `Tab` through cells, sort with `Enter` |
| Toast | `Escape` to dismiss |

### Focus Management Rules

```typescript
// Every overlay component must:
// 1. Move focus to first focusable element on open
// 2. Trap focus inside while open
// 3. Return focus to trigger on close

// Radix UI handles this automatically.
// For custom components, use:
import { FocusScope } from "@radix-ui/react-focus-scope";

function CustomOverlay({ open, children }: Props) {
  return open ? (
    <FocusScope loop trapped>
      {children}
    </FocusScope>
  ) : null;
}
```

### Testing Accessibility

```typescript
// In every component test file:
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

describe("Button accessibility", () => {
  it("has no accessibility violations", async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

---

## 14. Composition Patterns

### Pattern 1: Compound Components

Use when a component has distinct sub-parts:

```typescript
// Card with compound pattern
<Card>
  <Card.Header>
    <Card.Title>Team Members</Card.Title>
    <Card.Description>Manage your team here</Card.Description>
  </Card.Header>
  <Card.Content>
    {/* content */}
  </Card.Content>
  <Card.Footer className="flex justify-end">
    <Button>Save Changes</Button>
  </Card.Footer>
</Card>
```

### Pattern 2: Polymorphic Components (asChild)

Using Radix's `Slot` to change the rendered element:

```typescript
// Button renders as an anchor tag
<Button asChild>
  <a href="/dashboard">Go to Dashboard</a>
</Button>

// Button renders as a Next.js Link
<Button asChild>
  <Link href="/dashboard">Go to Dashboard</Link>
</Button>
```

### Pattern 3: Controlled vs Uncontrolled

Every stateful component supports both modes:

```typescript
// Uncontrolled (internal state)
<Accordion defaultValue="item-1">
  ...
</Accordion>

// Controlled (external state)
const [value, setValue] = useState("item-1");
<Accordion value={value} onValueChange={setValue}>
  ...
</Accordion>
```

---

## 15. Package: `packages/cli` — Full CLI Architecture

### `packages/cli/package.json`

```json
{
  "name": "craftui",
  "version": "0.1.0",
  "description": "CLI for CraftUI — add components to your project",
  "main": "dist/index.js",
  "bin": {
    "craftui": "dist/index.js"
  },
  "scripts": {
    "build": "tsup src/index.ts --format esm,cjs --dts --clean",
    "dev": "tsup src/index.ts --watch",
    "lint": "eslint src/"
  },
  "dependencies": {
    "commander": "^12.0.0",
    "inquirer": "^9.2.0",
    "chalk": "^5.3.0",
    "ora": "^8.0.1",
    "fs-extra": "^11.2.0",
    "execa": "^8.0.1",
    "cosmiconfig": "^9.0.0",
    "semver": "^7.6.0",
    "node-fetch": "^3.3.2",
    "picocolors": "^1.0.0",
    "validate-npm-package-name": "^5.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/fs-extra": "^11.0.0",
    "@types/inquirer": "^9.0.0",
    "tsup": "^8.0.0",
    "typescript": "^5.4.0"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

### `packages/cli/src/index.ts`

```typescript
#!/usr/bin/env node
import { Command } from "commander";
import { initCommand } from "./commands/init";
import { addCommand } from "./commands/add";
import { removeCommand } from "./commands/remove";
import { listCommand } from "./commands/list";
import { diffCommand } from "./commands/diff";
import { themeCommand } from "./commands/theme";

const program = new Command();

program
  .name("craftui")
  .description("CraftUI — Add production-ready components to your project")
  .version("0.1.0");

program.addCommand(initCommand);
program.addCommand(addCommand);
program.addCommand(removeCommand);
program.addCommand(listCommand);
program.addCommand(diffCommand);
program.addCommand(themeCommand);

program.parse();
```

---

## 16. CLI Commands (Deep Spec)

### `craftui init`

```typescript
// packages/cli/src/commands/init.ts
import { Command } from "commander";
import inquirer from "inquirer";
import chalk from "chalk";
import ora from "ora";
import fs from "fs-extra";
import path from "path";
import { detectFramework } from "../utils/detect-framework";
import { detectTypeScript } from "../utils/detect-typescript";
import { detectTailwind } from "../utils/detect-tailwind";
import { installDependencies } from "../utils/dependency-installer";

export const initCommand = new Command("init")
  .description("Initialize CraftUI in your project")
  .option("--no-install", "Skip installing dependencies")
  .option("--no-prompt", "Use defaults without prompting")
  .action(async (options) => {
    console.log(chalk.bold("\n✦ CraftUI Init\n"));

    const cwd = process.cwd();

    // 1. Detect environment
    const spinner = ora("Detecting project setup...").start();
    const framework = await detectFramework(cwd);
    const isTypescript = await detectTypeScript(cwd);
    const hasTailwind = await detectTailwind(cwd);
    spinner.succeed("Project detected");

    console.log(chalk.gray(`  Framework: ${framework}`));
    console.log(chalk.gray(`  TypeScript: ${isTypescript ? "Yes" : "No"}`));
    console.log(chalk.gray(`  Tailwind: ${hasTailwind ? "Installed" : "Not installed"}\n`));

    // 2. Prompt for config
    const answers = options.noPrompt
      ? {
          componentsDir: "components/ui",
          style: "default",
          baseColor: "slate",
          cssVariables: true,
        }
      : await inquirer.prompt([
          {
            type: "input",
            name: "componentsDir",
            message: "Where should components be installed?",
            default: "components/ui",
          },
          {
            type: "list",
            name: "style",
            message: "Which style would you like to use?",
            choices: ["default", "new-york"],
            default: "default",
          },
          {
            type: "list",
            name: "baseColor",
            message: "Which base color would you like to use?",
            choices: ["slate", "gray", "zinc", "neutral", "stone"],
            default: "slate",
          },
          {
            type: "confirm",
            name: "cssVariables",
            message: "Use CSS variables for theming?",
            default: true,
          },
        ]);

    // 3. Write craftui.config.json
    const config = {
      $schema: "https://craftui.dev/schema.json",
      style: answers.style,
      rsc: framework === "next",
      tsx: isTypescript,
      tailwind: {
        config: isTypescript ? "tailwind.config.ts" : "tailwind.config.js",
        css: "app/globals.css",
        baseColor: answers.baseColor,
        cssVariables: answers.cssVariables,
      },
      aliases: {
        components: `@/${answers.componentsDir}`,
        utils: "@/lib/utils",
      },
    };

    await fs.writeJson(path.join(cwd, "craftui.config.json"), config, {
      spaces: 2,
    });

    // 4. Write globals.css with CSS variables
    if (answers.cssVariables) {
      // Inject CSS variables into existing globals.css
      await injectCSSVariables(cwd, answers.baseColor);
    }

    // 5. Update tailwind.config
    await updateTailwindConfig(cwd, framework, isTypescript);

    // 6. Create lib/utils.ts
    await createUtilsFile(cwd, answers.componentsDir);

    // 7. Install dependencies
    if (!options.noInstall) {
      const installSpinner = ora("Installing dependencies...").start();
      await installDependencies(cwd, [
        "tailwindcss-animate",
        "class-variance-authority",
        "clsx",
        "tailwind-merge",
        "lucide-react",
      ]);
      installSpinner.succeed("Dependencies installed");
    }

    console.log(chalk.green("\n✓ CraftUI initialized successfully!\n"));
    console.log(chalk.gray("  Run `craftui add button` to add your first component."));
  });
```

### `craftui add`

```typescript
// packages/cli/src/commands/add.ts
import { Command } from "commander";
import chalk from "chalk";
import ora from "ora";
import inquirer from "inquirer";
import { fetchRegistry } from "../utils/registry-fetcher";
import { resolveComponentDependencies } from "../utils/dependency-resolver";
import { writeComponent } from "../utils/file-writer";
import { installDependencies } from "../utils/dependency-installer";
import { readConfig } from "../utils/config-reader";

export const addCommand = new Command("add")
  .description("Add components to your project")
  .argument("[components...]", "Components to add")
  .option("--no-install", "Skip installing dependencies")
  .option("-p, --path <path>", "Override components directory")
  .action(async (components: string[], options) => {
    const config = await readConfig();

    // If no components specified, show interactive picker
    if (components.length === 0) {
      const registry = await fetchRegistry();
      const { selected } = await inquirer.prompt([
        {
          type: "checkbox",
          name: "selected",
          message: "Select components to add:",
          choices: registry.map((c) => ({
            name: `${c.name} ${chalk.gray(`(${c.description})`)}`,
            value: c.name,
            short: c.name,
          })),
          pageSize: 20,
        },
      ]);
      components = selected;
    }

    if (components.length === 0) {
      console.log(chalk.yellow("No components selected."));
      return;
    }

    // Resolve dependency tree
    const spinner = ora("Resolving dependencies...").start();
    const allComponents = await resolveComponentDependencies(components);
    spinner.succeed(`Found ${allComponents.length} component(s) to install`);

    // Check for conflicts
    const conflicts = await checkExistingComponents(allComponents, config);

    if (conflicts.length > 0) {
      const { overwrite } = await inquirer.prompt([
        {
          type: "confirm",
          name: "overwrite",
          message: `${conflicts.join(", ")} already exist. Overwrite?`,
          default: false,
        },
      ]);
      if (!overwrite) {
        console.log(chalk.yellow("Aborted."));
        return;
      }
    }

    // Write components
    for (const component of allComponents) {
      const writeSpinner = ora(`Adding ${component}...`).start();
      await writeComponent(component, config, options.path);
      writeSpinner.succeed(`Added ${chalk.green(component)}`);
    }

    // Install npm dependencies
    if (!options.noInstall) {
      const npmDeps = await collectNpmDependencies(allComponents);
      if (npmDeps.length > 0) {
        const depSpinner = ora("Installing npm dependencies...").start();
        await installDependencies(process.cwd(), npmDeps);
        depSpinner.succeed("Dependencies installed");
      }
    }

    console.log(chalk.green("\n✓ Done!\n"));
    console.log(chalk.gray("  Import your components from:"));
    components.forEach((c) => {
      console.log(chalk.gray(`    import { ${toPascalCase(c)} } from "@/components/ui/${c}"`));
    });
  });
```

### `craftui list`

```typescript
// packages/cli/src/commands/list.ts
import { Command } from "commander";
import chalk from "chalk";
import { fetchRegistry } from "../utils/registry-fetcher";

export const listCommand = new Command("list")
  .description("List all available components")
  .option("--category <category>", "Filter by category")
  .action(async (options) => {
    const registry = await fetchRegistry();

    const grouped = registry.reduce((acc, component) => {
      const cat = component.category || "other";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(component);
      return acc;
    }, {} as Record<string, typeof registry>);

    console.log(chalk.bold("\n✦ Available CraftUI Components\n"));

    for (const [category, components] of Object.entries(grouped)) {
      if (options.category && category !== options.category) continue;
      console.log(chalk.blue.bold(`  ${category.toUpperCase()}`));
      components.forEach((c) => {
        console.log(chalk.gray(`    ${c.name.padEnd(20)} ${c.description}`));
      });
      console.log();
    }

    console.log(chalk.gray(`  Total: ${registry.length} components\n`));
  });
```

### `craftui diff`

```typescript
// packages/cli/src/commands/diff.ts
// Shows diff between installed component and latest version from registry
import { Command } from "commander";
import chalk from "chalk";
import { diffLines } from "diff";

export const diffCommand = new Command("diff")
  .description("Show diff between local and registry version of a component")
  .argument("<component>", "Component name")
  .action(async (component) => {
    const localContent = await readLocalComponent(component);
    const registryContent = await fetchRegistryComponent(component);

    const diff = diffLines(localContent, registryContent);

    console.log(chalk.bold(`\nDiff for ${component}:\n`));

    diff.forEach((part) => {
      if (part.added) {
        process.stdout.write(chalk.green(part.value));
      } else if (part.removed) {
        process.stdout.write(chalk.red(part.value));
      } else {
        process.stdout.write(chalk.gray(part.value));
      }
    });
  });
```

### `craftui remove`

```typescript
// packages/cli/src/commands/remove.ts
export const removeCommand = new Command("remove")
  .description("Remove a component from your project")
  .argument("<component>", "Component name")
  .action(async (component) => {
    const { confirm } = await inquirer.prompt([
      {
        type: "confirm",
        name: "confirm",
        message: `Remove ${component}?`,
        default: false,
      },
    ]);

    if (!confirm) return;

    const config = await readConfig();
    const filePath = path.join(config.aliases.components, `${component}.tsx`);
    await fs.remove(filePath);

    console.log(chalk.green(`✓ Removed ${component}`));
  });
```

---

## 17. Package: `packages/registry` — Component Registry

### Registry Entry Schema

```typescript
// packages/registry/src/types.ts
export interface RegistryEntry {
  name: string;
  description: string;
  category: "inputs" | "overlay" | "navigation" | "display" | "feedback" | "layout" | "forms";
  files: RegistryFile[];
  dependencies: string[];        // npm packages
  devDependencies: string[];     // npm dev packages
  registryDependencies: string[]; // other craftui components
  docs?: string;
  keywords?: string[];
}

export interface RegistryFile {
  path: string;       // relative path from packages/ui/src/
  target: string;     // where to write in user's project
  type: "component" | "hook" | "lib" | "util";
}
```

### Example Registry Entry

```json
// packages/registry/src/components/button.json
{
  "name": "button",
  "description": "A clickable button with multiple variants",
  "category": "inputs",
  "files": [
    {
      "path": "components/button/button.tsx",
      "target": "components/ui/button.tsx",
      "type": "component"
    }
  ],
  "dependencies": [
    "class-variance-authority",
    "@radix-ui/react-slot"
  ],
  "devDependencies": [],
  "registryDependencies": [],
  "keywords": ["button", "click", "action", "submit"]
}
```

```json
// packages/registry/src/components/form.json
{
  "name": "form",
  "description": "Form system with React Hook Form integration",
  "category": "forms",
  "files": [
    {
      "path": "components/form/form.tsx",
      "target": "components/ui/form.tsx",
      "type": "component"
    }
  ],
  "dependencies": [
    "react-hook-form",
    "@hookform/resolvers",
    "zod",
    "@radix-ui/react-label",
    "@radix-ui/react-slot"
  ],
  "devDependencies": [],
  "registryDependencies": ["label"],
  "keywords": ["form", "validation", "zod", "react-hook-form"]
}
```

### Registry Index

```typescript
// packages/registry/src/index.ts
export { registry } from "./registry";
export type { RegistryEntry, RegistryFile } from "./types";

// registry.ts exports all entries
export const registry: RegistryEntry[] = [
  // imported from all JSON files
];
```

---

## 18. Package: `packages/config` — Shared Configs

### `packages/config/eslint/base.js`

```javascript
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsx-a11y/recommended",
    "prettier",
  ],
  plugins: ["@typescript-eslint", "jsx-a11y"],
  parser: "@typescript-eslint/parser",
  rules: {
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-explicit-any": "warn",
    "jsx-a11y/click-events-have-key-events": "warn",
    "jsx-a11y/interactive-supports-focus": "warn",
  },
};
```

### `packages/config/typescript/base.json`

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "compilerOptions": {
    "strict": true,
    "target": "ES2022",
    "lib": ["ES2022"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "skipLibCheck": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "composite": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "noUncheckedIndexedAccess": true
  }
}
```

---

## 19. Package: `packages/utils` — Utility Functions

### All utilities

```typescript
// packages/utils/src/cn.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// packages/utils/src/format.ts
export function toPascalCase(str: string): string {
  return str
    .split(/[-_\s]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
}

// packages/utils/src/types.ts
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

export type ComponentProps<T extends React.ElementType> =
  React.ComponentPropsWithoutRef<T> & {
    className?: string;
  };
```

---

## 20. App: `apps/docs` — Documentation Site

### Architecture

```
apps/docs/
├── app/
│   ├── layout.tsx              ← Root layout (fonts, theme)
│   ├── page.tsx                ← Landing page
│   ├── docs/
│   │   └── [[...slug]]/
│   │       └── page.tsx        ← Dynamic MDX page renderer
│   └── api/
│       └── search/
│           └── route.ts        ← Search endpoint
├── components/
│   ├── layout/
│   │   ├── header.tsx
│   │   ├── sidebar.tsx
│   │   ├── footer.tsx
│   │   └── mobile-nav.tsx
│   ├── docs/
│   │   ├── component-preview.tsx   ← Live component demo
│   │   ├── code-block.tsx          ← Syntax highlighted code
│   │   ├── copy-button.tsx
│   │   ├── props-table.tsx         ← Component API table
│   │   ├── tabs-preview.tsx        ← Preview/Code tabs
│   │   └── install-command.tsx     ← CLI command display
│   └── theme-toggle.tsx
├── content/
│   └── docs/
│       ├── getting-started/
│       │   ├── introduction.mdx
│       │   ├── installation.mdx
│       │   └── cli.mdx
│       ├── theming/
│       │   ├── overview.mdx
│       │   ├── dark-mode.mdx
│       │   └── css-variables.mdx
│       └── components/
│           ├── button.mdx
│           ├── input.mdx
│           └── ...
├── lib/
│   ├── docs.ts             ← MDX processing
│   └── search.ts           ← Search index
└── public/
    ├── og.png
    └── favicon.ico
```

### Key Doc Page Features

```typescript
// apps/docs/components/docs/component-preview.tsx
"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CodeBlock } from "./code-block";
import { CopyButton } from "./copy-button";
import { cn } from "@/lib/utils";

interface ComponentPreviewProps {
  name: string;
  code: string;
  children: React.ReactNode;  // The actual component demo
  className?: string;
  align?: "center" | "start" | "end";
}

export function ComponentPreview({
  name,
  code,
  children,
  className,
  align = "center",
}: ComponentPreviewProps) {
  return (
    <Tabs defaultValue="preview" className="relative mt-6 w-full">
      <div className="flex items-center justify-between pb-3">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <CopyButton value={code} />
      </div>
      <TabsContent value="preview">
        <div
          className={cn(
            "preview flex min-h-[350px] w-full items-center rounded-md border bg-background p-10",
            {
              "justify-center": align === "center",
              "justify-start": align === "start",
              "justify-end": align === "end",
            },
            className
          )}
        >
          {children}
        </div>
      </TabsContent>
      <TabsContent value="code">
        <CodeBlock language="tsx" code={code} />
      </TabsContent>
    </Tabs>
  );
}
```

### MDX Example (button.mdx)

```mdx
---
title: Button
description: Displays a button or a component that looks like a button.
---

<ComponentPreview
  name="button-demo"
  code={`<Button variant="default">Button</Button>`}
>
  <Button variant="default">Button</Button>
</ComponentPreview>

## Installation

<InstallCommand component="button" />

## Usage

\`\`\`tsx
import { Button } from "@/components/ui/button"
\`\`\`

\`\`\`tsx
<Button variant="outline">Button</Button>
\`\`\`

## Variants

<ComponentPreview
  name="button-variants"
  code={buttonVariantsCode}
>
  <ButtonVariantsDemo />
</ComponentPreview>

## Props

<PropsTable
  props={[
    {
      name: "variant",
      type: '"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"',
      default: '"default"',
    },
    {
      name: "size",
      type: '"default" | "sm" | "lg" | "icon"',
      default: '"default"',
    },
    {
      name: "loading",
      type: "boolean",
      default: "false",
    },
    {
      name: "asChild",
      type: "boolean",
      default: "false",
    },
  ]}
/>
```

---

## 21. App: `apps/playground` — Live Sandbox

### Purpose

A Vite + React app where developers can test CraftUI components interactively before installing.

```typescript
// apps/playground/src/App.tsx
import { useState } from "react";
import { ThemeProvider } from "./providers/theme-provider";
import { Sidebar } from "./components/sidebar";
import { ComponentRenderer } from "./components/component-renderer";
import { PropsEditor } from "./components/props-editor";
import { CodeViewer } from "./components/code-viewer";

export function App() {
  const [selectedComponent, setSelectedComponent] = useState("button");
  const [props, setProps] = useState({});

  return (
    <ThemeProvider>
      <div className="flex h-screen">
        <Sidebar
          selected={selectedComponent}
          onSelect={setSelectedComponent}
        />
        <div className="flex-1 flex flex-col">
          <ComponentRenderer
            component={selectedComponent}
            props={props}
          />
          <CodeViewer component={selectedComponent} props={props} />
        </div>
        <PropsEditor
          component={selectedComponent}
          props={props}
          onChange={setProps}
        />
      </div>
    </ThemeProvider>
  );
}
```

---

## 22. Testing Strategy (Unit + A11y + Visual)

### Vitest Config

```typescript
// vitest.config.ts (at root)
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./test/setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      exclude: ["**/node_modules/**", "**/dist/**"],
    },
  },
});
```

### Test Setup

```typescript
// test/setup.ts
import "@testing-library/jest-dom";
import { expect } from "vitest";
import { toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);
```

### Component Test Template

```typescript
// packages/ui/src/components/button/button.test.tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { Button } from "./button";

describe("Button", () => {
  // Rendering
  it("renders correctly", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeDefined();
  });

  // Variants
  it("applies variant classes", () => {
    const { container } = render(<Button variant="destructive">Delete</Button>);
    expect(container.firstChild).toHaveClass("bg-destructive");
  });

  // Sizes
  it("applies size classes", () => {
    const { container } = render(<Button size="sm">Small</Button>);
    expect(container.firstChild).toHaveClass("h-8");
  });

  // Loading state
  it("shows spinner when loading", () => {
    render(<Button loading>Submit</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("disabled");
    expect(screen.getByTestId("spinner")).toBeDefined();
  });

  // Disabled
  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Click</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  // Click handler
  it("calls onClick when clicked", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  // Does not call onClick when disabled
  it("does not call onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<Button disabled onClick={onClick}>Click</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  // Accessibility
  it("has no accessibility violations", async () => {
    const { container } = render(<Button>Accessible Button</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // asChild
  it("renders as anchor when asChild", () => {
    render(
      <Button asChild>
        <a href="/test">Link</a>
      </Button>
    );
    expect(screen.getByRole("link")).toBeDefined();
  });
});
```

---

## 23. TypeScript Configuration

### Root `tsconfig.json`

```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "noUncheckedIndexedAccess": true,
    "noEmit": true
  },
  "include": [],
  "exclude": ["node_modules"]
}
```

---

## 24. ESLint + Prettier Setup

### `.eslintrc.js` (root)

```javascript
module.exports = {
  root: true,
  extends: ["@craftui/config/eslint/base"],
  ignorePatterns: ["dist/", ".next/", "node_modules/"],
};
```

### `.prettierrc`

```json
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### `.husky/pre-commit`

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

### `lint-staged.config.js`

```javascript
module.exports = {
  "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{json,md,css}": ["prettier --write"],
};
```

---

## 25. Changesets & Versioning

### `.changeset/config.json`

```json
{
  "$schema": "https://unpkg.com/@changesets/config@3.0.0/schema.json",
  "changelog": "@changesets/cli/changelog",
  "commit": false,
  "fixed": [],
  "linked": [],
  "access": "public",
  "baseBranch": "main",
  "updateInternalDependencies": "patch",
  "ignore": ["@craftui/docs", "@craftui/playground"]
}
```

### Versioning Workflow

```bash
# 1. Make changes
# 2. Create a changeset
pnpm changeset

# Select: Which packages changed?
# Select: What kind of change? (patch/minor/major)
# Write: Summary of changes

# 3. Version packages (update package.json + CHANGELOG)
pnpm version-packages

# 4. Release
pnpm release
```

---

## 26. Publishing to npm

### CLI Package Setup

```typescript
// packages/cli/src/index.ts
#!/usr/bin/env node
// First line is critical for npm bin execution
```

### `tsup.config.ts`

```typescript
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  banner: {
    js: "#!/usr/bin/env node",
  },
  external: ["react", "react-dom"],
});
```

### Publishing Steps

```bash
# 1. Build CLI
pnpm build --filter=craftui

# 2. Test locally
node dist/index.js --version

# 3. Link locally for testing
pnpm link --global

# Test in a test project:
craftui init
craftui add button

# 4. Publish
npm publish --access public
```

---

## 27. CI/CD Pipeline (GitHub Actions)

### `.github/workflows/ci.yml`

```yaml
name: CI

on:
  push:
    branches: [main, dev]
  pull_request:
    branches: [main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18.x, 20.x]

    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup pnpm
        uses: pnpm/action-setup@v3
        with:
          version: 8

      - name: Setup Node ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: "pnpm"

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build
        run: pnpm build

      - name: Lint
        run: pnpm lint

      - name: Test
        run: pnpm test

      - name: Upload coverage
        uses: codecov/codecov-action@v4
        with:
          token: ${{ secrets.CODECOV_TOKEN }}
```

### `.github/workflows/release.yml`

```yaml
name: Release

on:
  push:
    branches: [main]

jobs:
  release:
    name: Release
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup pnpm
        uses: pnpm/action-setup@v3
        with:
          version: 8

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "pnpm"
          registry-url: "https://registry.npmjs.org"

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Create Release Pull Request or Publish
        uses: changesets/action@v1
        with:
          publish: pnpm release
          title: "chore: release packages"
          commit: "chore: release packages"
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

---

## 28. Deployment — Docs & Playground

### Docs — Vercel

```json
// apps/docs/vercel.json
{
  "buildCommand": "pnpm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "installCommand": "pnpm install"
}
```

Vercel project settings:
- Root Directory: `apps/docs`
- Build Command: `cd ../.. && pnpm build --filter=@craftui/docs`
- Output Directory: `.next`

### Playground — Vercel

- Root Directory: `apps/playground`
- Build Command: `pnpm build`
- Output Directory: `dist`

---

## 29. Performance Optimization

### Tree-shaking

Since users copy component code directly into their project, tree-shaking happens naturally. But for the CLI package itself:

```typescript
// tsup.config.ts for CLI
export default defineConfig({
  treeshake: true,
  splitting: true,
});
```

### Tailwind Optimization

```typescript
// tailwind.config.ts in docs/playground
content: [
  // Be specific — don't scan node_modules
  "./app/**/*.{ts,tsx}",
  "./components/**/*.{ts,tsx}",
],
```

### Component Optimization Rules

Every component must follow:

1. Use `React.forwardRef` for all DOM elements (enables ref passing)
2. Use `React.memo` only when proven necessary by profiling
3. Keep component files small — split logic into hooks
4. Use `Suspense` boundaries in docs/playground

### Image Optimization in Docs

```typescript
// Use Next.js Image component always
import Image from "next/image";
```

---

## 30. Component Design Patterns (with Code)

### Pattern: forwardRef

```typescript
import * as React from "react";

// Always use forwardRef to allow parent ref access
const Input = React.forwardRef<
  HTMLInputElement,            // ← Element type
  InputProps                   // ← Props interface
>(({ className, type, ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={cn("...", className)}
      {...props}
    />
  );
});

// Always set displayName for React DevTools
Input.displayName = "Input";

export { Input };
```

### Pattern: Radix Primitive Wrapper

```typescript
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

// Wrap Radix primitives to apply our design system
const Tooltip = TooltipPrimitive.Provider;
const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95",
      className
    )}
    {...props}
  />
));
```

---

## 31. Full Component Source Code — All Core Components

### Button

```typescript
// components/ui/button.tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3",
        lg: "h-12 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = disabled || loading;

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        {...props}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : leftIcon ? (
          <span className="h-4 w-4" aria-hidden="true">{leftIcon}</span>
        ) : null}
        {children}
        {rightIcon && !loading ? (
          <span className="h-4 w-4" aria-hidden="true">{rightIcon}</span>
        ) : null}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
```

### Input

```typescript
// components/ui/input.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, leftElement, rightElement, ...props }, ref) => {
    if (leftElement || rightElement) {
      return (
        <div className="relative flex items-center">
          {leftElement && (
            <div className="absolute left-3 flex items-center text-muted-foreground">
              {leftElement}
            </div>
          )}
          <input
            type={type}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-destructive focus-visible:ring-destructive",
              leftElement && "pl-10",
              rightElement && "pr-10",
              className
            )}
            ref={ref}
            aria-invalid={error ? "true" : undefined}
            {...props}
          />
          {rightElement && (
            <div className="absolute right-3 flex items-center text-muted-foreground">
              {rightElement}
            </div>
          )}
        </div>
      );
    }

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-destructive focus-visible:ring-destructive",
          className
        )}
        ref={ref}
        aria-invalid={error ? "true" : undefined}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
```

### Modal (Dialog)

```typescript
// components/ui/dialog.tsx
"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    showClose?: boolean;
  }
>(({ className, children, showClose = true, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      {showClose && (
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
```

### Toast (with useToast hook)

```typescript
// components/ui/toast.tsx + hooks/use-toast.ts

// State management for toast
import { useState, useEffect, useRef, useCallback } from "react";

export type ToastVariant = "default" | "success" | "error" | "warning";

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Global toast state
let toastState: {
  toasts: Toast[];
  listeners: Array<(toasts: Toast[]) => void>;
} = {
  toasts: [],
  listeners: [],
};

function notify(listeners: Array<(toasts: Toast[]) => void>, toasts: Toast[]) {
  listeners.forEach((l) => l(toasts));
}

export function toast(props: Omit<Toast, "id">): string {
  const id = Math.random().toString(36).slice(2);
  const newToast: Toast = { id, duration: 5000, variant: "default", ...props };

  toastState.toasts = [newToast, ...toastState.toasts];
  notify(toastState.listeners, toastState.toasts);

  return id;
}

toast.success = (props: Omit<Toast, "id" | "variant">) =>
  toast({ ...props, variant: "success" });

toast.error = (props: Omit<Toast, "id" | "variant">) =>
  toast({ ...props, variant: "error" });

toast.warning = (props: Omit<Toast, "id" | "variant">) =>
  toast({ ...props, variant: "warning" });

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>(toastState.toasts);

  useEffect(() => {
    toastState.listeners.push(setToasts);
    return () => {
      toastState.listeners = toastState.listeners.filter((l) => l !== setToasts);
    };
  }, []);

  const dismiss = useCallback((id: string) => {
    toastState.toasts = toastState.toasts.filter((t) => t.id !== id);
    notify(toastState.listeners, toastState.toasts);
  }, []);

  return { toasts, toast, dismiss };
}
```

### Badge

```typescript
// components/ui/badge.tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        success: "border-transparent bg-success text-success-foreground hover:bg-success/80",
        warning: "border-transparent bg-warning text-warning-foreground hover:bg-warning/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
```

### Card

```typescript
// components/ui/card.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  )
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  )
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
```

### Skeleton

```typescript
// components/ui/skeleton.tsx
import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
}

function Skeleton({ className, width, height, style, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      style={{ width, height, ...style }}
      aria-busy="true"
      aria-label="Loading..."
      {...props}
    />
  );
}

export { Skeleton };
```

---

## 32. Theme Generator CLI Feature

```typescript
// packages/cli/src/commands/theme.ts
import { Command } from "commander";
import inquirer from "inquirer";
import chalk from "chalk";
import { generateTheme } from "../utils/theme-generator";

export const themeCommand = new Command("theme")
  .description("Theme management commands")
  .addCommand(
    new Command("generate")
      .description("Generate a custom theme from a primary color")
      .action(async () => {
        const { primaryColor, radius, style } = await inquirer.prompt([
          {
            type: "input",
            name: "primaryColor",
            message: "Enter your primary brand color (hex):",
            default: "#3B82F6",
            validate: (val) => /^#[0-9A-Fa-f]{6}$/.test(val) || "Invalid hex color",
          },
          {
            type: "list",
            name: "radius",
            message: "Choose border radius style:",
            choices: [
              { name: "None (0px)", value: "0" },
              { name: "Small (4px)", value: "0.25rem" },
              { name: "Medium (8px) — default", value: "0.5rem" },
              { name: "Large (12px)", value: "0.75rem" },
              { name: "Full (9999px)", value: "9999px" },
            ],
            default: "0.5rem",
          },
          {
            type: "list",
            name: "style",
            message: "Choose a base style:",
            choices: ["default", "new-york"],
            default: "default",
          },
        ]);

        const theme = generateTheme(primaryColor, radius, style);

        // Write CSS variables to globals.css
        await injectThemeVariables(theme);

        console.log(chalk.green("\n✓ Theme generated!\n"));
        console.log(chalk.gray("  Primary color shades:"));
        theme.shades.forEach(([shade, hsl]) => {
          console.log(chalk.gray(`    ${shade}: ${hsl}`));
        });
      })
  )
  .addCommand(
    new Command("list")
      .description("List available preset themes")
      .action(() => {
        const presets = ["slate", "zinc", "neutral", "stone", "red", "rose", "orange", "green", "blue", "violet"];
        console.log(chalk.bold("\nAvailable Themes:\n"));
        presets.forEach((p) => console.log(chalk.gray(`  craftui theme apply ${p}`)));
      })
  )
  .addCommand(
    new Command("apply")
      .description("Apply a preset theme")
      .argument("<theme>", "Theme name")
      .action(async (theme) => {
        await applyPresetTheme(theme);
        console.log(chalk.green(`✓ Applied theme: ${theme}`));
      })
  );
```

---

## 33. Documentation Site Architecture

### Landing Page Features

```typescript
// apps/docs/app/page.tsx
// Must include:
// 1. Hero with "npx craftui init" command display
// 2. Feature list
// 3. Quick component demo
// 4. Installation steps
// 5. Testimonials / GitHub stars
// 6. CTA buttons
```

### Sidebar Navigation Structure

```typescript
const navigation = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Installation", href: "/docs/installation" },
      { title: "CLI", href: "/docs/cli" },
      { title: "Theming", href: "/docs/theming" },
      { title: "Dark Mode", href: "/docs/dark-mode" },
      { title: "Typography", href: "/docs/typography" },
    ],
  },
  {
    title: "Components",
    items: [
      { title: "Accordion", href: "/docs/components/accordion" },
      { title: "Alert", href: "/docs/components/alert" },
      { title: "Alert Dialog", href: "/docs/components/alert-dialog" },
      { title: "Avatar", href: "/docs/components/avatar" },
      { title: "Badge", href: "/docs/components/badge" },
      { title: "Button", href: "/docs/components/button" },
      { title: "Calendar", href: "/docs/components/calendar" },
      { title: "Card", href: "/docs/components/card" },
      { title: "Checkbox", href: "/docs/components/checkbox" },
      { title: "Collapsible", href: "/docs/components/collapsible" },
      { title: "Command", href: "/docs/components/command" },
      { title: "Combobox", href: "/docs/components/combobox" },
      { title: "Date Picker", href: "/docs/components/date-picker" },
      { title: "Dialog", href: "/docs/components/dialog" },
      { title: "Drawer", href: "/docs/components/drawer" },
      { title: "Dropdown Menu", href: "/docs/components/dropdown-menu" },
      { title: "Form", href: "/docs/components/form" },
      { title: "Input", href: "/docs/components/input" },
      { title: "Label", href: "/docs/components/label" },
      { title: "Navigation Menu", href: "/docs/components/navigation-menu" },
      { title: "Pagination", href: "/docs/components/pagination" },
      { title: "Popover", href: "/docs/components/popover" },
      { title: "Progress", href: "/docs/components/progress" },
      { title: "Radio Group", href: "/docs/components/radio-group" },
      { title: "Scroll Area", href: "/docs/components/scroll-area" },
      { title: "Select", href: "/docs/components/select" },
      { title: "Separator", href: "/docs/components/separator" },
      { title: "Sheet (Drawer)", href: "/docs/components/sheet" },
      { title: "Skeleton", href: "/docs/components/skeleton" },
      { title: "Slider", href: "/docs/components/slider" },
      { title: "Switch", href: "/docs/components/switch" },
      { title: "Table", href: "/docs/components/table" },
      { title: "Tabs", href: "/docs/components/tabs" },
      { title: "Textarea", href: "/docs/components/textarea" },
      { title: "Toast", href: "/docs/components/toast" },
      { title: "Toggle", href: "/docs/components/toggle" },
      { title: "Tooltip", href: "/docs/components/tooltip" },
    ],
  },
];
```

---

## 34. Roadmap: V1 → V2 → V3

### V1 — Foundation (Months 1–3)
**Goal: Functional, production-ready, publishable**

| Feature | Status |
|---------|--------|
| Turborepo monorepo setup | Core |
| `craftui init` command | Core |
| `craftui add` command | Core |
| `craftui list` command | Core |
| 30+ components | Core |
| CSS Variables theming | Core |
| Dark mode | Core |
| Docs site (Next.js) | Core |
| npm publish (`craftui`) | Core |
| TypeScript support | Core |
| Form system (RHF + Zod) | Core |
| Accessibility (WCAG 2.1 AA) | Core |
| Unit tests for all components | Core |
| CI/CD (GitHub Actions) | Core |

### V2 — Intelligence Layer (Months 4–6)
**Goal: Become a developer tool, not just a library**

| Feature | Description |
|---------|-------------|
| `craftui diff` | Show diff between local + registry version |
| Theme Generator | `craftui theme generate` with brand color input |
| Preset themes | 10+ built-in color themes |
| `craftui upgrade` | Update all components to latest version |
| VS Code Extension | Autocomplete, hover docs, component preview |
| Playground site | Interactive component sandbox |
| CLI analytics | Track which components are most used |
| More components | Data table, Date range picker, Combobox async |
| Custom component variants | `craftui add button --variant minimal` |

### V3 — Autonomous System (Months 7–12)
**Goal: AI-powered, team-level tool**

| Feature | Description |
|---------|-------------|
| AI Component Generator | Prompt → component code |
| Full page templates | Auth, Dashboard, Settings, CRUD |
| `craftui init --template` | Starter templates (SaaS, admin, landing) |
| Team registry | Private component registry for teams |
| Design token sync | Import tokens from Figma |
| Component analytics | Which components load slow, accessibility issues |
| CraftUI Pro | Paid tier with advanced components |

---

## 35. Project Execution Plan (Week by Week)

### Phase 1: Setup (Week 1)
- [ ] Initialize Turborepo monorepo with pnpm
- [ ] Create all `packages/` and `apps/` directories
- [ ] Configure shared TypeScript, ESLint, Prettier
- [ ] Set up GitHub repository
- [ ] Set up GitHub Actions CI pipeline
- [ ] Write root `package.json` with turbo scripts
- [ ] Configure Changesets

### Phase 2: Core Utils (Week 1–2)
- [ ] Build `packages/utils` (cn, format, types)
- [ ] Build `packages/config` (shared ESLint, TS, Tailwind configs)
- [ ] Set up CSS variables system (globals.css template)
- [ ] Set up Tailwind config with all custom tokens

### Phase 3: First Components (Week 2–3)
Build these first as they're referenced everywhere:
- [ ] Button (with all variants + loading state)
- [ ] Input (with error, icons)
- [ ] Label
- [ ] Badge
- [ ] Card (compound component)
- [ ] Separator
- [ ] Skeleton

Write tests for each component as you go.

### Phase 4: Overlay + Navigation (Week 3–4)
- [ ] Dialog (Modal)
- [ ] Drawer
- [ ] Popover
- [ ] Tooltip
- [ ] Tabs
- [ ] Accordion
- [ ] DropdownMenu

### Phase 5: Form System (Week 4–5)
- [ ] Form, FormField, FormItem, FormLabel, FormControl, FormMessage
- [ ] Checkbox, Radio, RadioGroup
- [ ] Switch
- [ ] Textarea
- [ ] Select

### Phase 6: Data Display (Week 5–6)
- [ ] Avatar, AvatarGroup
- [ ] Table (basic), DataTable (advanced)
- [ ] Progress
- [ ] Alert
- [ ] Toast + useToast hook
- [ ] Spinner
- [ ] ScrollArea

### Phase 7: Advanced Components (Week 6–7)
- [ ] Command (cmdk)
- [ ] Combobox
- [ ] DatePicker
- [ ] MultiSelect
- [ ] Slider
- [ ] FileUpload
- [ ] Navbar
- [ ] Sidebar
- [ ] Breadcrumb
- [ ] Pagination

### Phase 8: CLI (Week 7–9)
- [ ] CLI scaffold (Commander.js, tsup build)
- [ ] `craftui init` — full project initialization
- [ ] `craftui add` — component installer
- [ ] `craftui list` — component browser
- [ ] `craftui remove` — component remover
- [ ] Build registry JSON for all components
- [ ] Framework detection (Next.js, Vite, CRA)
- [ ] TypeScript detection
- [ ] Tailwind detection + auto-setup

### Phase 9: Docs Site (Week 9–12)
- [ ] Next.js docs app setup
- [ ] MDX pipeline (Contentlayer or next-mdx-remote)
- [ ] Syntax highlighting (Shiki)
- [ ] Landing page
- [ ] Sidebar navigation
- [ ] Component preview widget
- [ ] Props table component
- [ ] Copy button
- [ ] Dark mode toggle
- [ ] Search (Algolia or Pagefind)
- [ ] MDX pages for all 30+ components

### Phase 10: Polish & Launch (Week 12+)
- [ ] Full accessibility audit (axe DevTools)
- [ ] Performance audit
- [ ] Write comprehensive README
- [ ] Publish `craftui` CLI to npm
- [ ] Deploy docs to Vercel
- [ ] Create demo video/GIF
- [ ] Post on Twitter/X, Reddit r/reactjs, Dev.to
- [ ] Submit to JavaScript Weekly, React Status

---

## 36. Common Pitfalls to Avoid

### Technical Pitfalls

| Pitfall | Why it's bad | Solution |
|---------|-------------|----------|
| Using global CSS instead of Tailwind | Breaks copy-paste model | Always use Tailwind utility classes |
| Forgetting `displayName` on components | Breaks React DevTools | Always set it |
| Not using `forwardRef` | Breaks `ref` usage | Always use it for DOM elements |
| Hardcoding colors instead of CSS vars | Breaks theming | Always use `hsl(var(--color))` |
| Skipping accessibility | Fails in real apps | Use Radix primitives |
| Large component files | Hard to maintain | Split logic into hooks |
| No test coverage | Breaks on refactor | Write tests alongside components |
| Skipping `aria-` attributes | Screen readers fail | Built into every component |

### CLI Pitfalls

| Pitfall | Solution |
|---------|----------|
| Not detecting existing Tailwind config | Always check before overwriting |
| Overwriting user's globals.css | Merge, don't replace |
| Hardcoding paths | Read from `craftui.config.json` |
| Not handling monorepo structure | Support custom paths via config |
| No conflict detection | Check if file exists before writing |

### DX Pitfalls

| Pitfall | Solution |
|---------|----------|
| Poor error messages from CLI | Use chalk + clear descriptions |
| No progress feedback | Use ora spinners |
| Silent failures | Always log what happened |
| Too many breaking changes | Follow semver strictly |
| Missing changelog | Changesets handles this |

---

## 37. Launch Strategy

### Pre-Launch (Build in public)
1. Create Twitter/X account: `@craftui_dev`
2. Post weekly progress updates with screenshots
3. Build a waitlist page early
4. Open GitHub repo as public from day one
5. Tag issues as `good-first-issue` for community contributions

### Launch Day
1. Post on: Product Hunt, Hacker News (Show HN), Reddit r/reactjs, r/webdev
2. Tweet thread with: problem → solution → demo → install command
3. Create a YouTube demo video (5 minutes max)
4. Write a Dev.to article: "Why I built CraftUI"
5. Submit to newsletters: JavaScript Weekly, React Status, Bytes.dev

### Post-Launch Growth
1. Write component tutorials (individual articles for each component)
2. Create comparison articles: "CraftUI vs shadcn/ui — what's different"
3. Build a GitHub Discussions community
4. Respond to every GitHub issue within 24 hours
5. Add "Made with CraftUI" showcase page to docs

---

## 38. Master Prompt — Generate Full Project in One Shot

Use this prompt with any AI coding tool (Cursor, Claude, Copilot, Bolt, v0):

---

```
You are an expert full-stack TypeScript developer building a production-grade, open-source UI component library called CraftUI.

## Project Overview
CraftUI is a developer-owned, Tailwind-native, copy-paste UI component system for React/Next.js. It follows the shadcn/ui model but goes deeper with a more complete CLI, better theming system, full form integration, and more components.

## Monorepo Structure
Use Turborepo + pnpm workspaces. Structure:

apps/docs        → Next.js 14 App Router documentation site
apps/playground  → Vite React sandbox
packages/ui      → Component source templates
packages/cli     → CLI tool (Commander.js, published as "craftui" on npm)
packages/registry → Component metadata JSON
packages/config  → Shared ESLint, TypeScript, Tailwind configs
packages/utils   → Shared utilities (cn function, types, formatters)

## Tech Stack
- React 18 + TypeScript 5
- Tailwind CSS v3 + tailwindcss-animate
- class-variance-authority (CVA) for component variants
- clsx + tailwind-merge for class merging
- Radix UI primitives (for Dialog, Select, Popover, Tabs, Accordion, etc.)
- React Hook Form + Zod for forms
- lucide-react for icons
- Commander.js + Inquirer.js for CLI
- tsup for CLI bundling
- Vitest + Testing Library + jest-axe for testing
- Changesets for versioning
- GitHub Actions for CI/CD

## Core Rules
1. Every component uses React.forwardRef
2. Every component has displayName set
3. Every component uses CVA for variants
4. Every component uses CSS variables (hsl(var(--color))) for theming
5. Every component must be keyboard accessible
6. Every component must pass axe accessibility audit
7. Colors use HSL CSS variables, never hardcoded hex
8. Use cn() utility (clsx + tailwind-merge) for all className merging
9. Components are self-contained — no runtime dependency after copy-paste
10. CLI reads craftui.config.json for project configuration

## Components to Build
Build ALL of the following with full TypeScript types, CVA variants, accessibility, and forwardRef:

Basic: Button, Input, Textarea, Label, Checkbox, Radio, RadioGroup, Switch
Overlay: Dialog, Drawer, Popover, Tooltip, AlertDialog
Navigation: Tabs, Accordion, DropdownMenu, NavigationMenu, Breadcrumb, Pagination
Display: Card, Avatar, AvatarGroup, Badge, Table, DataTable, Skeleton, Separator, ScrollArea
Feedback: Toast (with useToast hook), Alert, Progress, Spinner
Layout: Container, Stack, Grid, AspectRatio
Forms: Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage
Advanced: Select, Combobox, Command, DatePicker, MultiSelect, Slider, FileUpload

## CLI Commands
Build these commands:
- craftui init → Initialize CraftUI (write craftui.config.json, update tailwind.config.ts, write globals.css)
- craftui add [component] → Copy component from registry to project
- craftui remove [component] → Delete component from project
- craftui list → Show all available components
- craftui diff [component] → Show diff between local and registry version
- craftui theme generate → Generate custom theme from brand color
- craftui theme apply [name] → Apply a preset theme

## Theming System
CSS Variables in globals.css:
- All colors in HSL format: --primary: 221.2 83.2% 53.3%;
- Full light and dark mode variable sets
- Variables for: background, foreground, card, popover, primary, secondary, muted, accent, destructive, success, warning, border, input, ring, radius

Tailwind config must extend with: hsl(var(--color)) mappings for all variables.

## Registry Format
Each component has a JSON file in packages/registry/src/components/:
{
  "name": "button",
  "description": "...",
  "category": "inputs",
  "files": [{ "path": "...", "target": "...", "type": "component" }],
  "dependencies": [...npm deps...],
  "registryDependencies": [...other craftui components...]
}

## Documentation Site (apps/docs)
Next.js 14 App Router with:
- Dynamic MDX rendering for component docs
- ComponentPreview component (shows live demo + code tabs)
- PropsTable component (shows component API)
- InstallCommand component (shows craftui add command)
- CodeBlock with syntax highlighting (Shiki)
- CopyButton
- Dark mode toggle
- Sidebar navigation with all component pages
- Landing page with hero, features, demo

## Testing
Every component must have a test file (component.test.tsx) with:
- Render test
- Variant tests
- Interaction tests (click, keyboard)
- Loading/disabled state tests
- Accessibility test (axe)

## Configuration Files
Include:
- turbo.json (pipeline for build, dev, lint, test)
- pnpm-workspace.yaml
- Root package.json with workspace scripts
- .changeset/config.json
- .eslintrc.js (using @craftui/config/eslint/base)
- .prettierrc (with prettier-plugin-tailwindcss)
- .husky/pre-commit (runs lint-staged)
- GitHub Actions: ci.yml (test + lint on PR), release.yml (Changesets release)

## Output
Generate the complete monorepo — every file, every directory, every configuration. Start with:
1. Root monorepo setup files
2. packages/utils
3. packages/config  
4. packages/ui (all components)
5. packages/registry (all JSON entries)
6. packages/cli (full CLI with all commands)
7. apps/docs (full documentation site)
8. apps/playground

Make every file production-ready, not placeholder code. Every component should be immediately usable.
```

---

## Appendix A: craftui.config.json Schema

```json
{
  "$schema": "https://craftui.dev/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

## Appendix B: Useful Commands Reference

```bash
# Development
pnpm dev                          # Start all apps in dev mode
pnpm build                        # Build all packages
pnpm lint                         # Lint all packages
pnpm test                         # Run all tests
pnpm format                       # Format all files

# CLI development
pnpm dev --filter=craftui         # Watch CLI build
node packages/cli/dist/index.js --version  # Test CLI locally

# Releasing
pnpm changeset                    # Create a changeset
pnpm version-packages             # Bump versions
pnpm release                      # Build + publish to npm

# Testing a component
cd packages/ui && pnpm test button

# Adding a new component (for contributors)
# 1. Create component file in packages/ui/src/components/
# 2. Write tests
# 3. Add registry JSON in packages/registry/src/components/
# 4. Add MDX docs in apps/docs/content/docs/components/
# 5. Update navigation in apps/docs/lib/navigation.ts
```

## Appendix C: Component Naming Conventions

```
File:       component-name.tsx          (kebab-case)
Component:  ComponentName               (PascalCase)
Variants:   componentNameVariants       (camelCase, suffix "Variants")
Hook:       useComponentName            (camelCase, prefix "use")
Type:       ComponentNameProps          (PascalCase, suffix "Props")
Test:       component-name.test.tsx     (same as component file)
```
