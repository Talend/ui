---
'@talend/react-cmf': patch
---

fix(cmf): only attach the CSRF token header to same-origin requests in the http middleware and sagas (resolved against document.baseURI). Cross-origin APIs that need the token can be listed in `security.CSRFTokenAllowedOrigins`.
