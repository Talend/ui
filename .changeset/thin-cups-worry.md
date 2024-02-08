---
'@talend/react-forms': major
---

UI-FORM will now heavily use form components from the Design System
- Parent element is wrapped with a DS Form
- File / Checkboxes / Text / Number and Textare will now use DS components
- All elements will now use DS Label in both text and normal display mode

# BREAKING CHANGE
- Many style overrides will break because of removed bootstrap classes like `form-group` `control-label` `form-actions` `tf-actions-wrapper` or `tf-uiform`
- No more hearthbeat styling from bootstrap when form elements are in updating state
- Removed many possibilities to pass down classNames because DS components won't allow it
