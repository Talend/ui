import React from 'react';
import PropTypes from 'prop-types';
import ColumnChooserContent from './Content';
import ActionButton from '../../../Actions/ActionButton';

export default function ColumnChooserButton({ id, columns, handlerColumnChooser }) {
	return (
		<ActionButton
			id={`${id}-button`}
			label="column-chooser-button"
			icon="talend-folder"
			data-feature="action"
			overlayPlacement="bottom"
			overlayComponent={
				<ColumnChooserContent
					columns={columns}
					handlerColumnChooser={handlerColumnChooser}
					id={`${id}-content`}
				/>
			}
		/>
	);
}

ColumnChooserButton.propTypes = {
	id: PropTypes.string.isRequired,
};
