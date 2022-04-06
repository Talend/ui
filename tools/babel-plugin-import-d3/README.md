# @talend/babel-plugin-import-d3

This module is a babel plugin that transform imports from d3-shape and other d3 internal plugins, into imports from d3.

Before

```javascript
import { select, event } from 'd3-selection';
import { arc as foo, pie } from 'd3-shape';
import { scaleBand } from 'd3-scale';
import { csv } from 'd3-fetch'`,
```

After

```javascript
import { select, event, arc as foo, pie, scaleBand, csv } from 'd3';`,
```

## How to use

Installation

```bash
npm i --dev @talend/babel-plugin-import-d3
```

```bash
yarn add -D @talend/babel-plugin-import-d3
```

Configuration

```json
// .babelrc.json
{
	"plugins": ["@talend/babel-plugin-import-d3"]
}
```
