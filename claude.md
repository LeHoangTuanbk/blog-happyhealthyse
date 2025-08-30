# CLAUDE.md

This file provides guidance for using Claude Code (claude.ai/code) within this repository.

## Project Structure

### Current Blog Template Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Homepage
│   ├── main.tsx           # Homepage component
│   ├── theme-providers.tsx # Theme provider component
│   ├── seo.tsx            # SEO component
│   ├── blog/              # Blog listing and individual posts
│   ├── about/             # About page
│   ├── projects/          # Projects showcase
│   ├── tags/              # Tag-based filtering
│   ├── list-100/          # List 100 items feature
│   └── fun-zone/          # Fun zone page
├── shared/                # Shared resources (FSD pattern)
│   ├── ui/
│   │   ├── components/    # Reusable React components
│   │   ├── layouts/       # Blog post layout templates
│   │   └── styles/        # Stylesheets
│   ├── content/           # Content and configuration
│   │   ├── blog/         # Blog posts (MDX files)
│   │   └── author/       # Author information (MDX)
│   ├── config/           # Configuration files
│   │   ├── site-metadata.ts # Site configuration
│   │   └── header-nav-links.ts # Navigation links
│   ├── consts/           # Constants
│   ├── utils/            # Utility functions
│   └── assets/           # Static assets
├── documents/             # Documentation
│   └── development/
│       └── coding-convention/ # Coding conventions
│           ├── main.md
│           ├── file-name.md
│           ├── frontend-component.md
│           ├── frontend-container-presentational.md
│           ├── frontend-error-handling.md
│           ├── frontend-fetch-data.md
│           ├── frontend-form.md
│           ├── frontend-props.md
│           └── no-any.md
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
- **Language**: TypeScript 5.9.2
- **Package Manager**: Yarn 3.6.1
- **Animations**: GSAP 3.13.0
- **Theme**: next-themes 0.4.6
- **Analytics**: Vercel Analytics & Speed Insights
- **Linting**: ESLint 9.14.0 with Prettier
- **Git Hooks**: Husky with lint-staged

### Key Development Commands

- `yarn dev` or `yarn start` - Start development server
- `yarn build` - Build for production
- `yarn serve` - Start production server
- `yarn lint` - Run ESLint with auto-fix
- `yarn ts-check` - Type checking with TypeScript
- `yarn analyze` - Analyze bundle size

### Content Management

#### Blog Posts

- Location: `shared/content/blog/*.mdx`
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

- Location: `shared/content/author/*.mdx`
- Default author: `shared/content/author/default.mdx`

### Configuration Files

#### Site Metadata (`shared/config/site-metadata.ts`)

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

- See `siteMetadata.js` for full list

## Coding Conventions

### Main Conventions

Coding conventions are documented in `documents/development/coding-convention/*`. You MUST read these files before writing code:

#### Core Principles (from main.md)

- Generate code considering SOLID principles
- Apply Clean Architecture and DDD for backend
- Always refer to existing code design and conventions
- Avoid using `any` type in TypeScript
- Avoid Type Assertion as much as possible
- Split long functions into appropriate granular functions
- Apply best practices from "Clean Code"
- Add JSDoc comments for functions

#### Container/Presentational Pattern (from frontend-container-presentational.md)

- **Container Components**: Handle business logic and state management
  - File name: `feature-name-container.tsx`
  - Component name: `FeatureNameContainer`
  - Can use both Container and Presentational components
  - Business logic should ONLY be written in Container

- **Presentational Components**: Handle UI only
  - File name: `feature-name.tsx`
  - Component name: `FeatureName`
  - Can only use other Presentational components
  - UI-related logic (modals, formatting) stays in Presentational
  - Use slots to pass Container components when needed

- **Page Components**: Add `page` to component name
  - File name: `login-page.tsx`
  - Component name: `LoginPage`

- **Guard Components**: Handle routing and navigation checks
  - File name: `feature-page-guard.tsx`
  - Component name: `FeaturePageGuard`

#### File Naming (from file-name.md)

- Use **kebab-case** for all files and directories
- Examples: `user-profile.tsx`, `api-handler.ts`

#### Important Notes

- You MUST access the convention files in `documents/development/coding-convention/*` before writing code
- Follow the existing patterns in the codebase
- Maintain consistency with project standards
