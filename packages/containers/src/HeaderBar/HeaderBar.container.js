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
		productsLang: PropTypes.string,
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
		const { productsUrl, productsLang } = props;

		// Trigger product fetch when there's an URL and
		// products URL has changed or products have not been loaded yet
		const shouldFetchProducts =
			productsUrl &&
			(this.props.state.get('productsFetchState') === Constants.PRODUCTS_NOT_LOADED ||
				this.props.productsUrl !== productsUrl);

		if (shouldFetchProducts) {
			this.props.dispatch({
				type: Constants.HEADER_BAR_FETCH_PRODUCTS,
				payload: { url: productsUrl, lang: productsLang },
			});
		}
	}

	render() {
		const { productsItems, ...props } = this.props;

		if (
			this.props.state.get('productsFetchState') === Constants.FETCH_PRODUCTS_SUCCESS &&
			productsItems
		) {
			props.products = Object.assign({}, props.products || {}, {
				// Add onClickDispatch event to items
				items: productsItems.map(product => ({
					onClickDispatch: { type: Constants.HEADER_BAR_OPEN_PRODUCT, payload: product },
					...product,
				})),
			});
		}

		return <Component {...omit(props, cmfConnect.INJECTED_PROPS)} />;
	}
}

export default HeaderBar;
