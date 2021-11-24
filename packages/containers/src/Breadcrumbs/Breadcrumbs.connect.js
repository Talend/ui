import React from 'react';
import { cmfConnect } from '@talend/react-cmf';
import { Map } from 'immutable';
import Breadcrumbs from '@talend/react-components/lib/Breadcrumbs';

const DEFAULT_STATE = Map();

export function ContainerBreadcrumbs({ state = DEFAULT_STATE, dispatchActionCreator, ...props }) {
	const items = state.get('items', props.items);
	const newProps = {
		...props,
		items:
			items &&
			items.map(item => ({
				...item,
				onClick: (event, data) => dispatchActionCreator(item.actionCreator, event, data),
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
	defaultState: Map({ items: [], maxItems: 10 }),
	omitCMFProps: true,
	withComponentRegistry: true,
	withDispatchActionCreator: true,
	withComponentId: true,
})(ContainerBreadcrumbs);
