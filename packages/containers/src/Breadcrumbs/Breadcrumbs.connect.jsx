import { cmfConnect } from '@talend/react-cmf';
import Breadcrumbs from '@talend/react-components/lib/Breadcrumbs';

const DEFAULT_STATE = {};

export function ContainerBreadcrumbs({ state = DEFAULT_STATE, dispatchActionCreator, ...props }) {
	const items = state?.items ?? props.items;
	const newProps = {
		...props,
		items:
			items &&
			items.map(item => ({
				...item,
				onClick: (event, data) => dispatchActionCreator(item.actionCreator, event, data),
			})),
		loading: state?.loading ?? props.loading,
		maxItems: state?.maxItems ?? props.maxItems,
	};

	return <Breadcrumbs {...newProps} />;
}

ContainerBreadcrumbs.displayName = 'Breadcrumbs';

ContainerBreadcrumbs.propTypes = {
	...cmfConnect.propTypes,
};

export default cmfConnect({
	defaultState: { items: [], maxItems: 10 },
	omitCMFProps: true,
	withComponentRegistry: true,
	withDispatchActionCreator: true,
	withComponentId: true,
})(ContainerBreadcrumbs);
