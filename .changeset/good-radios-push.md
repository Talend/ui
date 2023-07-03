---
'@talend/http': minor
---

feat(http): add the possibility to add global interceptors for every calls that got through @talend/http calls

Usage:
  
```typescript
import { addHttpResponseInterceptor, HTTP_STATUS } from '@talend/http';

addHttpResponseInterceptor('logout', (response: Response): void => {
	if (response.status === HTTP_STATUS.UNAUTHORIZED) {
		logout();
	}
});
```
