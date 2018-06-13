import PropTypes from 'prop-types';
import React from 'react';
import Action from '@talend/react-components/lib/Actions/Action';
import Inject from '@talend/react-components/lib/Inject';
import classNames from 'classnames';

export default function SingleButton({ className, id, onTrigger, onClick, schema, getComponent }) {
	const { triggers, type = 'button', title, label, ...props } = schema;
	const Renderer = Inject.getAll(getComponent, { Action });
	let localOnClick;
	if (type === 'button' && triggers) {
		localOnClick = event => onTrigger(event, { trigger: triggers[0], schema });
	} else {
		localOnClick = event => onClick(event, schema);
	}

	return (
		<Renderer.Action
			{...props}
			id={id}
			className={classNames('btn', className)}
			label={label || title}
			onClick={localOnClick}
			type={type}
		/>
	);
}

if (process.env.NODE_ENV !== 'production') {
	SingleButton.propTypes = {
		className: PropTypes.string,
		id: PropTypes.string,
		onTrigger: PropTypes.func,
		onClick: PropTypes.func,
		getComponent: PropTypes.func,
		schema: PropTypes.shape({
			bsStyle: PropTypes.string,
			disabled: PropTypes.bool,
			inProgress: PropTypes.bool,
			name: PropTypes.string,
			label: PropTypes.string,
			triggers: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.string])),
			type: PropTypes.string,
		}),
	};
}

SingleButton.defaultProps = {
	schema: {},
};
