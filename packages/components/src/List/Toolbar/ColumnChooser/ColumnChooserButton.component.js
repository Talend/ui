import React from 'react';
import PropTypes from 'prop-types';
import { Nav } from 'react-bootstrap';
import ColumnChooserContent from './Content';
import ActionButton from '../../../Actions/ActionButton';

export default function ColumnChooserButton({ id, ariaLabel, columns, handlerColumnChooser }) {
	return (
		<Nav>
			<ActionButton
				aria-label={ariaLabel || 'column chooser button'}
				id={`${id}-column-chooser-button`}
				overlayId={`${id}-column-chooser-overlay`}
				label=""
				icon="talend-folder"
				data-feature="action"
				overlayPlacement="bottom"
				link
				overlayComponent={
					<ColumnChooserContent
						columns={columns}
						handlerColumnChooser={handlerColumnChooser}
						id={`${id}-column-chooser-content`}
					/>
				}
			/>
		</Nav>
	);
}

ColumnChooserButton.propTypes = {
	ariaLabel: PropTypes.string,
	id: PropTypes.string.isRequired,
	columns: PropTypes.array.isRequired,
	handlerColumnChooser: PropTypes.func.isRequired,
};
