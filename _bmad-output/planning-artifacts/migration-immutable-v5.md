# Plan: Migration Immutable.js v3 → v4 → v5

Migration incrémentale d'Immutable.js de **v3.8.2** vers **v5** en passant par v4, package par package. La migration touche **6 packages** avec ~100+ imports et ~500+ appels API. `react-immutable-proptypes` sera remplacé par des validators PropTypes manuels.

---

## Contexte

| Info                | Valeur                     |
| ------------------- | -------------------------- |
| Version actuelle    | `^3.8.2` (résolu en 3.8.2) |
| Cible intermédiaire | `^4.3.7`                   |
| Cible finale        | `^5.x`                     |

### Packages impactés (par ordre de migration)

| Package       | Dep type          | Complexité | Imports      | `.toJS()` |
| ------------- | ----------------- | ---------- | ------------ | --------- |
| cmf           | dependencies      | 🔴 Haute   | 14 fichiers  | 20+       |
| components    | dependencies      | 🟡 Moyenne | 2 fichiers   | 10+       |
| cmf-cqrs      | dependencies      | 🟢 Faible  | 1 fichier    | 1         |
| cmf-router    | aucune (indirect) | 🟢 Faible  | 2 fichiers   | 0         |
| sagas         | dependencies      | 🟢 Faible  | 1-2 fichiers | 0         |
| containers    | dependencies      | 🔴 Haute   | 15+ fichiers | 40+       |
| flow-designer | peerDependencies  | 🔴 Haute   | 20+ fichiers | 1         |

> **Note monorepo** : Yarn workspaces hoist une seule version d'immutable. Le bump de version est global, mais les corrections sont faites package par package.

### Packages exclus du scope

- `packages/http` — utilise `Map` natif JS (pas Immutable) dans `csrfHandling.ts`
- `packages/forms`, `packages/storybook-cmf`, `packages/router-bridge` — pas de dépendance directe à Immutable

---

## Phase 1 : v3 → v4

### Étape 1.0 — Préparation

1. Créer une branche dédiée `migrate-immutable-v4`
2. Mettre à jour `versions/dependencies.json` : `"immutable": "^4.3.7"`
3. Mettre à jour chaque `package.json` concerné :
   - `packages/cmf` : `"immutable": "^4.3.7"` (dependencies)
   - `packages/cmf-cqrs` : `"immutable": "^4.3.7"` (dependencies)
   - `packages/components` : `"immutable": "^4.3.7"` (dependencies)
   - `packages/containers` : `"immutable": "^4.3.7"` (dependencies)
   - `packages/sagas` : `"immutable": "^4.3.7"` (dependencies)
   - `packages/flow-designer` : `"immutable": "^4.0.0"` (peerDependencies)
4. `yarn install` pour résoudre les dépendances

### Étape 1.1 — Migrer `packages/cmf` (core, bloquant)

**Breaking changes v3→v4 affectant cmf :**

**Default import supprimé** : `import Immutable from 'immutable'` → `import { Map, fromJS } from 'immutable'`

Fichiers à modifier :

| Fichier                                           | Modification                                                               |
| ------------------------------------------------- | -------------------------------------------------------------------------- |
| `packages/cmf/src/componentState.js` (L2)         | `Immutable.Map.isMap()` → `Map.isMap()`, `Immutable.fromJS()` → `fromJS()` |
| `packages/cmf/src/expressions/getInState.js` (L2) | Default import → named imports                                             |
| `packages/cmf/src/expressions/allOf.js` (L2)      | Default import → named imports                                             |
| `packages/cmf/src/expressions/includes.js` (L2)   | Default import → named imports                                             |
| `packages/cmf/src/expressions/oneOf.js` (L2)      | Default import → named imports                                             |
| `packages/cmf/src/onEvent.js` (L2)                | Default import → named imports                                             |
| `packages/cmf/src/localStorage.js` (L1)           | Default import → named imports                                             |
| `packages/cmf/src/selectors/toJS.js`              | Vérifier import                                                            |
| `packages/cmf/src/mock/collections.js` (L1)       | Default import → named imports                                             |
| `packages/cmf/src/mock/components.js` (L1)        | Default import → named imports                                             |

> Les reducers (`componentsReducers.js`, `collectionsReducers.js`) et le sélecteur `collections.js` utilisent déjà des named imports → OK

**Validation** : `yarn workspace @talend/react-cmf test`

### Étape 1.2 — Migrer `packages/components`

**`Iterable` renommé en `Collection`** dans v4 :

| Fichier                                                                            | Modification                                                                                           |
| ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `packages/components/src/Actions/ActionDropdown/ActionDropdown.component.jsx` (L7) | `import { Iterable }` → `import { Collection }`, puis `Iterable.isIterable(x)` → pattern équivalent v4 |

**Validation** : `yarn workspace @talend/react-components test`

### Étape 1.3 — Migrer les packages légers (_parallélisable_)

Packages à traiter en parallèle (faible complexité) :

- `packages/cmf-cqrs` : vérifier les tests, aucun changement d'API attendu
- `packages/cmf-router` : modifier les fichiers avec `new Map()` (OK en v4, pas de changement)
- `packages/sagas` : vérifier les tests

**Validation** : tests unitaires de chaque package

### Étape 1.4 — Migrer `packages/containers`

- Volume important de `.toJS()` (40+ appels) — vérifier le comportement (inchangé en v4)
- `react-immutable-proptypes` : garder temporairement (compatible v4)
- `fromJS()` usage dans tests ComponentForm — vérifier compatibilité

**Validation** : `yarn workspace @talend/react-containers test`

### Étape 1.5 — Migrer `packages/flow-designer`

- `Record` utilisations (12 définitions dans `flowdesigner.model.ts`) — la syntaxe `Record({})` **ne change pas en v4**, les classes étendant `Record({})` restent valides
- `OrderedMap` est toujours disponible en v4 → aucun changement
- `Map()` sans `new` → fonctionne identiquement en v4

**Validation** : `yarn workspace @talend/react-flow-designer test`

### Étape 1.6 — Validation globale v4

1. `yarn test` à la racine
2. `yarn build:lib && yarn build:lib:esm` — vérifier la compilation
3. Créer un changeset pour chaque package modifié
4. Merger la branche v4

---

## Phase 2 : v4 → v5

### Étape 2.0 — Préparation

1. Créer une branche `migrate-immutable-v5`
2. Bump versions vers `"^5.0.2"` dans tous les `package.json` et `versions/dependencies.json`
3. `packages/flow-designer` : `"immutable": "^5.0.0"` (peerDependencies)
4. `yarn install`

### Étape 2.1 — Supprimer `react-immutable-proptypes` (⚠️ bloquant, avant les autres étapes)

Le package `react-immutable-proptypes@2.2.0` est **incompatible avec Immutable v5** (dernière release en 2017). Il doit être supprimé/remplacé **AVANT** le bump de version.

#### 4 packages impactés

**a) `packages/cmf/src/cmfConnect.jsx`** (L27, L395-396)

- Supprimer `import ImmutablePropTypes from 'react-immutable-proptypes'`
- Remplacer `ImmutablePropTypes.map` par un PropType custom :
  ```js
  const immutableMapPropType = (props, propName) => {
  	if (props[propName] && !Map.isMap(props[propName])) {
  		return new Error(`${propName} must be an Immutable.Map`);
  	}
  };
  ```

**b) `packages/components/src/Actions/ActionDropdown/ActionDropdown.component.jsx`** (L4, L326)

- Remplacer `ImmutablePropTypes.list` par un PropType custom avec `List.isList()`

**c) `packages/containers/`** (4 fichiers)

| Fichier                                                  | Usage                                         |
| -------------------------------------------------------- | --------------------------------------------- |
| `ActionDropdown/ActionDropdown.connect.jsx` (L2, L53)    | `ImmutablePropTypes.list` → custom            |
| `List/List.container.jsx` (L2, L356)                     | `ImmutablePropTypes.list.isRequired` → custom |
| `SelectObject/SelectObject.component.jsx` (L1, L83, L88) | `ImmutablePropTypes.List` → custom            |
| `TreeView/TreeView.container.jsx` (L5, L106)             | `ImmutablePropTypes.list` → custom            |

**d) `packages/flow-designer/src/constants/flowdesigner.proptypes.ts`** (L2, L4-L21)

- Suppression de `import { recordOf } from 'react-immutable-proptypes'`
- Remplacer `recordOf()` par `PropTypes.object` + commentaire TS

**e) Suppression de la dépendance**

- Retirer `react-immutable-proptypes` de chaque `package.json` (cmf, components, containers, flow-designer)
- Retirer de `versions/dependencies.json`

### Étape 2.2 — Migrer `OrderedMap` → `Map` (flow-designer)

**`OrderedMap` est supprimé dans Immutable v5** — `Map` préserve désormais l'ordre d'insertion nativement.

Fichiers à modifier :

| Fichier                                                                       | Modification                                                         |
| ----------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `packages/flow-designer/src/selectors/nodeSelectors.test.ts` (L1, L192, L280) | `import { OrderedMap }` → `import { Map }`, `OrderedMap()` → `Map()` |
| `packages/flow-designer/src/reducers/port.reducer.test.ts` (L1, L13)          | Idem                                                                 |
| `packages/flow-designer/src/actions/node.actions.test.ts` (L4, L44)           | Idem                                                                 |
| `packages/flow-designer/src/components/link/LinksRenderer.test.tsx` (L3, L28) | Idem                                                                 |

### Étape 2.3 — Migrer `packages/cmf`

- Vérifier les types TS mis à jour pour `Map`, `List`, `fromJS`
- Tester le round-trip localStorage (serialize `.toJS()` / deserialize `fromJS()`)

**Validation** : `yarn workspace @talend/react-cmf test`

### Étape 2.4 — Migrer `packages/components`

- `Collection` → `isImmutable()` si nécessaire (API simplifiée en v5) : `import { isImmutable } from 'immutable'`

**Validation** : `yarn workspace @talend/react-components test`

### Étape 2.5 — Packages légers (_parallélisable_)

- `packages/cmf-cqrs`, `packages/cmf-router`, `packages/sagas` : exécuter les tests, corriger si nécessaire

### Étape 2.6 — Migrer `packages/containers`

- `.toJS()` (40+ appels) : comportement identique en v5, mais vérifier les tests
- `.sort()` sur des Immutable Lists dans `packages/containers/src/List/selector.js` (L107, L111) : vérifier le comportement des comparateurs custom en v5

**Validation** : `yarn workspace @talend/react-containers test`

### Étape 2.7 — Migrer `packages/flow-designer`

- **Records** : les classes étendant `Record({})` restent valides en v5. Vérifier :
  - `packages/flow-designer/src/constants/flowdesigner.model.ts` : 12 Record definitions (NodeRecord, NestedNodeRecord, LinkRecord, PortRecord, etc.)
  - L'accès aux propriétés via `.get('key')` reste identique
  - La construction via `new NodeRecord({...})` reste valide
- **TypeScript types** : `packages/flow-designer/src/customTypings/index.d.ts` — vérifier que les types `Record<T> & T` sont compatibles avec les generics d'Immutable v5
- **Map constructors** : `Map()` sans `new` dans les selectors/reducers — comportement identique en v5

**Validation** : `yarn workspace @talend/react-flow-designer test`

### Étape 2.8 — Validation globale v5

1. `yarn test` à la racine
2. `yarn build:lib && yarn build:lib:esm`
3. Vérifier les types TypeScript : `tsc --noEmit` dans chaque package TS
4. Storybook : `yarn workspace @talend/storybook-one start` pour vérification visuelle
5. Créer des changesets (breaking change) pour chaque package modifié
6. Documenter dans le wiki BREAKING-CHANGE

---

## Vérification

### Automatisée

1. **Par package** : `yarn workspace <package> test` après chaque étape
2. **Globale** : `yarn test` à la fin de chaque phase
3. **Build** : `yarn build:lib && yarn build:lib:esm` pour vérifier la compilation CJS/ESM
4. **TypeScript** : `tsc --noEmit` dans flow-designer et tous les packages TS
5. **Lint** : `yarn lint` pour s'assurer que les imports sont corrects

### Manuelle

1. Lancer Storybook (`storybook-one`) pour vérifier les composants visuels utilisant Immutable (HeaderBar, ActionDropdown, List)
2. Tester l'intégration CMF avec un store Immutable (via storybook-cmf ou un playground)
3. Vérifier le localStorage round-trip (serialize/deserialize) dans cmf

---

## Décisions

| Décision                                       | Justification                                                      |
| ---------------------------------------------- | ------------------------------------------------------------------ |
| Chemin v3 → v4 → v5                            | Minimiser les risques avec des points de validation intermédiaires |
| `react-immutable-proptypes` → PropTypes custom | Maintenir la validation de types sans dépendance incompatible      |
| Migration progressive par package              | Core (cmf) d'abord, puis remontée vers les consommateurs           |
| `OrderedMap` → `Map`                           | `Map` v5 préserve l'insertion order nativement                     |

---

## Risques et points d'attention

| Risque                                    | Impact                                                                                                                          | Mitigation                                      |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `react-immutable-proptypes` supprimé      | Bugs de type silencieux (prop validation manquante)                                                                             | Couverture TypeScript atténue ce risque         |
| Record TypeScript types (`flow-designer`) | Les generics `Record<T> & T` dans `customTypings/index.d.ts` peuvent nécessiter un ajustement                                   | Tester avec `tsc --noEmit` à chaque étape       |
| Sort behavior                             | Comparateurs custom sur Immutable List (`containers/List/selector.js`) peuvent avoir des comportements subtils différents en v5 | Tests critiques dédiés                          |
| Interop monorepo                          | Pendant la migration, tous les packages doivent compiler avec la même version d'Immutable (Yarn hoist)                          | Bump global + corrections atomiques par package |

---

## Fichiers clés à modifier — Résumé

### Phase 1 (v3 → v4) — ~12 fichiers

- `versions/dependencies.json` — version bump
- 6× `package.json` — version bump
- `packages/cmf/src/componentState.js` — default import → named imports
- `packages/cmf/src/expressions/*.js` (4 fichiers) — default import → named imports
- `packages/cmf/src/onEvent.js` — default import → named imports
- `packages/cmf/src/localStorage.js` — default import → named imports
- `packages/cmf/src/selectors/toJS.js` — vérifier import
- `packages/cmf/src/mock/*.js` (2 fichiers) — default import → named imports
- `packages/components/src/Actions/ActionDropdown/ActionDropdown.component.jsx` — `Iterable` → `Collection`

### Phase 2 (v4 → v5) — ~18 fichiers

- 6× `package.json` + `versions/dependencies.json` — version bump
- 4 packages : suppression de `react-immutable-proptypes` et remplacement par checks manuels
- `packages/cmf/src/cmfConnect.jsx` — PropTypes custom
- `packages/components/src/Actions/ActionDropdown/ActionDropdown.component.jsx` — `Collection` → `isImmutable`
- `packages/containers/src/*/` — 4 fichiers PropTypes
- `packages/flow-designer/src/constants/flowdesigner.proptypes.ts` — `recordOf` removal
- `packages/flow-designer/src/selectors/nodeSelectors.test.ts` — `OrderedMap` → `Map`
- `packages/flow-designer/src/reducers/port.reducer.test.ts` — `OrderedMap` → `Map`
- `packages/flow-designer/src/actions/node.actions.test.ts` — `OrderedMap` → `Map`
- `packages/flow-designer/src/components/link/LinksRenderer.test.tsx` — `OrderedMap` → `Map`
