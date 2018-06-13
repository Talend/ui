import cmf, { cmfConnect } from '@talend/react-cmf';

import HeaderBarContainer, { DEFAULT_STATE } from './HeaderBar.container';

export function mapStateToProps(state, ownProps) {
	const products = cmf.selectors.collections.toJS(state, HeaderBarContainer.PRODUCTS_COLLECTION_ID);
	console.log('***** products', products);
	if (!products) {
		return {};
	}

	// const { brand = {} } = ownProps;
	// brand.items = products.map(product => ({
	// 	onClick: () => window.open(product.url, '_blank'),
	// 	...product,
	// }));
	const items = products.map(product => ({
		// onClick: () => window.open(product.url, '_blank'),
		...product,
	}));


	// return { brand: { label: 'Okay' } };
	console.log('*** OWNPROPS', ownProps);
	return {
		...ownProps,
		products: {
			items: [
				{
					icon: 'talend-tdp-colored',
					key: 'tdp',
					label: 'Data Preparation',
				},
				{
					icon: 'talend-tic-colored',
					key: 'tic',
					label: 'Integration Cloud',
				},
				{
					icon: 'talend-tmc-colored',
					key: 'tmc',
					label: 'Management Console',
				},
			],
			// onSelect: () => console.log('onProductClick'),
		},
	};
}

const wrap = (state, ownProps) => {
	const props = mapStateToProps(state, ownProps);
	console.log('******* mapStateToProps wrapper output', props, ownProps, props === ownProps);
	return props;
};

const connected = cmfConnect({
	componentId: 'HeaderBar',
	defaultState: DEFAULT_STATE,
	defaultProps: {
		saga: 'HeaderBar#default',
	},
	// mapStateToProps,
	mapStateToProps: wrap,
})(HeaderBarContainer);

export default connected;
