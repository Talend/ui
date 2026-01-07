# Plan: Eliminate Sass from talend/ui via CSS Variables

**TL;DR:** Create a unified CSS variables framework by mapping ~400 Sass variables (from bootstrap-theme) to a standardized CSS variable naming convention (following the existing coral design-tokens pattern: `--coral-*`), then systematically convert 293 .module.scss files to .module.css files with updated variable imports. Leverage existing design-tokens infrastructure (~150 CSS variables already defined) as foundation, and expand with missing bootstrap-theme variables. Migrate incrementally by package, starting with design-system (which already uses tokens), then components.

## Steps

### 1. Map all Sass variables to standardized CSS variable names

Extract all variables from `/packages/theme/src/theme/_variables.scss` and related theme files, create mapping table (e.g., `$padding-smaller` → `--coral-spacing-xs`), identifying which map to existing design-tokens and which need new definitions.

**Deliverables:**

- Complete mapping document listing all ~400 Sass variables with their CSS variable equivalents
- Identification of which variables already exist in design-tokens vs. new ones needed
- Categorized groupings (colors, spacing, typography, sizing, z-index, breakpoints, components)

### 2. Create comprehensive CSS variables file in theme package

Generate `/packages/theme/src/theme/css-variables.css` with all 400+ variables organized by category (colors, spacing, typography, sizing, z-index, breakpoints, components), using the `--coral-*` or `--talend-*` naming convention with fallback values.

**Deliverables:**

- Single authoritative CSS variables file with proper fallbacks
- Organized by logical sections (colors, spacing, typography, sizing, etc.)
- Can be imported as single source of truth for all packages
- Includes computed values where applicable (pixel conversions from relative units)

### 3. Create SCSS-to-CSS variable mapping reference

Document in `/packages/theme/VARIABLE_MAPPING.md` the complete mapping (Sass variable → CSS variable name) for developer reference and automated migration tooling.

**Deliverables:**

- Markdown reference guide for developers
- Structured format suitable for automated parsing by migration scripts
- Examples of before/after usage in .scss vs. .css files

### 4. Audit current Sass imports across 293 .module.scss files

Catalog which files import from `@talend/bootstrap-theme` vs. `@talend/design-tokens`, identify duplicate/conflicting variable usage patterns, and group files by package/migration complexity.

**Deliverables:**

- Audit report with file count per package
- Import pattern analysis
- Complexity classification for prioritization
- List of files by migration priority tier

### 5. Batch convert files by package priority

Process files in order (design-system → components → forms → containers → other packages): rename .module.scss → .module.css, replace Sass imports (`@use '@talend/bootstrap-theme/...'`) with CSS variable declarations (`:root` or scoped `:global`), update all variable references (`$var` → `var(--coral-var)`), remove Sass-specific syntax (mixins, functions, nesting).

**Execution approach:**

- **Tier 1 (design-system):** ~90 files, many already using design-tokens (quick wins)
- **Tier 2 (components):** ~100+ files, mixed bootstrap-theme + design-tokens usage
- **Tier 3 (forms, containers):** ~50+ files, primarily bootstrap-theme dependent
- **Tier 4 (other packages):** Remaining ~50 files, legacy or specialized usage

**Deliverables per batch:**

- Converted .css files with updated variable references
- Verification that all variables are properly mapped
- Test results confirming visual parity

### 6. Configure webpack/build system to process CSS instead of Sass

Update [webpack.config.js](webpack.config.js) and package build configs to compile/minify .css files, ensure CSS variables are available at runtime (link css-variables.css in theme package entry point), and maintain backward compatibility during transition.

**Deliverables:**

- Updated webpack configuration
- Build configuration changes for each package
- Integration of css-variables.css into build output
- Documentation of build process changes

### 7. Create automated migration script

Develop tooling to parse .module.scss files, apply variable mappings automatically, and generate .module.css equivalents to accelerate bulk conversion across 293 files.

**Deliverables:**

- Migration script that:
  - Reads .module.scss files
  - Applies variable mapping transformations
  - Generates .module.css output
  - Reports on unmapped variables or potential issues
- Usage documentation
- Validation/testing capability

## Further Considerations & Decision Points

### 1. Design-tokens vs. bootstrap-theme variables conflict

**Context:** The codebase has two systems: design-tokens (150+ coral variables) and bootstrap-theme (400+ variables).

**Options:**

- **(A)** Consolidate bootstrap-theme variables into coral namespace
- **(B)** Create separate talend-bootstrap namespace
- **(C)** Extend coral tokens to cover all bootstrap-theme needs

**Recommendation:** Option (C) - Extend coral tokens. Maintains single naming convention, leverages existing coral variable infrastructure, and simplifies developer experience. Can organize new variables in existing coral categories or create new ones as needed (e.g., `--coral-legacy-*`).

### 2. Browser compatibility and CSS variable fallbacks

**Context:** CSS variables have ~95% browser support, but older browsers need fallbacks.

**Options:**

- **(A)** Require modern browsers only and remove fallbacks
- **(B)** Maintain dual Sass/CSS output during transition period
- **(C)** Use postcss-variables plugin for legacy browser support

**Recommendation:** Option (C) for safety during transition. Provides backward compatibility while gaining benefits of CSS variables. Can be phased out once minimum browser requirements are established.

### 3. Scope of variable adoption

**Context:** How should CSS variables be deployed?

**Options:**

- **(A)** In `:root` for global availability (simple, large file)
- **(B)** Scoped to each component file (modular, repeated declarations)
- **(C)** Lazy-loaded via CSS modules

**Recommendation:** Option (A) with enhanced organization. Single authoritative CSS variables file in theme package, imported globally. Organized into logical sections for maintainability. Scales better than per-component approach and simpler than lazy-loading.

### 4. Testing and validation strategy

**Context:** Ensuring migration doesn't break styling or introduce regressions.

**Options:**

- **(A)** Visual regression testing to verify CSS rendering matches Sass output
- **(B)** Automated variable reference checks to catch missed migrations
- **(C)** Both, plus manual sampling of critical components

**Recommendation:** Option (C). Implement:

- Automated checks: Scan for any remaining `$variable` references in converted files
- Script to validate all variable names exist in css-variables.css
- Visual regression testing on Storybook components
- Manual QA on high-impact components (buttons, forms, navbar)
- Cross-browser testing (modern browsers + one legacy version if supporting)

### 5. Timeline and phasing strategy

**Recommended phases:**

1. **Phase 1 (weeks 1-1):** Mapping and CSS variables file creation
2. **Phase 2 (weeks 2-2):** Automation tooling development and testing
3. **Phase 3 (weeks 3-4):** Batch migrations (Tier 1 & 2 packages)
4. **Phase 4 (week 5):** Batch migrations (Tier 3 & 4 packages) + testing
5. **Phase 5 (week 5-6):** Build system updates and integration
6. **Phase 6 (week 6):** Final testing, documentation, and cleanup

**Total Estimate:** 6 weeks with agent-mode autonomous execution

### 6. Handling edge cases

**Considerations:**

- **Computed Sass functions:** Some variables use Sass functions (lighten, darken, etc.). Need to pre-compute CSS values or use CSS calc() where possible.
- **Component-scoped variables:** Some .scss files define local variables. Decide: convert to CSS custom properties in file scope or centralize?
- **Theme variations:** If supporting multiple themes (light/dark), ensure CSS variables support theme switching mechanism.
- **Backward compatibility:** Consider keeping bootstrap-theme package working during transition for packages not yet migrated.

## Success Criteria

- [ ] All 293 .module.scss files converted to .module.css
- [ ] All 400+ Sass variables mapped to CSS equivalents
- [ ] Single authoritative CSS variables file created and integrated
- [ ] Build system updated and verified working
- [ ] No regressions in visual output (verified via automated + manual testing)
- [ ] Documentation updated for new CSS variable patterns
- [ ] Bootstrap-theme Sass imports fully removed from converted files
- [ ] No performance regression in bundle size or load times
