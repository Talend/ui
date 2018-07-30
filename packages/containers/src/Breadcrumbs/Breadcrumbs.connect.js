import React from 'react';
import PropTypes from 'prop-types';
import { cmfConnect } from '@talend/react-cmf';
import { Map } from 'immutable';
import { Breadcrumbs } from '@talend/react-components';
export const DEFAULT_STATE = new Map();

export function ContainerBreadcrumbs(props) {
	const state = props.state || DEFAULT_STATE;
	const items = state.get('items', props.items);
	const newProps = {
		items: items.map(item => ({
			...item,
			onClick: (event, data) => props.dispatchActionCreator(item.actionCreator, event, data),
		})),
		maxItems: state.get('maxItems', props.maxItems),
	};

	return <Breadcrumbs {...newProps} />;
}

ContainerBreadcrumbs.displayName = 'Breadcrumbs';
ContainerBreadcrumbs.propTypes = {
	items: PropTypes.arrayOf(PropTypes.object),
	maxItems: PropTypes.number,
};

export default cmfConnect({
	defaultState: new Map({ items: [], maxItems: 10 }),
})(ContainerBreadcrumbs);
