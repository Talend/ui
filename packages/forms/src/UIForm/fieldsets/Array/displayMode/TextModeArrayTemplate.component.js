import React from 'react';
import PropTypes from 'prop-types';

import theme from './TextModeArrayTemplate.scss';

export default function TextModeArrayTemplate(props) {
	const { id, renderItem, schema, value } = props;
	return (
		<div className={theme['tf-array-text-mode']}>
			<dt className="tf-title-text-mode" id={id}>
				{schema.title}
			</dt>

			<dd>
				<ol aria-labelledby={id}>
					{value.map((_, index) => (
						<li>{renderItem(index)}</li>
					))}
				</ol>
			</dd>
		</div>
	);
}

if (process.env.NODE_ENV !== 'production') {
	TextModeArrayTemplate.propTypes = {
		id: PropTypes.id,
		renderItem: PropTypes.func.isRequired,
		schema: PropTypes.object.isRequired,
		value: PropTypes.arrayOf(PropTypes.object).isRequired,
	};
}
