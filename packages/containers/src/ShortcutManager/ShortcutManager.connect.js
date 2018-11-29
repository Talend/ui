import { cmfConnect } from '@talend/react-cmf';
import { routerAPI } from '@talend/react-cmf-router';

import Container from './ShortcutManager.container';

function mapStateToProps(state) {
	return {
		pathname: routerAPI.selectors.getPath(state),
	};
}

export default cmfConnect({
	omitCMFProps: true,
	withComponentRegistry: true,
	withDispatch: true,
	withDispatchActionCreator: true,
	withComponentId: true,
	mapStateToProps,
})(Container);
