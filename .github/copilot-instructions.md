# Talend/UI — AI Coding Instructions

## Repository Overview

This is **Talend/UI**, a Yarn workspaces monorepo containing shared front-end libraries for Talend products.

- **Workspaces**: `packages/*`, `tools/*`, `fork/*`
- **Stack**: React 18, TypeScript 5, Babel 7
- **Build tooling**: shared `@talend/scripts-*` packages (see `tools/`)
- **Versioning**: [Changesets](https://github.com/changesets/changesets) (`@changesets/cli`)
- **Package manager**: Yarn 1 (classic)

Run `yarn install` at the root. The `postinstall` script builds all libraries (`build:lib` + `build:lib:esm`).

---

## Code Style & Formatting

### Prettier

Config: `@talend/scripts-config-prettier` (see `tools/scripts-config-prettier/.prettierrc.js`).

| Setting          | Value              |
| ---------------- | ------------------ |
| Print width      | 100                |
| Quotes           | Single (`'`)       |
| Trailing commas  | All                |
| Semicolons       | Yes                |
| Indentation      | **Tabs**           |
| Arrow parens     | Avoid (`x => x`)   |
| JSON / rc files  | 2-space indent     |
| SCSS files       | 1000 print width   |

Prettier runs automatically on commit via `lint-staged` on `*.{json,md,mdx,html,js,jsx,ts,tsx}`.

### EditorConfig

- LF line endings, UTF-8
- Trim trailing whitespace, insert final newline
- Tabs for `.js`, `.jsx`, `.css`, `.scss`
- 2-space indent for `.json`

### ESLint

Each package has an `.eslintrc.json` extending `@talend` (resolved from `@talend/eslint-config` → `tools/scripts-config-eslint`).

Key rules and extends:

- `eslint:recommended`, `airbnb-base`, `plugin:prettier/recommended`
- `plugin:react/recommended`, `plugin:react/jsx-runtime`
- `plugin:react-hooks/recommended` — `rules-of-hooks` is error, `exhaustive-deps` is warning
- `plugin:jsx-a11y/recommended`
- `plugin:testing-library/react`, `plugin:jest-dom/recommended`
- `plugin:storybook/recommended`

Important rules:

- **No `console.log`** — only `console.warn` and `console.error` allowed
- JSX only in `.jsx` / `.tsx` files (`react/jsx-filename-extension`)
- `@talend/import-depth` (error) — controls import depth into packages
- `import/prefer-default-export`: off — named exports are fine
- `react/jsx-props-no-spreading`: off — spread is allowed
- `react/require-default-props`: off
- `@typescript-eslint/no-explicit-any`: warning (not error) in `.ts`/`.tsx` files
- `import/no-extraneous-dependencies`: off in test and story files

For TypeScript projects, the config auto-detects `tsconfig.json` and adds `@typescript-eslint` with `airbnb-typescript`.

### Stylelint

Config: `stylelint-config-sass-guidelines` (see `tools/scripts-config-stylelint/.stylelintrc.js`).

- Tab indentation
- No `!important` (`declaration-no-important`)
- No `transition: all` — be specific about transitioned properties
- Max nesting depth: 5
- Lowercase hex colors, named colors where possible
- No unspaced `calc()` operators

---

## TypeScript

Base config: `@talend/scripts-config-typescript/tsconfig.json` (see `tools/scripts-config-typescript/`).

| Setting                      | Value      |
| ---------------------------- | ---------- |
| `strict`                     | `true`     |
| `target`                     | `ES2015`   |
| `module`                     | `esnext`   |
| `moduleResolution`           | `bundler`  |
| `jsx`                        | `react-jsx`|
| `declaration`                | `true`     |
| `sourceMap`                  | `true`     |
| `isolatedModules`            | `true`     |
| `esModuleInterop`            | `true`     |
| `forceConsistentCasingInFileNames` | `true` |
| `skipLibCheck`               | `true`     |

Each package has a local `tsconfig.json` that extends this base:

```jsonc
{
  "extends": "@talend/scripts-config-typescript/tsconfig.json",
  "include": ["src/**/*"],
  "compilerOptions": {
    "rootDirs": ["src"]
  }
}
```

---

## Component Architecture

### Closed API Pattern (Design System)

Design system components (`packages/design-system`) use **closed APIs** — consumers cannot pass `className`, `style`, or `css` props. This ensures visual homogeneity across all products.

- **Atoms** (Button, Link, Input): single-tag elements, accept `string` children, typed to mirror their HTML counterparts. Props extend native HTML attributes minus `className`/`style`.
- **Molecules/Organisms** (Modal, Dropdown, Combobox): assembled components with rich props-based APIs. No composition — consumers hydrate via typed props.
- **Templates/Layouts**: may use composition (`children`) for page-level arrangement.

### Styling

- **CSS Modules** with `.module.css` files — this is the standard for all new code. No Styled Components.
- **Design tokens** via CSS custom properties from `@talend/design-tokens`. Use them for all colors, spacing, fonts, border-radius, shadows, transitions, etc.
- Use the `classnames` library for conditional class merging.

### Component Conventions

- Support `ForwardRef` — wrap components with `forwardRef` so consumers can pass refs.
- Match native HTML element types — component props should extend the underlying element's attributes (e.g., `HTMLButtonElement` for buttons).
- Export components from the package's root `index.ts`.
- Use `DataAttributes` type from `src/types` to support `data-*` attributes.

### `data-testid` Convention

All interactive elements must have `data-testid` attributes following this pattern:

```
[data-testid="<block_name>.<element_type>[?<element_index>].<?element_identifier>"]
```

| Segment              | Required | Example                     |
| -------------------- | -------- | --------------------------- |
| `block_name`         | Yes      | `modal`, `inlineediting`    |
| `element_type`       | Yes      | `button`, `input`, `textarea` |
| `element_index`      | No       | `[1]`, `[2]`                |
| `element_identifier` | No       | `close`, `reveal`, `edit`   |

Examples:
- `modal.button.close`
- `password.button.reveal`
- `inlineediting.textarea`
- `switch.radio[1]`

Components should support a `data-testid` prefix prop so consumers can namespace their test IDs (e.g., `my-prefix.inlineediting.button.edit`).

---

## Component Folder Structure

```
ComponentName/
├── ComponentName.tsx           # Main component implementation
├── ComponentName.test.tsx      # Jest + RTL + jest-axe tests
├── ComponentName.module.css    # CSS Modules styles (with design tokens)
├── index.ts                    # Clean public exports
├── Primitive/                  # Internal building-block sub-components
│   ├── ComponentPrimitive.tsx
│   └── ComponentStyles.module.css
└── variations/                 # Standalone variant sub-components
    ├── ComponentVariantA.tsx
    └── ComponentVariantA.module.css
```

- Stories live under `src/stories/` in the design-system package, grouped by category (e.g., `clickable/`, `feedback/`).
- The `index.ts` barrel file re-exports everything consumers need. All components must be exported from the package root `src/index.ts`.

---

## Testing

### Framework & Setup

- **Vitest** as test runner
- **@testing-library/react** for component rendering and queries
- **jest-axe** for automated accessibility checks
- Timezone forced to `UTC` (`TZ=UTC`)

### Test File Conventions

- Name test files `*.test.tsx` or `*.test.ts`, co-located next to the source file.
- Test file regex: `(/__tests__/.*|src/).*\.test.(js|jsx|ts|tsx)$`

### Writing Tests

Import test globals explicitly:

```tsx
import { describe, it, expect } from '@jest/globals';
```

Use `@testing-library/react` for rendering:

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
```

**Every component test must include an accessibility check:**

```tsx
import { axe } from 'jest-axe';

it('should render a11y html', async () => {
  const { container } = render(
    <main>
      <MyComponent />
    </main>,
  );
  expect(container.firstChild).toMatchSnapshot();
  const results = await axe(document.body);
  expect(results).toHaveNoViolations();
});
```

**Interaction tests** — use `userEvent.setup()`, not `fireEvent` for user interactions:

```tsx
it('should handle click', async () => {
  const user = userEvent.setup();
  render(<MyComponent onClick={jest.fn()} />);
  await user.click(screen.getByRole('button'));
});
```

**Querying elements:**
- Prefer `screen.getByRole()`, `screen.getByText()`, `screen.getByLabelText()`
- Use `screen.getByTestId()` for `data-testid` attributes
- Use `screen.queryBy*` for asserting absence

**Mocking:**
- Use `jest.fn()` for callback mocks
- Mock `@talend/utils` when components generate IDs:

```tsx
jest.mock('@talend/utils', () => {
  let i = 0;
  return {
    randomUUID: () => `mocked-uuid-${i++}`,
  };
});
```

**Snapshots** — use `container.firstChild` with `toMatchSnapshot()`.

---

## Internationalization (i18n)

Uses `react-i18next` backed by `i18next`.

### Namespaces

Each package has its own i18n namespace:

| Package      | Namespace        |
| ------------ | ---------------- |
| components   | `tui-components` |
| forms        | `tui-forms`      |

### Translation Keys

- Format: `COMPONENTNAME_KEY` — prefix by the parent component name
- Examples: `LIST_DISPLAY`, `HEADERBAR_GO_PORTAL`, `DELETE_RESOURCE_MESSAGE`

Always provide a `defaultValue`:

```tsx
t('SUFFIX_COMPONENT_KEY', { defaultValue: 'Displayed text' });
```

For markup in translations, use the `Trans` component:

```tsx
import { Trans } from 'react-i18next';

<Trans i18nKey="DELETE_RESOURCE_MESSAGE" parent="div">
  Are you sure you want to remove the {{ resourceLabel }}
  <strong>{{ resourceName }}</strong>?
</Trans>
```

Extract translation catalogs with `yarn extract-i18n` in the relevant package.

---

## Dependencies Management

Follow these rules when adding dependencies to a package's `package.json`:

### `devDependencies`

For build-only tools or packages that are also a `peerDependency`. No runtime impact.

Examples: `@talend/scripts-core`, `react` (when also in peerDeps), `@types/*` (unless exported types depend on them), `i18next-scanner`

### `dependencies`

For packages used at runtime that consumers don't need to configure themselves.

Examples: `@talend/design-tokens`, `classnames`, `lodash`, `date-fns`, `react-transition-group`

### `peerDependencies`

Only for packages the **consumer must import or configure** for the library to work.

Examples: `react`, `react-dom`, `i18next`, `react-i18next`, `@talend/icons`

### Type Dependencies

`@types/*` packages go in `devDependencies` unless the library's **exported types** depend on them — in that case, add to `dependencies`.

---

## Build & Module Formats

Libraries produce dual output:

| Format   | Directory | Module    |
| -------- | --------- | --------- |
| CommonJS | `lib/`    | `main`    |
| ESM      | `lib-esm/`| `module`  |

Build commands:

```bash
talend-scripts build          # CJS → lib/
talend-scripts build --esm    # ESM → lib-esm/
```

Package `exports` field should map both:

```json
{
  "main": "lib/index.js",
  "module": "lib-esm/index.js",
  "exports": {
    ".": {
      "import": "./lib-esm/index.js",
      "require": "./lib/index.js"
    }
  }
}
```

Babel config (`@talend/scripts-config-babel`):
- `@babel/preset-env` (targets: last 1 year of browsers, no IE/Samsung/Opera mini)
- `@babel/preset-react` with `runtime: 'automatic'` (no need to import React)
- `@babel/preset-typescript` with `allExtensions: true, isTSX: true`

---

## Storybook

- Stories go in `.stories.tsx` files
- Type stories with `StoryFn` or `StoryObj` from `@storybook/react`
- Use `action()` from `storybook/actions` for callback args
- Documentation pages use `.stories.mdx` format
- Stories should cover all component variations, states, and edge cases
- Use design tokens and the design system's own components in stories

Example structure:

```tsx
import { StoryFn, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';
import { MyComponent } from '../../';

export default {
  component: MyComponent,
  title: 'Category/MyComponent',
} as StoryObj<typeof MyComponent>;

export const Default: StoryFn<typeof MyComponent> = args => (
  <MyComponent {...args} />
);
```

---

## Versioning & Releases

- Uses **Changesets** for version management.
- Run `yarn changeset` to create a changeset file describing your change before opening a PR.
- Base branch: `master`
- Internal dependency updates use `patch` bumps.
- Release: `yarn release` (runs `pre-release` then `changeset publish`).

---

## PR Checklist

Before opening a pull request:

- [ ] Run `yarn changeset` if a release is needed
- [ ] Tests added for bug fixes and features
- [ ] Documentation updated if applicable
- [ ] Related design links or discussions included in the PR description
- [ ] Breaking changes documented (update the [breaking change wiki](https://github.com/Talend/ui/wiki/BREAKING-CHANGE))

---

## Git Hooks

- **Husky** pre-commit hook runs `lint-staged`
- `lint-staged` auto-formats all staged `*.{json,md,mdx,html,js,jsx,ts,tsx}` files with Prettier
- Code is automatically formatted on every commit — no manual formatting needed

---

## Key ADRs (Architecture Decision Records)

These documents in `docs/` define architectural choices. Read them before making structural changes:

| ADR | Summary |
| --- | ------- |
| `adr-css-modules.md` | CSS Modules replace Styled Components for all new styling |
| `adr-composition-vs-api.md` | Design system uses closed APIs over composition |
| `adr-data-test.md` | `data-testid` naming convention for QA automation |
| `adr-dependencies.md` | Guidelines for `dependencies` vs `peerDependencies` vs `devDependencies` |
| `adr-2024-04-add-support-to-esm.md` | ESM support strategy and dual CJS/ESM output |
