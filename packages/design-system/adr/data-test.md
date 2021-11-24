# Use [data-test] attributes for generic automated tests

## Context

Quality Assurance teams perform automated tests on Products for non-regression testing.

## Problems

QA teams lean on HTML ID attributes or XPath to automate tests on UI, and updates on the shared library can break these scenarios.

## Solutions

Systematically enforce [data-test] attributes for QA purpose in the components or layout markup that require them. 
They will be mandatory for each interactive element, at least.
We see two benefits to that pattern:

1 — Better documentation. The single data attribute acts as a contract with our QA team and it's easy to find which components are under that contract.

2 — Ease of use. Component testing becomes more straightforward as the same pattern can be expected on all design system components.

```css
[data-test="<block_name>.<element_type>[?<element_index>].<?element_identifier>"]
```

| Identifier           | Optional | Description                                                                                                                                                      |
| -------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `block_name`         |          | Component or layout identifier from our design language (ex: modal, search, password, inlineediting, etc.)                                                       |
| `element_type`       |          | Element or its type used (ex: button, link, input, textarea, radio, etc.)                                                                                        |
| `element_index`      | yes      | Element index if it's repeated (radio, menu items, etc.)                                                                                                         |
| `element_identifier` | yes      | A short and comprehensive identifier. In case of a form field, we can use its label value (reveal, cancel, edit, submit, etc.) for instance. |

Stick to this ruleset but keep in mind:

> This ruleset applies to Design System components: we definitively have to be **context agnostic**.
> If we're testing a text input, it could for instance be used for a `first name` or an `API key name`.
> That's why we need to **keep it simple and stupid** when naming things.

Describe the pattern, not the specific one-shot use you will use it for.

For more specific testing, Product teams can add `[data-testid]` in their implementation of the shared components and use a more comprehensive identifier there.

The `[data-test]` attributes here are an addition to what the product team can provide.

`[data-test]` attributes are the default that we can agree on, enabling to write E2E tests without worrying about the HTML markup or the CSS.

### Examples

- For a "Close" button of a `Modal`
  `[data-test="modal.button.close"]`

- For a "Reveal" button of a `Password` form field
  `[data-test="password.button.reveal"]`

- For a textarea of the `Inline Editing` in edition mode
  `[data-test="inlineediting.textarea"]`

- For a filter of a list
  `[data-test="search.input"]`

- For a `Switch` with three options, which uses radio buttons under the hood
  `[data-test="switch.radio[1]"]` `[data-test="switch.radio[2]"]` `[data-test="switch.radio[3]"]`

All of this will be part of the documentation (see below) and each of them will be used in [Cypress component testing](https://docs.cypress.io/guides/component-testing/introduction) in our Design System codebase.
