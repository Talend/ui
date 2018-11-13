import cmf, { cmfConnect } from '@talend/react-cmf';

import Container, { DEFAULT_STATE } from './AboutDialog.container';
import Constants from './AboutDialog.constant';

export const mapStateToProps = state => ({
	...cmf.selectors.collections.toJS(state, Constants.COLLECTION_ID),
});

const connected = cmfConnect({
	defaultState: DEFAULT_STATE,
	defaultProps: {
		saga: 'AboutDialog#default',
	},
	mapStateToProps,
	omitCMFProps: true,
	withComponentRegistry: true,
	withDispatch: true,
	withDispatchActionCreator: true,
	withComponentId: true,
})(Container);

export default connected;
