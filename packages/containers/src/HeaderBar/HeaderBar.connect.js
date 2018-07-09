import cmf, { cmfConnect } from '@talend/react-cmf';

import Container, { DEFAULT_STATE } from './HeaderBar.container';
import Constants from './HeaderBar.constant';

export const mapStateToProps = state => ({
	productsItems: cmf.selectors.collections.toJS(state, Constants.COLLECTION_ID),
});

const connected = cmfConnect({
	defaultState: DEFAULT_STATE,
	defaultProps: {
		saga: 'HeaderBar#default',
	},
	mapStateToProps,
})(Container);

export default connected;
