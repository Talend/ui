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
					{value.map((val, index) => {
						const valueIsObject = typeof val === 'object';
						const classNames = valueIsObject ? theme.block : undefined;
						return <li className={classNames}>{valueIsObject ? renderItem(index) : val}</li>;
					})}
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
