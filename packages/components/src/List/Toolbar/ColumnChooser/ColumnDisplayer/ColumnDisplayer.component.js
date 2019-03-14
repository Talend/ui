import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../../../../Icon';
import ColumnOrder from './ColumnOrder';
import { columnChooserContext } from '../Content/columnChooser.context';

import theme from './ColumnDisplayer.scss';

export const ColumnLabel = props => {
	return (
		<span className={classNames(theme['tc-column-displayer-label'], 'tc-column-displayer-label')}>
			{props.label}
		</span>
	);
};

export const ColumnVisibility = ({ index, locked, value }) => {
	const { onChangeVisibility, t } = useContext(columnChooserContext);
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
					onChange={event => onChangeVisibility(index)(event, !value)}
					type="checkbox"
					checked={!value}
					value={!value}
				/>
			)}
		</div>
	);
};

ColumnVisibility.propTypes = {
	locked: PropTypes.bool,
	value: PropTypes.bool,
};

const ColumnDisplayer = ({ children }) => {
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

ColumnDisplayer.ColumnVisibility = ColumnVisibility;
ColumnDisplayer.ColumnLabel = ColumnLabel;
ColumnDisplayer.ColumnOrder = ColumnOrder;

ColumnDisplayer.propTypes = {
};

export default ColumnDisplayer;
