# @talend/upgrade-deps

## 1.4.1

### Patch Changes

- 2814f3a5c: fix: remove useless log

## 1.4.0

### Minor Changes

- 013c801ff: add --next option to get beta release of packages

## 1.3.3

### Patch Changes

- b82096450: Fix npm view command on Windows

## 1.3.2

### Patch Changes

- b139f5f: fix: remove colors dependencies (security issue without fix release)

## 1.3.1

### Patch Changes

- 77af1fc: chore(dependencies): auto update for maintenance purpose

  ```diff
  -    "strip-ansi": "^6.0.0"
  +    "strip-ansi": "^6.0.1"
  ```

- 9400673: fix: generate random name for changeset file, only if --changeset is provided

  - generate a random file per package.json file
  - put a diff of dependencies as content

## 1.3.0

### Minor Changes

- ec838c9: Add support for changeset

## 1.2.0

### Minor Changes

- d3a510c: feat(upgrade): deps security auto fix

## 1.1.0

### Minor Changes

- 475a04b: feat(upgrade): scope packages with startsWith filter
- 475a04b: Improve scope filter so you can do for example --start-with=@talend/scripts-

## 1.0.2

### Patch Changes

- ee86119: fix: CWD is undefined

## 1.0.1

### Patch Changes

- bc7a194: fix(upgrade:deps): add requirement in cachekey
