---
'@talend/scripts-publish-local': major
---

Swap the local-registry setup/teardown from yarn CLI calls to pnpm equivalents: `yarn config set cache-folder`/`yarn cache dir` become `pnpm config set store-dir`/`pnpm store path`, `.yarnrc` handling is replaced by clearing `pnpm-lock.yaml`, and the registry reset on teardown now points `pnpm config set registry` back at npmjs instead of resetting yarn's registry. This package now requires `pnpm` instead of `yarn` to be installed.
