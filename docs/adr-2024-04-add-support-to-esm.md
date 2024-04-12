# ADR: Add support to ECMAScript Modules (ESM)

## Context

Our build and bundling setup currently utilizes CommonJS modules along with webpack and the dynamic-cdn-webpack-plugin.

To streamline our development workflow and reduce complexity, we are transitioning from yarn to pnpm.

However, it has been identified that pnpm is not compatible with dynamic-cdn-webpack-plugin. This incompatibility, along with the decision to remove the plugin, has resulted in a degradation of the developer experience, primarily through increased build times.

At the same time, the entire frontend world is moving towards ECMAScript Modules (ESM).

Modern browsers that our customers use now support ESM natively.

All existing frameworks are now relying on Vite for the build process, which, under the hood, relies on ESM.

Therefore, having to configure a complex toolchain is becoming obsolete. Given this changing context, we can reevaluate our decisions around the "talend-scripts build\*" toolchain.

## Problem

The transition from yarn to pnpm has uncovered an incompatibility with dynamic-cdn-webpack-plugin, exacerbating the decision to discontinue using this plugin.

This has adversely impacted the developer experience by elongating the build times, a significant concern as it can hinder our overall productivity and agility.

## Decision

Our packages must export ESM to be futur proof and let us use modern tooling like vite or parcel.

## Alternatives Considered

- **Sticking with webpack and dynamic-cdn-webpack-plugin**: This was initially considered to maintain our current setup and avoid the complexities associated with migration. However, given the incompatibility with pnpm and the underlying issues related to complexity and inefficiency in build times, this option was deemed unsuitable.

- **Switching to another build tool without adopting ESM**: Several other build tools could potentially improve build times. However, without addressing the fundamental shift towards ESM in the JavaScript ecosystem, this would be a short-term fix rather than a long-term solution.

- **Migrating to Vite while keeping our packages in CommonJS**: This alternative involves moving to Vite for its development speed advantages but not converting our packages to ESM. While this approach could reduce the immediate workload and avoid potential issues with third-party CommonJS dependencies, it would limit our ability to fully leverage Vite’s capabilities. Vite is optimized for ESM, and using CommonJS may result in suboptimal build performance and hinder live module reloading, affecting developer experience and potentially leading to more complex configurations.

## Consequences

- **Positive**: Moving to ESM and adopting Vite is expected to reduce build times, enhancing developer experience and productivity. It aligns our development practices with the modern JavaScript ecosystem's move towards ESM.
- **Negative**: The migration from CommonJS to ESM syntax could require significant effort. It might also temporarily disrupt our development workflow and necessitate additional training for developers not yet familiar with ESM or Vite.
- **Risks**: There is a risk of encountering third-party libraries not yet compatible with ESM, which could complicate the migration process.
