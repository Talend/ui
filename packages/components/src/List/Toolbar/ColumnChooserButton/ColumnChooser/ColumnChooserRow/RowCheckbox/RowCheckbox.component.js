import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../../../../Icon';
import RowLabel from '../RowLabel';
import cssModule from '../../ColumnChooser.scss';
import { getTheme } from '../../../../../../theme';
import { Checkbox } from '../../../../../../Toggle';

const theme = getTheme(cssModule);

const RowCheckbox = ({
	dataFeature,
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
	const describedby = `${id}-${description}`;
	return locked ? (
		<React.Fragment>
			<Icon name="talend-locked" className={theme('tc-column-chooser-row-locked-icon')} />
			<RowLabel label={label} />
		</React.Fragment>
	) : (
		<React.Fragment>
			<Checkbox
				checked={checked}
				data-feature={dataFeature}
				aria-describedby={describedby}
				id={`${id}-checkbox-${label.replace(/\s+/g, '-')}`}
				label={label}
				onChange={onChangeCheckbox}
			/>
			<div id={describedby} className="sr-only">
				{description}
			</div>
		</React.Fragment>
	);
};

RowCheckbox.propTypes = {
	dataFeature: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	locked: PropTypes.bool,
	onChange: PropTypes.func.isRequired,
	checked: PropTypes.bool,
};

export default RowCheckbox;
