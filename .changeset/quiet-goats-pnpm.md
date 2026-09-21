---
'@talend/scripts-core': minor
---

Declare `@talend/scripts-config-prettier` and `@talend/scripts-config-stylelint` as real dependencies instead of phantom deps that only resolved because yarn's flat hoist happened to expose them (pnpm's isolated linker doesn't hoist, so they'd otherwise be missing). Also drop the `extends` command's jest-config-file generation, which relied on `@talend/scripts-config-jest` and is no longer relevant now that jest is being phased out.
