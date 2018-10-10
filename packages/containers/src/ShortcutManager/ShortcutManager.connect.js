import { cmfConnect } from '@talend/react-cmf';

import Container from './ShortcutManager.container';

export default cmfConnect({
  omitCMFProps: true,
  withComponentRegistry: true,
  withDispatch: true,
  withDispatchActionCreator: true,
  withComponentId: true,
})(Container);
