---
'@talend/http': minor
---

feat(http): add the possibility to add global interceptors for every calls that got through @talend/http calls

Usage:
  
```typescript
import { addHttpInterceptor, HTTP_STATUS } from '@talend/http';

addHttpInterceptor('logout', (response: Response): void => {
	if (response.status === HTTP_STATUS.UNAUTHORIZED) {
		logout();
	}
});
```
