import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import { Map } from 'immutable';
import { cmfConnect } from '@talend/react-cmf';
import { HeaderBar as Component } from '@talend/react-components';

import { fetchProducts, openProduct } from './HeaderBar.actions';

import Constants from './HeaderBar.constant';

export const DEFAULT_STATE = new Map({
	productsFetchState: Constants.PRODUCTS_NOT_LOADED,
});

function sortProductsByLabel(a, b) {
	return a.label > b.label ? 1 : -1;
}

class HeaderBar extends React.Component {
	static displayName = 'Container(HeaderBar)';

	static propTypes = {
		productsUrl: PropTypes.string,
		productsItems: PropTypes.arrayOf(
			PropTypes.shape({
				icon: PropTypes.string,
				uri: PropTypes.string,
				label: PropTypes.string,
			}),
		),
		...cmfConnect.propTypes,
	};

	componentDidUpdate(prevProps) {
		// Trigger product fetch when there's an URL and
		// products URL has changed or products have not been loaded yet
		const hasProductsUrlChanged = this.props.productsUrl !== prevProps.productsUrl;
		const hasProductsBeenLoaded = this.props.state.get('productsFetchState') === Constants.PRODUCTS_NOT_LOADED;

		if (this.props.productsUrl && (hasProductsBeenLoaded || hasProductsUrlChanged)) {
			this.props.dispatch(fetchProducts(this.props.productsUrl));
		}
	}

	render() {
		const { productsItems, ...props } = this.props;

		const hasFetchedProducts =
			this.props.state.get('productsFetchState') === Constants.FETCH_PRODUCTS_SUCCESS;

		if (hasFetchedProducts && productsItems) {
			const items = productsItems
				.map(product => ({
					label: product.name,
					icon: `talend-${product.icon}-colored`,
					onClickDispatch: openProduct(product),
				}))
				.sort(sortProductsByLabel);

			props.products = Object.assign({}, props.products || {}, { items });
		}

		return <Component {...omit(props, cmfConnect.INJECTED_PROPS)} />;
	}
}

export default HeaderBar;
