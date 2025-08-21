# CLAUDE.md

This file provides guidance for using Claude Code (claude.ai/code) within this repository.

## Project Structure

### Current Blog Template Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Homepage (uses Main.tsx)
│   ├── Main.tsx           # Homepage component
│   ├── blog/              # Blog listing and individual posts
│   ├── about/             # About page
│   ├── projects/          # Projects showcase
│   └── tags/              # Tag-based filtering
├── components/            # Reusable React components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Site footer
│   ├── ThemeSwitch.tsx    # Dark/light mode toggle
│   └── ...
├── layouts/               # Blog post layout templates
│   ├── PostLayout.tsx     # Full post layout with sidebar
│   ├── PostSimple.tsx     # Simple post layout
│   └── ListLayoutWithTags.tsx # Blog listing with tag sidebar
├── data/                  # Content and configuration
│   ├── blog/             # Blog posts (MDX files)
│   ├── authors/          # Author information (MDX)
│   ├── siteMetadata.js   # Site configuration
│   └── headerNavLinks.ts # Navigation links
├── css/                  # Stylesheets
├── public/static/        # Static assets (images, favicons)
└── contentlayer.config.ts # Content processing config
```

## Key Architectural Patterns

### Frontend (Feature-Sliced Design)

- **Container/Presentational Pattern**: `*Container.tsx` handles logic, pure components handle UI
- **FSD Structure**: `app/` → `pages/` → `features/` → `entities/` → `shared/`
- **State Management**: Jotai for global state, React Hook Form + Zod for forms

### File Naming Conventions

- Use **kebab-case** for all files and directories
- **Container Pattern**: `feature-name-container.tsx` + `feature-name.tsx`
- **GraphQL Files**: Use `.graphql` extension under the `api/` directory
- **Tests**: Place next to source files as `.test.tsx` or `.spec.ts`

### Key Topics in the Style Guide

- Frontend conventions (arrow functions, early returns, typing)
- Container/Presentational pattern implementation
- React component naming rules
- File and folder naming (kebab-case)
- Structure and criteria for code reviews

## Important Rule - How to Add New Rules

If a user gives a direction that should be permanently enforced:

1. Ask: “Should we make this a standard rule?”
2. If answered YES, add the rule to `CLAUDE.md`
3. From then on, enforce it as a standard project rule

This process helps continuously improve project rules.

## Blog Template Information

### Tech Stack

- **Framework**: Next.js 15.2.4 with App Router
- **Styling**: Tailwind CSS 4.0.5
- **Content**: MDX with Contentlayer2
- **Language**: TypeScript
- **Package Manager**: Yarn

### Key Development Commands

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint with auto-fix

### Content Management

#### Blog Posts

- Location: `data/blog/*.mdx`
- Format: MDX (Markdown + JSX)
- Frontmatter fields:
  ```yaml
  ---
  title: 'Post Title' (required)
  date: '2023-12-01' (required)
  tags: ['nextjs', 'tailwind'] (optional)
  draft: false (optional)
  summary: 'Post description' (optional)
  authors: ['default'] (optional)
  layout: PostLayout (optional)
  ---
  ```

#### Authors

- Location: `data/authors/*.mdx`
- Default author: `data/authors/default.mdx`

### Configuration Files

#### Site Metadata (`data/siteMetadata.js`)

- Site title, description, URL
- Social media links
- Analytics configuration
- Comments system setup
- Newsletter provider

#### Content Processing (`contentlayer.config.ts`)

- MDX plugins configuration
- Content type definitions
- Tag counting and search index generation

#### Next.js Config (`next.config.js`)

- Security headers
- Image optimization
- Bundle analysis
- SVG handling

### Built-in Features

- ✅ Dark/light theme toggle
- ✅ Mobile-responsive design
- ✅ Blog post pagination
- ✅ Tag-based filtering
- ✅ Search functionality (Kbar)
- ✅ RSS feed generation
- ✅ Sitemap generation
- ✅ SEO optimization
- ✅ Analytics integration
- ✅ Comments system
- ✅ Newsletter signup
- ✅ Reading time estimation
- ✅ Table of contents
- ✅ Syntax highlighting
- ✅ Math rendering (KaTeX)

### Deployment Options

#### Static Export (GitHub Pages/S3)

```bash
EXPORT=1 UNOPTIMIZED=1 yarn build
```

#### Vercel (Recommended)

- Push to GitHub
- Connect to Vercel
- Auto-deploys on push

#### Environment Variables

- `NEXT_UMAMI_ID` - Umami analytics ID
- `NEXT_PUBLIC_GISCUS_*` - Giscus comments config
- See `siteMetadata.js` for full list
