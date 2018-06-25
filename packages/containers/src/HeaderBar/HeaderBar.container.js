import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import { Map } from 'immutable';
import { cmfConnect, Inject } from '@talend/react-cmf';

import { Actions } from './HeaderBar.constant';

export const DEFAULT_STATE = new Map({
	fetchingProducts: false,
});

class HeaderBar extends React.Component {
	static displayName = 'Container(HeaderBar)';

	static PRODUCTS_COLLECTION_ID = 'header_bar_products_collection';

	static propTypes = {
		productsUrl: PropTypes.string,
		productsLang: PropTypes.string,
		productsItems: PropTypes.arrayOf(PropTypes.shape({
			icon: PropTypes.string,
			uri: PropTypes.string,
			label: PropTypes.string,
		})),
		...cmfConnect.propTypes,
	};

	render() {
		const {
			productsUrl,
			productsLang,
			productsItems,
			products = {},
			...props
		} = this.props;

		if (productsItems) {
			// Add onClickDispatch event to items
			const items = productsItems.map(product => ({
				onClickDispatch: { type: Actions.HEADER_BAR_OPEN_PRODUCT, payload: product },
				...product,
			}));

			products.items = items;

			props.products = products;
		} else if (!this.props.state.get('fetchingProducts')) {
			// Trigger fetch if not already fetching
			this.props.dispatch({
				type: Actions.HEADER_BAR_FETCH_PRODUCTS,
				payload: { url: productsUrl, lang: productsLang },
			});
		}

		const componentProps = omit(props, cmfConnect.INJECTED_PROPS);

		return <Inject component="HeaderBar" {...componentProps} />;
	}
}

export default HeaderBar;
