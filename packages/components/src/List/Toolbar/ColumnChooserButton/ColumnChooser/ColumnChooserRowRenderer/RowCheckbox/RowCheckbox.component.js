import React from 'react';
import PropTypes from 'prop-types';
// import SimpleCheckBox from '../SimpleCheckBox.component';
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
	onClick,
	checked = false,
}) => {
	const onClickCheckbox = event => {
		onClick(event.target.checked);
	};
	return locked ? (
		<React.Fragment>
			<Icon name="talend-locked" />
			<RowLabel label={label} />
		</React.Fragment>
	) : (
		<React.Fragment>
			<Toggle
				checked={checked}
				className="checkbox"
				data-feature={dataFeature}
				describedby={describedby}
				id={`${id}-checkbox-${label}`}
				label={label}
				onChange={onClickCheckbox}
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
	onClick: PropTypes.func.isRequired,
	checked: PropTypes.bool,
};

export default RowCheckbox;
