import React from 'react';
// import ColumnChooserModal from '../Modal/ColumnChooserModal.component';
import ActionButton from '../../../../Actions/ActionButton';

export default function ColumnChooserButton({ id, label, overlay, onExitOverlay }) {
	return (
		<ActionButton
			id={`${id}-button`}
			label={label}
			icon="talend-folder"
			data-feature="action"
			onExitOverlay={onExitOverlay}
			overlayComponent={overlay}
			overlayPlacement="bottom"
		/>
	);
}
