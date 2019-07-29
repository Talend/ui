import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../../../../../Icon';
import { columnChooserContext } from '../columnChooser.context';

import theme from './ColumnChooserRowRenderer.scss';

const Label = ({ label }) => (
	<span className={classNames(theme['tc-column-chooser-row-label'], 'tc-column-chooser-row-label')}>
		{label}
	</span>
);

Label.propTypes = {
	label: PropTypes.string.isRequired,
};

const Visibility = ({ index, locked, value }) => {
	const { onChangeVisibility, t } = useContext(columnChooserContext);
	const onClick = () => {
		onChangeVisibility(index, !value);
	};
	return (
		<div
			className={classNames(
				theme['tc-column-chooser-row-visibility'],
				'tc-column-chooser-row-visibility',
			)}
		>
			{locked ? (
				<Icon name="talend-locked" />
			) : (
				<input
					aria-label={t('CHECKBOX_VISIBILITY_COLUMN_CHOOSER', {
						defaultValue: 'change visibility',
					})}
					className={classNames(
						theme['tc-column-chooser-row-visibility-checkbox'],
						'tc-column-chooser-row-visibility-checkbox',
					)}
					onChange={onClick}
					type="checkbox"
					checked={!value}
					value={!value}
				/>
			)}
		</div>
	);
};

Visibility.propTypes = {
	index: PropTypes.number.isRequired,
	locked: PropTypes.bool,
	value: PropTypes.bool.isRequired,
};

const ColumnChooserRowRenderer = ({ children }) => {
	const { id } = useContext(columnChooserContext);
	return (
		<div
			id={`${id}-row`}
			className={classNames(theme['tc-column-chooser-row'], 'tc-column-chooser-row')}
		>
			{children}
		</div>
	);
};

ColumnChooserRowRenderer.propTypes = {
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
};

ColumnChooserRowRenderer.Visibility = Visibility;
ColumnChooserRowRenderer.Label = Label;

export default ColumnChooserRowRenderer;
