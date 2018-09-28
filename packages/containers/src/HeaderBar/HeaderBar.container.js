import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import { Map } from 'immutable';
import { cmfConnect } from '@talend/react-cmf';
import { HeaderBar as Component } from '@talend/react-components';

import Constants from './HeaderBar.constant';

export const DEFAULT_STATE = new Map({
	productsFetchState: Constants.PRODUCTS_NOT_LOADED,
});

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

	componentDidUpdate(props) {
		const { productsUrl } = props;

		// Trigger product fetch when there's an URL and
		// products URL has changed or products have not been loaded yet
		const shouldFetchProducts =
			productsUrl &&
			(this.props.state.get('productsFetchState') === Constants.PRODUCTS_NOT_LOADED ||
				this.props.productsUrl !== productsUrl);

		if (shouldFetchProducts) {
			this.props.dispatch({
				type: Constants.HEADER_BAR_FETCH_PRODUCTS,
				payload: { url: productsUrl },
			});
		}
	}

	render() {
		const { productsItems, ...props } = this.props;

		const hasFetchedProducts = this.props.state.get('productsFetchState') === Constants.FETCH_PRODUCTS_SUCCESS;

		if (hasFetchedProducts && productsItems) {
			props.products = Object.assign({}, props.products || {}, {
				items: productsItems.map(product => ({
					label: product.name,
					icon: `talend-${product.icon}-colored`,
					onClickDispatch: { type: Constants.HEADER_BAR_OPEN_PRODUCT, payload: product },
				})),
			});
		}

		return <Component {...omit(props, cmfConnect.INJECTED_PROPS)} />;
	}
}

export default HeaderBar;
