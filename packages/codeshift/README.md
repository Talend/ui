# Talend's codeshift

Following our mono repository we are doing some breaking changes
The idea here is to build script to help following the changes

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
