# React-bootstrap to @talend/react-bootstrap

```bash
find -E TARGET_PATH -regex '.*\.(jsx?|tsx?)' | xargs npx jscodeshift -t ./index.js
```

This script transform react-bootstrap imports

```javascript
import React from 'react';
import ReactBootstrap from 'react-bootstrap';
import { Modal } from 'react-bootstrap';

const Button = props => <button {...props} />;
```

into

```javascript
import React from 'react';
import ReactBootstrap from '@talend/react-bootstrap';
import { Modal } from '@talend/react-bootstrap';

const Button = props => <button {...props} />;
```
