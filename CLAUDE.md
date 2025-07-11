# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Now.ts Registry** is a custom shadcn/ui component registry built with Next.js 15. It distributes reusable React components, hooks, and blocks that can be installed via the shadcn CLI using the URL pattern: `npx shadcn@latest add https://ui.nowts.app/r/[component-name].json`

## Key Technologies

- **Next.js 15.3.4** with App Router and Turbopack in development
- **React 19.1.0** with TypeScript 5
- **Tailwind CSS v4** (latest version)
- **shadcn/ui** as the base component system
- **PNPM** as package manager
- **MDX** for documentation with next-mdx-remote

## Essential Commands

### Development
```bash
pnpm dev              # Start development server with Turbopack
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run ESLint
pnpm ts               # TypeScript type checking
```

### Registry Operations
```bash
pnpm registry:build   # Build registry JSON files from registry.json
shadcn build          # Alternative registry build command
pnpm knip             # Detect unused code
```

## Architecture & File Structure

### Registry System
- `/registry/nowts/` - Source components, hooks, and blocks
- `registry.json` - Registry configuration and metadata
- `/public/r/` - Generated JSON files for distribution (auto-generated by `shadcn build`)
- Components are installed via: `npx shadcn@latest add https://ui.nowts.app/r/[name].json`

### Core Directories
- `/app/` - Next.js App Router pages and layouts
- `/app/_docs/` - MDX documentation files
- `/components/ui/` - shadcn/ui base components
- `/lib/` - Utilities, hooks, and shared logic
- `/lib/mdx/` - MDX processing utilities

### Component Types
1. **registry:component** - Individual UI components
2. **registry:hook** - Custom React hooks  
3. **registry:block** - Complex component compositions

## Registry Development Workflow

1. **Add Component**: Create in `/registry/nowts/[type]/[name]/`
2. **Update Registry**: Add entry to `registry.json` with dependencies
3. **Build Registry**: Run `pnpm registry:build` to generate JSON files
4. **Test Installation**: Use `npx shadcn@latest add` with local/remote URL

## Key Features

### Modern React Patterns
- Server Components support with Next.js 15
- Strict TypeScript configuration
- Component variants with Class Variance Authority
- Form handling with React Hook Form + Zod validation

### Documentation System
- MDX-based docs in `/app/_docs/`
- Live component examples
- Copy-paste ready code snippets
- "Open in v0" integration for components

## Important Notes

- **No formal testing framework** - tests should be added if implementing test coverage
- **Registry files in `/public/r/` are auto-generated** - never edit manually
- **Always run `pnpm registry:build`** after modifying `registry.json`
- **Follow shadcn/ui conventions** for component structure and naming
- **Use server components by default** unless client interactivity is needed

## Code Style Guidelines

- Always use named export without default for component and only use default export for Next.js pages