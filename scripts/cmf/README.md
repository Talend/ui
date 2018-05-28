# Talend's codeshift for CMF

Following our mono repository we are doing some breaking changes
The idea here is to build script to help following the changes

## api -> cmf

    jscodeshift -t ./api_to_index.js TARGET

This script transform this pattern

```javascript
import { api } from '@talend/react-cmf'

api.WHAT_EVER
```

into

```javascript
import api from '@talend/react-cmf'

api.WHAT_EVER
```


## componentState.propTypes -> cmfConnect.propTypes

    jscodeshift -t ./componentState_to_cmfConnect.js TARGET

This script transform for this pattern:

```javascript
import { componentState } from '@talend/react-cmf';

class XXX extends React.Component {
    static propTypes = {
        ...componentState.propTypes,
    }
}
```

into this

```javascript
import { cmfConnect } from '@talend/react-cmf';

class XXX extends React.Component {
    static propTypes = {
        ...cmfConnect.propTypes,
    }
}
```
