---
'@talend/scripts-core': major
---

feat: move the package to pure ESM

Read more on the subject: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c
 

This is a breaking change:

chore: `talend-scripts upgrade:deps` is not available anymore. Please use `talend-upgrade-deps` binary after having added it (`@talend/upgrade-deps`) to your dev dependencies.


chore: remove `talend-scripts postinstall` subcommand. 

Never used as it breaks the reproductability of an install.

chore: remove `talend-scripts publish:local` scripts. You can use the dedicated `talend-publish-local` bin by adding it (`@talend/scripts-publish-local`) to your dev dependencies.

