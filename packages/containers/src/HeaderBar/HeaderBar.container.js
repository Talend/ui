import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import { Map } from 'immutable';
import { cmfConnect, Inject } from '@talend/react-cmf';

export const DEFAULT_STATE = new Map({});

class HeaderBar extends React.Component {
	static displayName = 'Container(HeaderBar)';

	static PRODUCTS_COLLECTION_ID = 'header_bar_products_collection';

	static propTypes = {
		products: PropTypes.shape({
			url: PropTypes.string,
			lang: PropTypes.string,
			env: PropTypes.string,
		}),
		...cmfConnect.propTypes,
	};

	render() {
		const { products } = this.props;

		if (products) {
			const { url, language, env, items } = products;

			if (url && !items) {
				// A products URL has been provided and no product is available,
				// trigger products list fetching
				this.props.dispatch({
					type: 'HEADER_BAR_RECEIVE_PRODUCT_URL',
					payload: { url, language, env },
				});
			}
		}

		const props = Object.assign(
			{},
			omit(this.props, ['products.url', ...cmfConnect.INJECTED_PROPS]),
		);

		return <Inject component="HeaderBar" {...props} />;
	}
}

export default HeaderBar;
