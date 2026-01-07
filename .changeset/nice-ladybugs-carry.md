---
"@talend/scripts-config-react-webpack": major
---

feat(script): remove cdn option.

You must review your build process with that new plugin as many things will not work.
Especially the @talend/assets-api call you may end up with weird behavior.

The good part is once you have fixed it moving out from @talend/scripts* to an other build tool like vite becomes easy.
