---
'@talend/react-components': patch
---

fix: OverlayTrigger fork to use portal so the overlay is attached in current VirtualDOM to have access to new style React Providers.
