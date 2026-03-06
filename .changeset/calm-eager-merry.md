---
'@talend/react-flow-designer': minor
---

feat: replace default Immutable import with named imports in reducers and renderers

Replace `import Immutable from 'immutable'` with named imports in reducers (link, node, port) and renderer components (LinksRenderer, NodesRenderer, PortsRenderer) to be compatible with immutable@^4.0.0 (migrated from ^3.8.2).
