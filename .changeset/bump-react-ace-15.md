---
'@talend/react-forms': patch
---

chore(forms): bump react-ace from 10.1.0 to 15.0.0 (used by the `Code` UIForm widget, `packages/forms/src/UIForm/fields/Code/Code.component.tsx`)

This is a 5 major version jump. Breaking/notable changes to review from the upstream releases between 10.1.0 and 15.0.0:

- **v15.0.0** (https://github.com/securingsincity/react-ace/releases/tag/v15.0.0) — ESM support:
  - Deep imports (e.g. `react-ace/lib/ace`) are no longer resolvable, the package only exposes its root export. We only import from the package root (`import ReactAce, { IAceEditorProps } from 'react-ace'`), so this does not affect us.
  - `ace-builds` is now loaded eagerly when `react-ace` is imported, instead of lazily on first render. We already eagerly import `ace-builds/src-noconflict/ext-language_tools` and configure `ace.config.set('basePath', ...)` at module scope in `Code.component.tsx`, so behavior should be unaffected, but worth confirming no duplicate/early Ace init happens now.
  - The SSR `window` shim was removed (no more global mutation on server import).
- **v14.1.0** — fixed handling of a null/absent `markers` prop, added editor index to the Split editor's `onFocus` event, Vite upgrade.
- **v14.0.1** — added React 19 support (no impact, we're on React 18).
- **v13.0.0** — bumped the embedded `ace-builds` to 1.36.3 (brings upstream Ace editor engine fixes/behavior changes).
- **v11.0.0** — internal test suite rewrite, React 18 peer dependency support.

The previously skipped `Code.component.test.tsx` tests (disabled since the react-testing-library upgrade) have been re-enabled and pass against react-ace 15, and a dedicated test rendering a full `type: 'code'` UIForm schema was added to confirm end-to-end widget resolution.
