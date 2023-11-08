---
'@talend/eslint-config': major
---

**Upgrade some dependencies to latest version.**

Updated lib with breaking changes :
```
"dependencies": {
  (...)

  // 6.10.0 => breaking changes : https://typescript-eslint.io/blog/announcing-typescript-eslint-v6
  "@typescript-eslint/parser": "^5.62.0",

  // 6.10.0 => breaking changes : https://typescript-eslint.io/blog/announcing-typescript-eslint-v6
  "@typescript-eslint/eslint-plugin": "^5.62.0",

  // 8.53.0 => breaking changes : https://eslint.org/docs/latest/use/migrate-to-8.0.0
  "eslint": "^7.32.0",

  (...)

  // 7.x.x => breaking changes : https://github.com/prettier/eslint-config-prettier/blob/main/CHANGELOG.md#version-700-2020-12-05
  // 8.x.x => breaking changes : https://github.com/prettier/eslint-config-prettier/blob/main/CHANGELOG.md#version-800-2021-02-21
  // 9.0.0 => breaking changes : https://github.com/prettier/eslint-config-prettier/blob/main/CHANGELOG.md#version-900-2023-08-05
  "eslint-config-prettier": "^6.15.0",

  (...)

  // 5.1.0 => breaking changes : https://github.com/testing-library/eslint-plugin-jest-dom/releases/tag/v5.0.0
  "eslint-plugin-jest-dom": "^4.0.3",

  (...)

  // 6.0.0 => breaking changes : https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/migration-guides/v6.md
  "eslint-plugin-testing-library": "^5.11.1"
}
```

**Breaking changes coming from updates :**

