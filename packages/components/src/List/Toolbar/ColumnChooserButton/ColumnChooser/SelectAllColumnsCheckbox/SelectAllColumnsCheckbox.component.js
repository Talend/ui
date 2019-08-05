import React from 'react';
import PropTypes from 'prop-types';
import ColumnChooserRowRenderer from '../ColumnChooserRowRenderer';
import cssModule from '../ColumnChooser.scss';
import { getTheme } from '../../../../../theme';

const theme = getTheme(cssModule);

const SelectAllColumnsCheckbox = ({ id, onClick, value, t }) => {
	return (
		<ColumnChooserRowRenderer className={theme('tc-column-chooser-row-select-all')}>
			<ColumnChooserRowRenderer.Checkbox
				id={id}
				dataFeature="select-all-columns"
				describedby="desc-select-all-columns"
				description={t('CHECKBOX_SELECT_ALL_COLUMNS_ARIA_DESCRIPTION', {
					defaultValue: 'select or deselect all the columns',
				})}
				label={t('CHECKBOX_VISIBILITY_LABEL', {
					defaultValue: 'Columns',
				})}
				onClick={onClick}
				checked={value}
				t={t}
			/>
		</ColumnChooserRowRenderer>
	);
};

SelectAllColumnsCheckbox.propTypes = {
	id: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	value: PropTypes.bool,
	t: PropTypes.func.isRequired,
};

export default SelectAllColumnsCheckbox;
