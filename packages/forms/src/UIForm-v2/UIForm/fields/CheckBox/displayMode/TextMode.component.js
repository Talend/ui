import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import Icon from '@talend/react-components/lib/Icon';
import FieldTemplate from '../../FieldTemplate/displayMode/TextMode.component';

import theme from './TextMode.scss';

export default function TextModeCheckBox({ id, schema, value }) {
	return (
		<FieldTemplate id={id} label={schema.title || value} className={theme.checkbox}>
			<Icon
				aria-label={value}
				aria-hidden={false}
				name={value ? 'talend-check' : 'talend-cross'}
				className={classNames(theme.icon, { [theme.cross]: !value })}
			/>
		</FieldTemplate>
	);
}

if (process.env.NODE_ENV !== 'production') {
	TextModeCheckBox.propTypes = {
		id: PropTypes.string,
		schema: PropTypes.shape({
			title: PropTypes.string,
		}).isRequired,
		value: PropTypes.bool,
	};
}
