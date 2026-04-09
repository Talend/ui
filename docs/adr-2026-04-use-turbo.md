# ADR: Set up Turbo Repo and Hoist Dev Dependencies

## Context

Talend/UI is a Yarn workspaces monorepo with multiple packages, tools, and forked dependencies spread across `packages/`, `tools/`, and `fork/` directories. Each of these packages and tools has its own `package.json` with duplicated development dependencies.

Our current build orchestration relies on custom Yarn workspace scripts managed through `@talend/scripts-yarn-workspace`. As the monorepo grows, we face several challenges:

- **Redundant installations**: Development tools like Babel, ESLint, TypeScript, and build scripts are installed in every package's `node_modules`, consuming significant disk space and installation time.
- **Lack of build caching**: Without proper task orchestration and caching, builds are not optimized across the monorepo, leading to repeated compilation of unchanged dependencies.
- **Inconsistent tooling versions**: Managing identical versions of development tools across multiple `package.json` files is error-prone and difficult to maintain.
- **Slow developer experience**: Install times and build times are longer than necessary due to redundant installations and lack of caching.

Additionally, the transition to ECMAScript Modules (ESM) and modern build tooling (as defined in ADR: Add support to ECMAScript Modules) requires a more sophisticated build orchestration strategy to handle multiple output formats (`lib/` for CommonJS and `lib-esm/` for ESM).

## Problem

As the monorepo scales, we need:

1. **Efficient task orchestration** — Coordinate builds across packages with proper dependency tracking and parallelization.
2. **Build caching** — Avoid rebuilding packages when their inputs haven't changed.
3. **Centralized tool management** — Reduce disk usage and ensure consistent tool versions across the monorepo.
4. **Faster CI/CD pipelines** — Enable distributed task execution and incremental builds.

## Decision

We adopt **Turbo** as our monorepo build orchestration tool and **hoist development dependencies to the workspace root**.

### Turbo Setup

Turbo is configured via `turbo.json` to:

- Define task dependencies and outputs for all build tasks (e.g., `build:lib`, `build:lib:esm`, `test`, `lint`)
- Enable automatic caching of task outputs based on input changed files
- Parallelize independent tasks across packages
- Support distributed task execution for faster CI/CD pipelines

Example task configuration:

```json
{
	"tasks": {
		"build:lib": {
			"dependsOn": ["^build:lib"],
			"outputs": ["lib/**"]
		}
	}
}
```

### Dev Dependencies Hoisting

Development dependencies are moved to the root `package.json`:

- **Shared tools**: Babel presets, ESLint configs, TypeScript config, Prettier, and all `@talend/scripts-*` packages
- **Locale packages**: Localization files (`@talend/locales-*`) used across packages
- **Peer dependencies for dev**: React, React DOM, and other peer dependencies used during development

This approach:

- Eliminates duplicate `node_modules` directories for development tools
- Ensures consistent tool versions across the entire monorepo
- Reduces installation time and disk usage
- Simplifies dependency management (single source of truth)

Individual packages retain only **runtime dependencies** specific to their functionality (e.g., `lodash`, `date-fns`, `classnames`).

## Alternatives Considered

### 1. Keep Current Setup (No Turbo, Distributed Dev Dependencies)

**Pros:**

- Minimal changes required
- Packages remain fully independent

**Cons:**

- Continued redundant installations and slow build times
- Lack of build caching and optimization
- Difficult to scale as the monorepo grows
- Higher CI/CD costs due to lack of caching and incremental builds

### 2. Use Nx Instead of Turbo

**Pros:**

- Nx provides advanced features like computation hashing and distributed computation
- More opinionated project structure

**Cons:**

- Heavier framework with more learning curve
- Overkill for current needs
- Would require more significant restructuring

### 3. Partially Hoist Dev Dependencies

**Pros:**

- Reduces disk usage without fully removing package autonomy

**Cons:**

- Still leaves redundancy and inconsistency
- More complex to maintain than full hoisting
- Does not fully solve the caching and orchestration problems

## Consequences

### Positive

- **Faster builds**: Turbo's caching prevents rebuilding unchanged packages.
- **Reduced disk usage**: Dev dependencies are installed once at the root instead of in each package.
- **Faster CI/CD**: Incremental builds and caching reduce total build time in pipelines.
- **Simplified dependency management**: Tool versions are managed in a single file.
- **Better parallelization**: Turbo automatically parallelizes independent tasks.
- **Future-proof**: Enables easier adoption of distributed task execution and remote caching.

### Negative

- **Setup complexity**: Requires careful configuration of task dependencies in `turbo.json`.
- **Learning curve**: Developers need to understand Turbo concepts (tasks, caching, outputs).
- **Potential compatibility issues**: Moving dev dependencies to root may expose version conflicts if individual packages had pinned to different versions.
- **Debugging complexity**: Turbo caching can sometimes make debugging harder if developers don't understand what's cached.

### Risks

- **Misconfigured task outputs**: If `outputs` in `turbo.json` don't match actual build outputs, caching will fail silently, causing stale artifacts to be served.
- **Root-level dependency bloat**: Over time, the root `package.json` could accumulate unnecessary dependencies if not carefully curated.
- **Local development friction**: Developers must run `yarn install` at the root; package-level `yarn install` in subdirectories won't work as expected.

## Implementation Notes

1. **Migration approach**: Move dev dependencies incrementally from individual packages to the root, testing each batch to ensure no regressions.
2. **Task configuration**: Configure task dependencies carefully in `turbo.json` to reflect the actual build dependency graph (e.g., `"dependsOn": ["^build:lib"]` means "run after dependencies' build:lib").
3. **Documentation**: Update developer guides to explain the new setup and how to run tasks correctly.
4. **CI/CD updates**: Update CI pipelines to use `turbo` commands for task orchestration and to take advantage of caching (e.g., `.turbo/` cache in CI).

## Related Decisions

- **ADR: Add support to ECMAScript Modules (ESM)** — This ADR enables efficient handling of multiple output formats through Turbo's task orchestration.
