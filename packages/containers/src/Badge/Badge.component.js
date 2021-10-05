import { cmfConnect } from '@talend/react-cmf';
import Badge from '@talend/react-components/lib/Badge';

export default cmfConnect({
	omitCMFProps: true,
	withComponentRegistry: true,
	withDispatch: true,
	withDispatchActionCreator: true,
	withComponentId: true,
})(Badge);
