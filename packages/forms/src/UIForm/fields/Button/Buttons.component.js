import PropTypes from 'prop-types';

import { Form } from '@talend/design-system';

import SingleButton from './SingleButton.component';

function getButtonsList(id, buttons, onTrigger, onClick, getComponent) {
	if (!buttons) {
		return null;
	}
	return buttons.map((itemSchema, index) => (
		<SingleButton
			className={itemSchema.className}
			key={index}
			id={itemSchema.id || `${id}-${index}`}
			onTrigger={onTrigger}
			onClick={onClick && onClick(itemSchema.onClick)}
			schema={itemSchema}
			getComponent={getComponent}
		/>
	));
}

export default function Buttons({ id, onTrigger, schema, onClick, getComponent }) {
	return (
		<Form.Buttons>
			{getButtonsList(id, schema.items, onTrigger, onClick, getComponent)}
		</Form.Buttons>
	);
}

if (process.env.NODE_ENV !== 'production') {
	Buttons.propTypes = {
		id: PropTypes.string,
		onClick: PropTypes.func,
		onTrigger: PropTypes.func,
		schema: SingleButton.propTypes.schema,
		getComponent: PropTypes.func,
	};
}

Buttons.defaultProps = {
	schema: {},
};
