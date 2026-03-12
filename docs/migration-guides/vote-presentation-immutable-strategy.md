# ImmutableJS Strategy — Decision Proposal

The Talend UI monorepo uses **ImmutableJS v3** (`^3.8.1`), which has been in maintenance mode since 2017. Two PRs address this technical debt with different strategies.

---

## Option A — Upgrade to ImmutableJS v5

**PR:** [#5743](https://github.com/Talend/ui/pull/5743)

TUI packages are updated to ImmutableJS v5 (native TypeScript, improved performance). The CMF Redux store keeps its current shape — no store-level breaking change.

**Consumer project impact:**

- Must upgrade their own `immutable` dependency from `^3.x` to `^5.x`
- Must audit own Immutable code for v3→v5 breaks: `Record` becomes class-based, `Iterable` is removed
- CMF store access patterns (`.get()`, `.getIn()`) are unchanged
- A migration guide covers the new TUI package versions, but **provides no guidance for migrating project-level Immutable v3 code to v5**

---

## Option B — Remove ImmutableJS entirely

**PR:** [#5755](https://github.com/Talend/ui/pull/5755)

ImmutableJS is completely removed from TUI. All internal data structures become plain JavaScript objects. A new CMF selector API is introduced as a stable access layer.

**Affected TUI packages** (all MAJOR bumps): `react-cmf`, `react-containers`, `react-cmf-cqrs`, `react-sagas`, `react-components`, `react-flow-designer`.

**Consumer project impact:**

- CMF store access (`.get()` / `.getIn()`), container `defaultState`, component state read/write, and test fixtures must be migrated — covered by [per-package migration guides](../../docs/migration-guides/migration-guide-remove-immutable.md)
- **Only TUI-related Immutable usage is affected.** Project-internal code that uses ImmutableJS independently of TUI is untouched
- After migration, each project is free to keep, upgrade, or remove Immutable at its own pace

---

## Comparison

| Criterion                             | Option A                         | Option B                |
| ------------------------------------- | -------------------------------- | ----------------------- |
| TUI breaking changes                  | Limited                          | 6 MAJOR version bumps   |
| Consumer: own `immutable` dep         | Must upgrade to `^5.x`           | Unaffected              |
| Consumer: store / state access        | Unchanged                        | Must migrate (guided)   |
| Consumer: project-internal Immutable  | Must audit and update (unguided) | Not affected            |
| Long-term TUI dependency on Immutable | Yes (v5)                         | Eliminated              |
| Migration guide coverage              | TUI packages only                | Full per-package guides |

---

## Recommendation

**Option B** is recommended:

- Option A defers the problem — projects still need to migrate their own Immutable v3 code without any guide, and TUI would remain tied to ImmutableJS long-term
- Option B is a finite, documented migration: effort is higher but bounded, and projects gain full independence from ImmutableJS after migration

> The main argument for Option A: if projects have very heavy own Immutable usage, they would need a v3→v5 upgrade regardless — Option A allows doing it in one pass.

---
