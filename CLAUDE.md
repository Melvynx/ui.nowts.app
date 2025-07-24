# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build the application for production
- `pnpm lint` - Run ESLint checks
- `pnpm ts` - Run TypeScript type checking
- `pnpm registry:build` - Build the shadcn/ui registry
- `pnpm knip` - Run dependency analysis with Knip

⚠️ always use pnpm

## Architecture Overview

This is a **shadcn/ui registry** built with Next.js that distributes custom React components, hooks, and blocks. The key architectural components:

### Registry System

- **Registry definition**: `registry.json` defines all available components with metadata
- **Component storage**: `registry/nowts/` contains all registry components organized by type:
  - `components/` - Individual UI components
  - `hooks/` - React hooks
  - `blocks/` - Complex multi-file components
- **Build output**: `public/r/` contains built registry JSON files for distribution
- **API endpoint**: Route handlers serve registry items for the shadcn CLI

### Component Types

1. **registry:component** - Single file UI components
2. **registry:hook** - React hooks
3. **registry:block** - Multi-file complex components with their own folder structure

### Documentation System

- **MDX docs**: `app/_docs/` contains component documentation
- **Example components**: `app/ui/_components/examples/` shows usage examples
- **Auto-injection**: Documentation is automatically injected into pages via `InjectDocs`

### Key Features

- **v0 integration** - Components support "Open in v0" functionality
- **Multi-dependency support** - Components can depend on other registry items or npm packages
- **Auto-generated builds** - Registry items are built to static JSON files

### Component Dependencies

Components use `registryDependencies` to reference other shadcn/ui components and can include external URLs for cross-registry dependencies (e.g., `"https://ui.nowts.app/r/spinner.json"`).

### Layout Integration

Several registry components are integrated into the root layout:

- `ServerToaster` - Server-side toast notifications
- `DialogManagerRenderer` - Global dialog management
- `NextTopLoader` - Navigation progress indicator

## Registry Schema Reference

### registry.json Structure

- `$schema`: "https://ui.shadcn.com/schema/registry.json"
- `name`: Registry identifier (e.g., "Now.ts UI")
- `homepage`: Registry homepage URL
- `items`: Array of registry items

### Registry Item Types

- `registry:component` - Single UI components
- `registry:hook` - React hooks
- `registry:block` - Multi-file components with complex structure
- `registry:lib` - Library utilities
- `registry:ui` - UI-specific components
- `registry:page` - Full page components

### Item Properties

- `name`: Unique identifier for shadcn CLI
- `type`: One of the registry types above
- `title`: Human-readable display name
- `description`: Component description
- `dependencies`: NPM packages required
- `registryDependencies`: Other registry components needed (can reference external registries with full URLs)
- `files`: Array of file objects with `path`, `type`, and optional `target`
- `docs`: Special installation instructions or notes
- `categories`: Organizational tags
- `meta`: Additional metadata

### File Object Structure

```json
{
  "path": "registry/nowts/components/spinner.tsx",
  "type": "registry:component",
  "target": "/components/ui/spinner.tsx" // Optional: custom install location
}
```

For detailed schemas, see:

- https://ui.shadcn.com/docs/registry/registry-json
- https://ui.shadcn.com/docs/registry/registry-item-json
