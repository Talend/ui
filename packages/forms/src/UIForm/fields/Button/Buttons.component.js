import React, { PropTypes } from 'react';
import FieldTemplate from '../FieldTemplate';
import SingleButton from './SingleButton.component';

import theme from './Buttons.scss';

export default function Buttons(props) {
	const { id, onTrigger, schema } = props;
	return (
		<FieldTemplate description={schema.description}>
			<div className={theme.buttons}>
				{
					schema.items &&
					schema.items.map((itemSchema, index) => (
						<SingleButton
							className={theme[itemSchema.position]}
							key={index}
							id={`${id}-${index}`}
							onTrigger={onTrigger}
							schema={itemSchema}
						/>
					))
				}
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
