# @talend/utils

This packages exposes various utility methods.

## Getting started

Add the library to the dependencies of your project

```sh
npm i @talend/utils
```

or

```sh
yarn add @talend/utils
```

## Usage

See specific README files:

- [Date utils](./src/date/README.md)
- [Validation utils](./src/validation/README.md)

## React prop blocklist

`sanitizeReactProps` copies own enumerable string props, excluding keys that can inject HTML,
replace content or substitute a rendered component. It leaves the input unchanged and does not
read blocked values. Key matching is case-insensitive.

```tsx
import { sanitizeReactProps } from '@talend/utils';

<MenuItem {...sanitizeReactProps(item)} onClick={handleClick}>
	{item.label}
</MenuItem>;

const labelProps = sanitizeReactProps(schema.labelProps || {}, ['style', 'htmlFor', 'for']);
```

The shared blocklist is `__proto__`, `constructor`, `prototype`, `dangerouslySetInnerHTML`,
`innerHTML`, `outerHTML`, `srcDoc`, `componentClass`, `as`, `forwardedAs`, `ref`, and `children`.
The optional second argument adds context-specific blocked names. Ordinary props, `data-*`,
`aria-*`, and trusted callbacks are preserved. Use explicit props after the spread for values
owned by the component. Trusted content, polymorphic elements and refs must be passed explicitly,
not inside the filtered bag.

This is a **shallow prop filter, not a general sanitizer or an API validator**:

- A blocklist does not provide the closed contract of an allowlist. Unknown props are retained,
  so new component APIs need review when components or dependencies change.
- URL values still need scheme/origin validation. SVG markup still needs its own sanitizer.
- Nested objects are not filtered. Apply the helper at the actual spread boundary, not only to
  the outer object. It does not prevent prototype pollution in path updates or merges elsewhere.
- Functions, React elements and getters must come from trusted code. This helper does not make
  executable objects safe to accept from an untrusted source.
- Props such as `style`, `htmlFor`, `src` and callbacks are context-dependent, not universally
  forbidden. Labels additionally reject layout and target overrides; Icon protects generated
  image sources and retains its existing style/event value checks.
- Response data that can reconfigure a component needs a response schema or explicit extraction,
  not this helper. ResourcePicker's collection-only response contract remains a separate fix.

### Related PRs and files

Paths below are relative to the repository root. The associated co-located tests are covered by
each PR; this inventory lists the production files and distinguishes prop filtering from other
protections. React-router work is excluded.

| PR                                              | Production files                                                                                                                                                                                                                                                                                                                     | Shared-filter scope                                                                                                               |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| [#5895](https://github.com/Talend/ui/pull/5895) | `packages/components/src/Actions/ActionButton/ActionButton.component.jsx`, `packages/components/src/Actions/ActionDropdown/ActionDropdown.component.jsx`, `packages/components/src/Actions/ActionIconToggle/ActionIconToggle.component.jsx`, `packages/components/src/Actions/ActionSplitDropdown/ActionSplitDropdown.component.jsx` | Replace duplicated component-substitution exclusions.                                                                             |
| [#5901](https://github.com/Talend/ui/pull/5901) | `packages/design-system/src/components/Icon/Icon.tsx`                                                                                                                                                                                                                                                                                | Replace host-prop allowlist only. SVG sanitization, remote-URL validation and IconsProvider handling are unchanged.               |
| [#5902](https://github.com/Talend/ui/pull/5902) | `packages/components/src/Typeahead/Typeahead.component.renderers.jsx`, `packages/components/src/Datalist/Datalist.component.jsx`, `packages/components/src/Enumeration/Items/Item/Item.component.jsx`, `packages/faceted-search/src/components/Badges/BadgeSlider/BadgeSliderForm.component.jsx`                                     | Filter Icon prop bags in the first three files. BadgeSlider's name-only change is independent and is not replaced here.           |
| [#5909](https://github.com/Talend/ui/pull/5909) | `packages/design-system/src/components/RichRadioButton/RichRadioButton.component.tsx`                                                                                                                                                                                                                                                | Filter asset props; keep generated icon source, size and layout protected.                                                        |
| [#5914](https://github.com/Talend/ui/pull/5914) | `packages/forms/src/UIForm/utils/labels.jsx`, `packages/forms/src/UIForm/fields/Code/Code.component.tsx`                                                                                                                                                                                                                             | Filter labels at the common spread boundary. The PR's closed allowlist type for Code is not used with this broader blocklist API. |
| [#5916](https://github.com/Talend/ui/pull/5916) | `packages/components/src/CollapsiblePanel/CollapsiblePanel.component.jsx`                                                                                                                                                                                                                                                            | Filter badge props before spreading into Tag.                                                                                     |
| [#5919](https://github.com/Talend/ui/pull/5919) | `packages/components/src/Actions/ActionSplitDropdown/ActionSplitDropdown.component.jsx`                                                                                                                                                                                                                                              | Filter MenuItem props rather than enumerate supported props.                                                                      |
| [#5924](https://github.com/Talend/ui/pull/5924) | `packages/forms/src/UIForm/fields/ResourcePicker/ResourcePicker.component.jsx`                                                                                                                                                                                                                                                       | Related but not migrated: collection-only response extraction must remain an explicit contract.                                   |

This consolidation does not modify the individual PR branches or incorporate their unrelated
changes. URL, SVG, response-schema and prototype-update fixes are not superseded by it.
