---
'@talend/scripts-core': major
---

Most of the following changes are breaking changes

feat: move the package to pure ESM

Read more on the subject: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c
 
chore:  **remove** `talend-scripts upgrade:deps`. Please use `talend-upgrade-deps` binary after having added it (`@talend/upgrade-deps`) to your dev dependencies.


chore: **remove** `talend-scripts postinstall` subcommand.
It has never been used as it breaks the reproductability of an install.

chore: **remove** `talend-scripts publish:local` scripts. You can use the dedicated `talend-publish-local` bin by adding it (`@talend/scripts-publish-local`) to your dev dependencies.

chore: **remove** preset. Config can already been overide.

feat: add `talend-scripts lint` command which trigger eslint and stylelint.

chore: **remove** `talend-scripts lint:es` use `lint` script instead.

chore: **remove** `talend-scripts lint:style` use `lint` script instead.

feat: `talend-scripts test` now detect if the project as angular. in this case it trigger karma instead of jest.

chore: **remove** `talend-scripts test:ng` use `test` script instead.

feat: `talend-scripts build` now detect if the project is a library. in this case it trigger babel/typescripts.

chore: **remove** `talend-scripts build:lib` use `build` script instead.
