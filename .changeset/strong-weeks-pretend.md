---
'@talend/scripts-config-react-webpack': patch
---

fix: remove duplicates of meta and simplify head script

* meta was their twice because they are passed to the html-webpack-plugin.

* the INITIATOR part of the script was still here even if we already have set `dynamic-cdn-webpack-plugin` to false.

fix: The copy of assets in a cdn folder should happens if and only if:
* INTIATOR_URL has not been given at compile time and
* dynamic-cdn-webpack-plugin is present


fix: DuplicatePlugins and BundleAnalyzer take times and slowdown the rebuild a lot. Use them only if option `--env analyze` is passed to the script.