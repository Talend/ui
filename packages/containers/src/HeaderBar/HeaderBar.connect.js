import cmf, { cmfConnect } from '@talend/react-cmf';

import Container, { DEFAULT_STATE } from './HeaderBar.container';

export function mapStateToProps(state, ownProps) {
	const userProducts = cmf.selectors.collections.toJS(state, Container.PRODUCTS_COLLECTION_ID);

	if (!userProducts) {
		return {};
	}

	const { products = {} } = ownProps;

	// Add onClickDispatch event to items
	const items = userProducts.map(product => ({
		onClickDispatch: { type: 'HEADER_BAR_OPEN_PRODUCT', payload: product },
		...product,
	}));

	return { ...ownProps, products: { ...products, items } };
}

const connected = cmfConnect({
	componentId: 'HeaderBar',
	defaultState: DEFAULT_STATE,
	defaultProps: {
		saga: 'HeaderBar#default',
	},
	mapStateToProps,
})(Container);

export default connected;
