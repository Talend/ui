import React, { PropTypes } from 'react';
import { Action } from 'react-talend-components';
import classNames from 'classnames';

export default function SingleButton(props) {
	const { className, id, onTrigger, schema } = props;
	const { bsStyle, disabled, inProgress, title, triggers, type = 'button' } = schema;

	const onClick = type === 'button' && triggers ?
		event => onTrigger(event, triggers[0], schema) :
		undefined;

	return (
		<Action
			id={id}
			bsStyle={bsStyle}
			className={classNames('btn', className)}
			disabled={disabled}
			inProgress={inProgress}
			label={title}
			onClick={onClick}
			type={type}
		/>
	);
}

if (process.env.NODE_ENV !== 'production') {
	SingleButton.propTypes = {
		className: PropTypes.string,
		id: PropTypes.string,
		onTrigger: PropTypes.func,
		schema: PropTypes.shape({
			bsStyle: PropTypes.string,
			disabled: PropTypes.bool,
			inProgress: PropTypes.bool,
			title: PropTypes.string,
			triggers: PropTypes.arrayOf(PropTypes.string),
			type: PropTypes.string,
		}),
	};
}
