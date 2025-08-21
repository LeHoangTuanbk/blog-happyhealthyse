# CLAUDE.md

This file provides guidance for using Claude Code (claude.ai/code) within this repository.

## Project Structure

## Key Architectural Patterns

### Frontend (Feature-Sliced Design)

- **Container/Presentational Pattern**: `*Container.tsx` handles logic, pure components handle UI
- **FSD Structure**: `app/` → `pages/` → `features/` → `shared/`
- **GraphQL**: Uses Apollo Client with `.graphql` files and code generation
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
