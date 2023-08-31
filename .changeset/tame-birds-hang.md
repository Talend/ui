---
'@talend/scripts-config-cdn': patch
'@talend/module-to-cdn': patch
'@talend/react-forms': patch
---

fix: ace code editor

Issue1: 404 on react-ace min in dev mode.
The copy of the assets during the build is not able to support different forlders and this is the case for react-ace.
The getUMD point to the production version (becaue of babel) but we are in dev so this make a 404.
Fix: point to prod for both versions

Issue 2: function f is not defined (trace in ace-build).
Fix: pin ace-builds in react-forms because there is a bug in the latest version 

