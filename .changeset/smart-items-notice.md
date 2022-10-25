---
'@talend/design-system': major
---

ThemeProvider: Removed styled components global styles

BREAKING CHANGE:
* Now global style is applied by default
* createGlobalStyle is not exposed anymore and should not be needed
* ThemeProvider.GlobalStyle do not exists, it is now in the by default in the CSS
