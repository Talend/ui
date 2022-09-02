---
'@talend/react-components': major
---

Allow to customize drawer's subtitle tag

**Breaking change :**
Props `subtitleTagLabel` and `subtitleTagTooltip` are replaced by a props `subtitleTag`.

Props `subtitleTag` has following shape :
```
{
    label: PropTypes.string,
    tooltip: PropTypes.string,
    variant: PropTypes.oneOf(TagVariantsNames),
}
```
