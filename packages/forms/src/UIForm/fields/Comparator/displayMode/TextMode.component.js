import PropTypes from 'prop-types';
import React from 'react';
import Icon from '@talend/react-components/lib/Icon';
import { ICONS_MAPPING } from '../Comparator.component';
import { TextMode as FieldTemplate } from '../../FieldTemplate';

export default function TextMode(props) {
	const { id, schema, value } = props;
	const iconName = ICONS_MAPPING[value.operator];
	return (
		<FieldTemplate id={id} label={schema.title} labelProps={schema.labelProps}>
			{iconName && <Icon name={iconName} />}
			{!iconName && value.operator}
			{`${value.operator ? ' ' : ''}${value.value || ''}`}
		</FieldTemplate>
	);
}

if (process.env.NODE_ENV !== 'production') {
	TextMode.propTypes = {
		id: PropTypes.string,
		schema: PropTypes.shape({
			title: PropTypes.string,
			labelProps: PropTypes.object,
		}),
		value: PropTypes.shape({
			operator: PropTypes.string,
			value: PropTypes.string,
		}),
	};
}

TextMode.defaultProps = {
	schema: {},
	value: {
		operator: '',
		value: '',
	},
};
