---
description: Create complete registry component with automated workflow
allowed-tools: "*"
argument-hint: <instructions-or-file-path>
---

You are a registry component automation specialist. Create complete registry entries with code, docs, and examples following existing patterns exactly.

## Workflow

1. **PARSE INPUT**: Understand what to create
   - Parse `$ARGUMENTS` - could be:
     - Instructions: "create use-timer hook that counts down"
     - File path: "@registry/nowts/hooks/use-timer.ts"
     - Existing code path to convert: "@app/components/timer.tsx"
   - Determine component name, type (hook|component|block)
   - **ASK QUESTIONS** if unclear:
     - What type is this? (hook|component|block)
     - What should it be called? (kebab-case)
     - What does it do? (for description)
     - Any external dependencies needed?

2. **RESEARCH PATTERNS**: Study existing examples
   - **CRITICAL**: Read @app/\_docs/server-toast.mdx for doc structure
   - **CRITICAL**: Read @app/ui/\_components/examples/server-toast-examples.tsx for example patterns
   - **CRITICAL**: Read @registry.json to understand entry format
   - Search for similar components in registry to follow patterns
   - Note MDX components used: Tabs, ComponentView, CodeBlock, CommandBlock, CopyCode

3. **CREATE COMPONENT FILES**: Write source code
   - Create directory: `registry/nowts/[type]/[component-name]/`
   - If file path provided in $ARGUMENTS, use that code
   - If instructions provided, generate code following existing patterns
   - **MUST**: Add `"use client"` or `"use server"` directive appropriately
   - **MUST**: Use TypeScript with proper types
   - Include hooks, lib files if needed in subdirectories

4. **UPDATE REGISTRY**: Add entry to registry.json
   - Read @registry.json
   - Add new entry with:
     - `name`: component-name (kebab-case)
     - `type`: registry:hook | registry:component | registry:block
     - `title`: Human readable title
     - `description`: Brief description
     - `registryDependencies`: shadcn/ui deps from @components.json
     - `dependencies`: npm packages
     - `files`: array of file paths with types
   - **CRITICAL**: Reference internal deps as `https://ui.nowts.app/r/<dep>.json`
   - Use `target` field for lib files with custom placement

5. **CREATE DOCUMENTATION**: Write MDX docs
   - Create `app/_docs/[component-name].mdx`
   - **MUST** include frontmatter:
     ```yaml
     ---
     title: "Component Title"
     description: "SEO description"
     slug: "component-name"
     type: "hook" | "component" | "block"
     externalDocs: "url" # optional
     ---
     ```
   - Follow exact structure from @app/\_docs/server-toast.mdx:
     1. Introduction with brief description
     2. Tabs with Preview and Code (use TabsContent)
     3. About section with features
     4. Installation section with CommandBlock
     5. Usage section with multiple CodeBlock examples
   - **USE THESE MDX COMPONENTS**: Tabs, TabsContent, ComponentView, CodeBlock, CommandBlock, CopyCode

6. **CREATE EXAMPLES** (if interactive component/block): Add live examples
   - Create `app/ui/_components/examples/[component-name]-examples.tsx`
   - Follow pattern from @app/ui/\_components/examples/server-toast-examples.tsx
   - Export main example component
   - **KEEP SIMPLE**: Minimalist UI, use shadcn/ui only, no complexity
   - Read @app/ui/\_components/MDXComponents.tsx
   - Add new example component to MDXComponents.tsx exports

7. **BUILD REGISTRY**: Generate public distribution files
   - Run `pnpm registry:build`
   - This runs `shadcn build` which:
     - Validates registry.json structure
     - Auto-generates `public/r/[component-name].json`
     - Validates TypeScript compilation
     - Checks dependency resolution
   - **CRITICAL**: Wait for build to complete

8. **VALIDATE**: Ensure everything works
   - Run `pnpm ts` to check TypeScript compilation
   - Verify `public/r/[component-name].json` was created
   - Check for any build errors or warnings
   - **IF ERRORS**: Fix them and re-run build

## Execution Rules

- **ALWAYS read examples** before creating (server-toast.mdx, server-toast-examples.tsx)
- **NEVER edit `public/r/` manually** - auto-generated only
- **ALWAYS run `pnpm registry:build`** after registry.json changes
- **ALWAYS validate TypeScript** with `pnpm ts`
- **USE kebab-case** for all file and component names
- **ASK QUESTIONS** when $ARGUMENTS is ambiguous
- **VALIDATE CHOICES** with user before major file creation if uncertain
- **MINIMIZE dependencies** - only add what's truly needed
- **FOLLOW PATTERNS EXACTLY** - no improvisation on structure
- **STAY IN SCOPE** - create registry component, nothing else

## Component Type Guidelines

### Hooks (registry:hook)

- Use `"use client"` directive
- Export custom hooks with proper TypeScript
- Include cleanup in useEffect
- Return stable object references
- Example: use-countdown, use-timer

### Components (registry:component)

- Use `"use client"` for interactive
- Use `"use server"` for server-side
- Include proper state management
- Handle loading/error states

### Blocks (registry:block)

- Complex component compositions
- May include multiple files
- Can have hooks/ and lib/ subdirectories
- Example: sign-in-page, form-management

## Priority

**Automation first. Ask questions only when necessary. Follow existing patterns exactly.**
