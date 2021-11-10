# Custom SCSS Exporter for Talend

The SCSS Exporter exports a theme into SCSS variables. It runs for:

- [x] Colors
- [x] Text Styles
- [x] Sizes
- [x] Shadows
- [x] Borders
- [x] Opacities
- [x] Radii

It outputs variables prefaced with `$coral` and contains references to CSS custom properties hydrated with CSS files extracted elsewhere.  


```scss
$coralColorNeutralText: var(--coralColorNeutralText, hsla(0,0%,13%,1));
$coralColorNeutralTextWeak: var(--coralColorNeutralTextWeak, hsla(0,0%,42%,1));
$coralColorNeutralTextDisabled: var(--coralColorNeutralTextDisabled, hsla(0,0%,55%,1));
$coralColorNeutralTextInverted: var(--coralColorNeutralTextInverted, hsla(0,0%,100%,1));
$coralColorNeutralBackground: var(--coralColorNeutralBackground, hsla(0,0%,100%,1));
$coralColorNeutralBackgroundMedium: var(--coralColorNeutralBackgroundMedium, hsla(0,0%,97%,1));
$coralColorNeutralBackgroundStrong: var(--coralColorNeutralBackgroundStrong, hsla(0,0%,91%,1));
$coralColorNeutralBackgroundDisabled: var(--coralColorNeutralBackgroundDisabled, hsla(0,0%,97%,1));
$coralColorNeutralBorder: var(--coralColorNeutralBorder, hsla(0,0%,42%,1));
$coralColorNeutralBorderWeak: var(--coralColorNeutralBorderWeak, hsla(0,0%,91%,1));
$coralColorNeutralBorderHover: var(--coralColorNeutralBorderHover, hsla(0,0%,13%,1));
...
```


