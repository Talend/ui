---
"@talend/react-faceted-search": major
---

### BREAKING CHANGE
fix(TMC-26027/facetedSearch): multiple callbacks for BadgeCheckbox
- getTags() was replaced with getOptions() to support multiple callbacks
---
- Before:
```jsx
<FacetedSearch.BasicSearch
  callbacks={{ getTags: () => {} }}
/>
```
---
- After:
```jsx
<FacetedSearch.BasicSearch
  callbacks={{
    tags: { getOptions: () => {} },
    authors: { getOptions: () => {} },
    operators: { getOptions: () => {} },
  }}
/>
```
---
