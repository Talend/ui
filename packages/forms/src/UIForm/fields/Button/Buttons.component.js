import React, { PropTypes } from 'react';
import FieldTemplate from '../FieldTemplate';
import SingleButton from './SingleButton.component';

import theme from './Buttons.scss';

function getButtonsList(id, buttons, onTrigger) {
	if (!buttons) {
		return null;
	}
	return buttons.map((itemSchema, index) => (
		<SingleButton
			className={theme[itemSchema.position]}
			key={index}
			id={`${id}-${index}`}
			onTrigger={onTrigger}
			schema={itemSchema}
		/>
	));
}

export default function Buttons({ id, onTrigger, schema }) {
	return (
		<FieldTemplate description={schema.description}>
			<div className={theme.buttons}>
				{getButtonsList(id, schema.items, onTrigger)}
			</div>
		</FieldTemplate>
	);
}

if (process.env.NODE_ENV !== 'production') {
	Buttons.propTypes = {
		id: PropTypes.string,
		onTrigger: PropTypes.func,
		schema: SingleButton.propTypes.schema,
	};
}
