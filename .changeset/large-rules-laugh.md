---
'@talend/scripts-config-react-webpack': patch
---

fix: do not generate both hashed and non hashed assets for fonts, images and svgs.

chore: put assets config in common so app and umd configuration are aligned.

Note: path has been changed this way:

```diff
# case of woff in lib
- mylib/dist/[hash].woff
- mylib/dist/fonts/[name].woff
+ mylib/dist/assets/fonts/[name].woff

# case if woff in app
- myapp/dist/[hash].woff
- myapp/dist/fonts/[name].woff
+ myapp/dist/assets/fonts/[name]-[hash].woff

# case of img in lib
- not supported
+ mylib/dist/assets/img/[name].woff

# case of img in app
- myapp/dist/[hash].png
- myapp/dist/assets/img/[name].png
+ myapp/dist/assets/img/[name]-[hash].png

# case of svg in app
- myapp/dist/[hash].svg
- myapp/dist/assets/svg/[name].svg
+ myapp/dist/assets/svg/[name]-[hash].svg

# case of svg in lib
- mylib/dist/[hash].svg
- mylib/dist/assets/svg/[name].svg
+ mylib/dist/assets/svg/[name]-[hash].svg
```
