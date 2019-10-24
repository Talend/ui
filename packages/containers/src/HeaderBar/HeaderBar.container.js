import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import { Map } from 'immutable';
import { cmfConnect } from '@talend/react-cmf';
import Component from '@talend/react-components/lib/HeaderBar';

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
				id: PropTypes.string,
				name: PropTypes.string,
				url: PropTypes.string,
			}),
		),
		productsSort: PropTypes.func,
		prepareProducts: PropTypes.func,
		...cmfConnect.propTypes,
	};

	componentDidUpdate(prevProps) {
		// Trigger product fetch when there's an URL and
		// products URL has changed or products have not been loaded yet
		const hasProductsUrlChanged = this.props.productsUrl !== prevProps.productsUrl;
		const hasProductsNotBeenLoaded =
			this.props.state.get('productsFetchState') === Constants.PRODUCTS_NOT_LOADED;

		if (this.props.productsUrl && (hasProductsNotBeenLoaded || hasProductsUrlChanged)) {
			this.props.dispatch(fetchProducts(this.props.productsUrl));
		}
	}

	render() {
		const {
			productsItems: productsFromState,
			productsSort,
			prepareProducts,
			...props
		} = this.props;

		const hasFetchedProducts =
			this.props.state.get('productsFetchState') === Constants.FETCH_PRODUCTS_SUCCESS;

		const productsProps = {};

		if (hasFetchedProducts && productsFromState) {
			const productsFromProps = props.products || {};

			const itemsFromProps = (productsFromProps.items ? props.products.items : []).map(item => {
				if (item.dispatch) {
					return { ...item, onClickDispatch: item.dispatch };
				}

				return item;
			});

			const items = [
				...itemsFromProps,
				...productsFromState.map(product => ({
					'data-feature': `product.${(product.id || '').toLowerCase()}`,
					label: product.name,
					icon: `talend-${product.icon}-colored`,
					onClickDispatch: openProduct(product),
				})),
			];

			productsProps.products = Object.assign({}, productsFromProps, { items });
			productsProps.products.items.sort(productsSort || sortProductsByLabel);

			if (prepareProducts) {
				productsProps.products.items = prepareProducts(productsProps.products.items);
			}
		}

		return <Component {...omit(props, cmfConnect.INJECTED_PROPS)} {...productsProps} />;
	}
}

export default HeaderBar;
