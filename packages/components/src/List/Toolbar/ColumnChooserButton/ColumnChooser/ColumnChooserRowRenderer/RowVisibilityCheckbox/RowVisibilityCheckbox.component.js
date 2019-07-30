import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../../../../../../Icon';
import { columnChooserContext } from '../../columnChooser.context';

import theme from '../ColumnChooserRowRenderer.scss';

const RowVisibilityCheckbox = ({ index, locked, value }) => {
	const { onChangeVisibility, t } = useContext(columnChooserContext);
	const onClick = () => {
		onChangeVisibility(index, !value);
	};

	const CheckboxInput = (
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
	);
	return (
		<div
			className={classNames(
				theme['tc-column-chooser-row-visibility'],
				'tc-column-chooser-row-visibility',
			)}
		>
			{locked ? <Icon name="talend-locked" /> : CheckboxInput }
		</div>
	);
};

RowVisibilityCheckbox.propTypes = {
	index: PropTypes.number.isRequired,
	locked: PropTypes.bool,
	value: PropTypes.bool.isRequired,
};

export default RowVisibilityCheckbox;
