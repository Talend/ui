---
'@talend/http': patch
---

fix(http): only attach the CSRF token header to same-origin requests (resolved against document.baseURI). Cross-origin APIs that need the token can be listed in `security.CSRFTokenAllowedOrigins` of `setDefaultConfig`.
