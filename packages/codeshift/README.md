# Talend's codeshift

Following our mono repository we are doing some breaking changes
The idea here is to build script to help following the changes

## componentState.propTypes -> cmfConnect.propTypes

This script search for this patter:

```javascript
import { componentState } from '@talend/react-cmf';

class XXX extends React.Component {
    static propTypes = {
        ...componentState.propTypes,
    }
}
```

transform into
```javascript
import { cmfConnect } from '@talend/react-cmf';

class XXX extends React.Component {
    static propTypes = {
        ...cmfConnect.propTypes,
    }
}
```
