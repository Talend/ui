import PropTypes from 'prop-types';
import React from 'react';
import Badge from '@talend/react-components/lib/Badge';
import { TextMode as FieldTemplate } from '@talend/react-forms/lib/UIForm/fields/FieldTemplate';

import theme from './TextMode.scss';

function getLabel(titleMap, value) {
	const itemConf = titleMap.find(item => item.value === value);
	if (itemConf) {
		return itemConf.name;
	}
	return value;
}

export default function MultiSelectTextMode({ id, schema, value }) {
	const { title } = schema;

	return (
		<FieldTemplate id={id} label={title}>
			<ul aria-labelledby={id} className={theme['tc-badge-list']}>
				{value.map((val, index) => (
					<li>
						<Badge key={index} label={getLabel(schema.titleMap, val)} />
					</li>
				))}
			</ul>
		</FieldTemplate>
	);
}

if (process.env.NODE_ENV !== 'production') {
	MultiSelectTextMode.propTypes = {
		id: PropTypes.string,
		schema: PropTypes.shape({
			title: PropTypes.string,
			titleMap: PropTypes.arrayOf(
				PropTypes.shape({
					name: PropTypes.string.isRequired,
					value: PropTypes.string.isRequired,
				}),
			),
		}).isRequired,
		value: PropTypes.arrayOf(PropTypes.string),
	};
}

MultiSelectTextMode.defaultProps = {
	value: [],
};
