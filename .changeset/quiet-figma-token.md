---
'@talend/storybook-docs': patch
---

fix: stop reading a Figma access token from a STORYBOOK_* environment variable, which was inlined in the public bundle. FigmaImage now renders its placeholder unless a client is provided through FigmaContext.Provider.
