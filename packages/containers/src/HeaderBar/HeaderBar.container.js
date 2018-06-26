import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import { Map } from 'immutable';
import { cmfConnect, Inject } from '@talend/react-cmf';

import Constants from './HeaderBar.constant';

export const DEFAULT_STATE = new Map({
	fetchingProducts: false,
});

const HeaderBar = props => {
	const { productsUrl, productsLang, productsItems, products = {}, ...componentProps } = props;

	if (productsItems) {
		// Add onClickDispatch event to items
		products.items = productsItems.map(product => ({
			onClickDispatch: { type: Constants.HEADER_BAR_OPEN_PRODUCT, payload: product },
			...product,
		}));

		componentProps.products = products;
	} else if (!props.state.get('fetchingProducts')) {
		// Trigger fetch if not already fetching
		props.dispatch({
			type: Constants.HEADER_BAR_FETCH_PRODUCTS,
			payload: { url: productsUrl, lang: productsLang },
		});
	}

	return <Inject component="HeaderBar" {...omit(props, cmfConnect.INJECTED_PROPS)} />;
};

HeaderBar.displayName = 'Container(HeaderBar)';

HeaderBar.propTypes = {
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

export default HeaderBar;
