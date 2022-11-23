---
'@talend/scripts-config-storybook-lib': major
---

fix: stories override default stories

Breaking Change: stories is supposed to give blob to get all the story you need.
If the user specify this it is to be able to override it.

This is a fix to be able to use this configuration to document @talend/design-system package.