---
'@talend/react-components': minor
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

_NOTE: While this props are only used by TPD this breaking change is passed as minor change to avoid waiting dataset release_
