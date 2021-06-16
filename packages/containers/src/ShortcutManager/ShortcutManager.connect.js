import { cmfConnect } from '@talend/react-cmf';

import Container from './ShortcutManager.container';

function mapStateToProps() {
	return {
		pathname: window.location.pathname,
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
