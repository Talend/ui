import React from 'react';
import { cmfConnect } from '@talend/react-cmf';
import { Map } from 'immutable';
import Breadcrumbs from '@talend/react-components/lib/Breadcrumbs';

const DEFAULT_STATE = new Map();

export function ContainerBreadcrumbs(props) {
	const state = props.state || DEFAULT_STATE;
	const items = state.get('items', props.items);
	const newProps = {
		id: state.get('id', props.id),
		items: items.map(item => ({
			...item,
			onClick: (event, data) => props.dispatchActionCreator(item.actionCreator, event, data),
		})),
		loading: state.get('loading', props.loading),
		maxItems: state.get('maxItems', props.maxItems),
	};

	return <Breadcrumbs {...newProps} />;
}

ContainerBreadcrumbs.displayName = 'Breadcrumbs';
ContainerBreadcrumbs.propTypes = {
	...cmfConnect.propTypes,
};

export default cmfConnect({
	defaultState: new Map({ items: [], maxItems: 10 }),
	omitCMFProps: true,
	withComponentRegistry: true,
	withDispatch: true,
	withDispatchActionCreator: true,
	withComponentId: true,
})(ContainerBreadcrumbs);
