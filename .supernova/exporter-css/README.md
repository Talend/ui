# CSS Exporter for Talend

The CSS allows you to **produce a CSS definitions** in such a way that it can be immediately used in your production codebase to style all your visual elements. Specifically, this exporter is capable of exporting the previews of:

- [x] Color definitions
- [x] Text Styles
- [x] Gradients
- [x] Shadows
- [x] Borders
- [x] Radii
- [x] Measures

This extractor has two customizations: 

- Colors are extracted as HSLA values
- The extracted CSS stylesheets use the `:root` selector for the light theme, `[data-theme="nameOfTheTheme"]` for all other themes.
