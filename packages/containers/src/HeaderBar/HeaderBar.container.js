import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import { Map } from 'immutable';
import { cmfConnect } from '@talend/react-cmf';
import { HeaderBar as HeaderBarComponent } from '@talend/react-components';

export const DEFAULT_STATE = new Map({
	loadingProducts: false,
});

class HeaderBar extends React.Component {
	static displayName = 'Container(HeaderBar)';

	static PRODUCTS_COLLECTION_ID = 'header_bar_products_collection';

	static propTypes = {
		productsUrl: PropTypes.string,
		...cmfConnect.propTypes,
	};

	render() {
		console.log('******** render()');
		// debugger;
		// const products = cmf.selectors.collections.toJS(this.props.state, this.PRODUCTS_COLLECTION_ID);

		const { brand } = this.props;

		if (brand) {
			const { productsUrl, products } = brand;

			if (productsUrl && !products) {
				// A products URL has been provided and no product is available,
				// trigger products list fetching
				this.props.dispatch({
					type: 'HEADER_BAR_RECEIVE_PRODUCT_URL',
					productsUrl,
				});
			}
		}

		const props = Object.assign({}, omit(this.props, ['brand.productUrl', ...cmfConnect.INJECTED_PROPS]));

		console.log('--> HeaderBarContainer render props', props);

		return <HeaderBarComponent {...props} />;
	}
}

export default HeaderBar;
