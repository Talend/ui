---
'@talend/react-cmf': minor
---

feat: replace default Immutable import with named imports in react-cmf

Replace `import Immutable from 'immutable'` with named imports (e.g., `import { Map, List, fromJS }`) across cmf source and expressions modules to be compatible with immutable@^4.0.0 (migrated from ^3.8.2).
