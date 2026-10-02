---
'@talend/http': patch
---

fix(http): only attach the CSRF token header to same-origin requests (compared with window.location.origin, so a cross-origin <base> element cannot make requests look trusted). Cross-origin APIs that need the token can be listed in `security.CSRFTokenAllowedOrigins` of `setDefaultConfig`.
