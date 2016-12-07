import React, { PropTypes } from 'react';
import { Action as PureAction } from 'react-talend-components';
import { api } from 'react-cmf';
import invariant from 'invariant';

/**
 * @param {object} props react props
 * @example
<Action name="menu:demo"></Action>
 */
function Action(props, context) {
	const onClick = (event, payload) => {
		context.store.dispatch(payload.action);
	};
	let action;
	if (!props.action && props.name) {
		action = api.action.getActionInfo(context, props.name);
	} else if (props.action && !props.name) {
		action = props.action;
	} else {
		invariant(action, 'Action component should have name or action props');
	}
	return (
		<PureAction
			label={action.name}
			icon={action.icon}
			onClick={onClick}
			link={props.link}
			model={props.model}
			tooltipPlacement={props.tooltipPlacement}
			hideLabel={props.hideLabel}
		/>
	);
}

Action.propTypes = {
	name: PropTypes.string,
	action: PropTypes.shape({
		label: PropTypes.string,
		icon: PropTypes.string,
	}),
	link: PropTypes.boolean,
	model: PropTypes.object,
	tooltipPlacement: PropTypes.string,
	hideLabel: PropTypes.boolean,
};
Action.contextTypes = {
	router: PropTypes.object,
	store: PropTypes.object,
	registry: PropTypes.object,
};
export default Action;
