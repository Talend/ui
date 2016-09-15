import React from 'react';
import { api } from 'react-cmf';

import ButtonDispatcher from '../ButtonDispatcher';

/**
 * @param	{object} props [description]
 * @example
<ButtonsDispatcher contentType="article" category="primary"/>
 */
function ButtonsDispatcher(props, context) {

	const actions = api.action.getContentTypeActions(
		context,
		props.contentType,
		props.category
	);
	const nProps = {
		icon: props.icon,
		hideLabel: props.hideLabel,
		btn: props.btn,
	};
	return (
		<div>
			{actions.map((action, i) => (
				<ButtonDispatcher
					action={action}
					key={i}
					{...nProps}
				/>
			))}
		</div>
	);
}

const propTypes = Object.assign({}, ButtonDispatcher.propTypes);
delete propTypes.action;
delete propTypes.model;
delete propTypes.onClick;

ButtonsDispatcher.propTypes = Object.assign(
	propTypes,
	{
		contentType: React.PropTypes.string.isRequired,
		category: React.PropTypes.string.isRequired,
		icon: React.PropTypes.bool,
		hideLabel: React.PropTypes.bool,
		btn: React.PropTypes.string,
	}
);

ButtonsDispatcher.contextTypes = {
	store: React.PropTypes.object,
};
export default ButtonsDispatcher;
