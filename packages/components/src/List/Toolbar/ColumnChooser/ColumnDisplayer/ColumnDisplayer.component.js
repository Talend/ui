import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../../../../Icon';
import ColumnOrder from './ColumnOrder';

import theme from './ColumnDisplayer.scss';

export const ColumnVisibility = ({ onChange, locked, value, t }) => {
	if (locked) {
		return <Icon name="talend-locked" />;
	}
	return (
		<input
			aria-label={t('CHECKBOX_VISIBILITY_COLUMN_CHOOSER', {
				defaultValue: 'change visibility',
			})}
			className={classNames(
				theme['tc-column-displayer-visibility-checkbox'],
				'tc-column-displayer-visibility-checkbox',
			)}
			onChange={() => onChange(event, !value)}
			type="checkbox"
			checked={!value}
			value={!value}
		/>
	);
};

ColumnVisibility.propTypes = {
	locked: PropTypes.bool,
	onChange: PropTypes.func.isRequired,
	t: PropTypes.func.isRequired,
	value: PropTypes.bool,
};

const ColumnDisplayer = ({
	label,
	hidden,
	locked,
	order,
	length,
	onChangeVisibility,
	onBlurOrder,
	onKeyPressOrder,
	t,
}) => {
	return (
		<div
			id="column-chooser-displayer"
			className={classNames(theme['tc-column-displayer'], 'tc-column-displayer')}
		>
			<div
				className={classNames(
					theme['tc-column-displayer-visibility'],
					'tc-column-displayer-visibility',
				)}
			>
				<ColumnVisibility onChange={onChangeVisibility} value={hidden} locked={locked} t={t} />
			</div>
			<span className={classNames(theme['tc-column-displayer-label'], 'tc-column-displayer-label')}>
				{label}
			</span>
			<div className={classNames(theme['tc-column-displayer-order'], 'tc-column-displayer-order')}>
				<ColumnOrder
					length={length}
					locked={locked}
					onBlur={onBlurOrder}
					onKeyPress={onKeyPressOrder}
					order={order}
					t={t}
					value={order}
				/>
			</div>
		</div>
	);
};

ColumnDisplayer.propTypes = {
	hidden: PropTypes.bool,
	label: PropTypes.string.isRequired,
	length: PropTypes.number.isRequired,
	locked: PropTypes.bool,
	onBlurOrder: PropTypes.func.isRequired,
	onChangeVisibility: PropTypes.func.isRequired,
	onKeyPressOrder: PropTypes.func.isRequired,
	order: PropTypes.number.isRequired,
	t: PropTypes.func.isRequired,
};

export default ColumnDisplayer;
