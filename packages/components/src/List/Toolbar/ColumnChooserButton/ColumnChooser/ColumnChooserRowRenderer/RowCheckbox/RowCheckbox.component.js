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
	value = false,
}) => {
	const onClickCheckbox = event => {
		onClick(!event.target.value);
	};
	return locked ? (
		<React.Fragment>
			<Icon name="talend-locked" />
			<RowLabel label={label} />
		</React.Fragment>
	) : (
		<React.Fragment>
			<Toggle
				className="checkbox"
				id={`${id}-checkbox-${label}`}
				describedby={describedby}
				label={label}
				onChange={onClickCheckbox}
				checked={!value}
				data-feature={dataFeature}
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
	value: PropTypes.bool,
};

export default RowCheckbox;
