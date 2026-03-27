# Migration Guide: `@talend/react-stepper` — Removal of ImmutableJS

**Version bump**: patch

---

## What changed

`immutable` has been removed from `devDependencies`. This was an unused declared dependency with no functional impact.

---

## No action required

There are no breaking changes in this release. The `immutable` package was only declared as a development dependency and was not used in the package's source or tests.

If you were somehow relying on `immutable` being available transitively from this package (which would have been purely coincidental), add it explicitly to your own `package.json`.
