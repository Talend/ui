---
'@talend/react-cmf': patch
'@talend/react-containers': patch
---

fix(cmf): only attach the CSRF token header to same-origin requests in the http middleware and sagas (compared with window.location.origin, so a cross-origin <base> element cannot make requests look trusted). Cross-origin APIs that need the token can be listed in `security.CSRFTokenAllowedOrigins`.
