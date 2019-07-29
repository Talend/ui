import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../../../../../Icon';
import { columnChooserContext } from '../columnChooser.context';

import theme from './ColumnChooserRowRenderer.scss';

const Label = props => (
	<span className={classNames(theme['tc-column-displayer-label'], 'tc-column-displayer-label')}>
		{props.label}
	</span>
);

Label.propTypes = {
	label: PropTypes.string.isRequired,
};

const Visibility = ({ index, locked, value }) => {
	const { onChangeVisibility, t } = useContext(columnChooserContext);
	const onClick = () => {
		onChangeVisibility(index)(!value);
	};
	return (
		<div
			className={classNames(
				theme['tc-column-displayer-visibility'],
				'tc-column-displayer-visibility',
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
						theme['tc-column-displayer-visibility-checkbox'],
						'tc-column-displayer-visibility-checkbox',
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
			id={`${id}-displayer`}
			className={classNames(theme['tc-column-displayer'], 'tc-column-displayer')}
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
