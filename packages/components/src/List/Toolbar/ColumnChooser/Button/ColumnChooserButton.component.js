import React from 'react';
import ColumnChooserModal from '../Modal/ColumnChooserModal.component';
import ActionButton from '../../../../Actions/ActionButton';

export default function ColumnChooser({ columns, handlerColumnChooser }) {
	return (
		<ActionButton
			id="button-column-chooser"
			label=""
			icon="talend-folder"
			data-feature="action"
			overlayComponent={
				<ColumnChooserModal columns={columns} handlerColumnChooser={handlerColumnChooser} />
			}
		/>
	);
}
