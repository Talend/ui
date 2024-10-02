---
'@talend/react-faceted-search': major
---

[BREAKING] Move the function createTqlQuery to a dedicated package (@talend/react-faceted-search-query-client).

You will need to adapt your code to use this lib

before
```
import { createTqlQuery } from '@talend/react-faceted-search/lib/queryClient';
```

after
```
import { createTqlQuery } from '@talend/react-faceted-search-query-client'
```
