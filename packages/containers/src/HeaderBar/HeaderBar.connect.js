import cmf, { cmfConnect } from '@talend/react-cmf';

import Container, { DEFAULT_STATE } from './HeaderBar.container';

export const mapStateToProps = state => ({
	productsItems: cmf.selectors.collections.toJS(state, Container.PRODUCTS_COLLECTION_ID),
});

const connected = cmfConnect({
	defaultState: DEFAULT_STATE,
	defaultProps: {
		saga: 'HeaderBar#default',
	},
	mapStateToProps,
})(Container);

export default connected;
