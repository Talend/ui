---
'@talend/react-components': patch
---

fix(SSO-2658): remove backtracking from legacy DateTime split regex

The legacy DateTime picker split the date and time parts of a text input with a regex made of overlapping unbounded groups. A crafted value (whitespaces, colons and a line terminator) made the regex backtrack for minutes and freeze the page, even within the 256 characters limit. The split is now done in linear time.
