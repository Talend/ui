---
'@talend/scripts-config-react-webpack': patch
---

fix: force postcss8 to avoid issue at build

we use autoprefixer 10 in this preset which require postcss8.
To avoid error where we could have postcss 7 let's force it to 8.