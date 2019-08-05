import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../../../../Icon';
import RowLabel from '../RowLabel';
import cssModule from '../../ColumnChooser.scss';
import { getTheme } from '../../../../../../theme';
import Toggle from '../../../../../../Toggle';

const theme = getTheme(cssModule);

const RowCheckbox = ({
	dataFeature,
	describedby,
	description,
	id,
	label,
	locked = false,
	onChange,
	checked = false,
}) => {
	const onChangeCheckbox = event => {
		onChange(event.target.checked, label);
	};
	return locked ? (
		<React.Fragment>
			<Icon name="talend-locked" />
			<RowLabel label={label} />
		</React.Fragment>
	) : (
		<React.Fragment>
			<Toggle
				aria-checked={checked}
				checked={checked}
				className="checkbox"
				data-feature={dataFeature}
				describedby={describedby}
				id={`${id}-checkbox-${label}`}
				label={label}
				onChange={onChangeCheckbox}
			/>
			<div id={describedby} className={theme('tc-column-chooser-aria-hidden')}>
				{description}
			</div>
		</React.Fragment>
	);
};

RowCheckbox.propTypes = {
	dataFeature: PropTypes.string.isRequired,
	describedby: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	locked: PropTypes.bool,
	onChange: PropTypes.func.isRequired,
	checked: PropTypes.bool,
};

export default RowCheckbox;
