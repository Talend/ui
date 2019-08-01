import React from 'react';
import PropTypes from 'prop-types';
import SimpleCheckBox from '../SimpleCheckBox.component';
import Icon from '../../../../../../Icon';
import RowLabel from '../RowLabel';
import cssModule from '../../ColumnChooser.scss';
import { getTheme } from '../../../../../../theme';

const theme = getTheme(cssModule);

const noOp = () => {};

const RowCheckbox = ({
	dataFeature,
	id,
	describedby,
	description,
	label,
	locked = false,
	onClick,
	value = false,
}) => {
	const onClickCheckbox = (_, uiSchema) => {
		onClick(!uiSchema.value);
	};
	return locked ? (
		<React.Fragment>
			<Icon name="talend-locked" />
			<RowLabel label={label} />
		</React.Fragment>
	) : (
		<React.Fragment>
			<SimpleCheckBox
				id={`${id}-checkbox`}
				describedby={describedby}
				label={label}
				onChange={onClickCheckbox}
				onFinish={noOp}
				value={!value}
				schema={{ 'data-feature': dataFeature }}
			/>
			<div id={describedby} className={theme('tc-column-chooser-aria-hidden')}>
				{description}
			</div>
		</React.Fragment>
	);
	// const CheckboxInput = (
	// 	<input
	// 		aria-label={label}
	// 		className={classNames(
	// 			theme['tc-column-chooser-row-visibility-checkbox'],
	// 			'tc-column-chooser-row-visibility-checkbox',
	// 		)}
	// 		onChange={onClickCheckbox}
	// 		type="checkbox"
	// 		checked={!value}
	// 		value={!value}
	// 	/>
	// );
	// return (
	// 	<div
	// 		className={classNames(
	// 			theme['tc-column-chooser-row-visibility'],
	// 			'tc-column-chooser-row-visibility',
	// 		)}
	// 	>
	// 		{locked ? <Icon name="talend-locked" /> : CheckboxInput}
	// 	</div>
	// );
};

RowCheckbox.propTypes = {
	locked: PropTypes.bool,
	onClick: PropTypes.func.isRequired,
	value: PropTypes.bool,
};

export default RowCheckbox;
