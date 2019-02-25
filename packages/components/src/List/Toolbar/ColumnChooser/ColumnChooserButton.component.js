import React from 'react';
import PropTypes from 'prop-types';
import { Nav } from 'react-bootstrap';
import ColumnChooserContent from './Content';
import getDefaultT from '../../../translate';
import ActionButton from '../../../Actions/ActionButton';

export default function ColumnChooserButton({ id, ariaLabel, columns, submitColumnChooser, t }) {
	return (
		<Nav>
			<ActionButton
				aria-label={
					ariaLabel || t('COLUMN_CHOOSER_OVERLAY_BUTTON', { defaultValue: 'Column chooser button' })
				}
				id={`${id}-column-chooser-button`}
				overlayId={`${id}-column-chooser-overlay`}
				label=""
				icon="talend-folder"
				data-feature="open-column-chooser-overlay-action"
				overlayPlacement="bottom"
				link
				overlayComponent={
					<ColumnChooserContent
						columns={columns}
						submitColumnChooser={submitColumnChooser}
						id={`${id}-column-chooser-content`}
						t={t}
					/>
				}
			/>
		</Nav>
	);
}

ColumnChooserButton.propTypes = {
	ariaLabel: PropTypes.string,
	columns: PropTypes.array.isRequired,
	submitColumnChooser: PropTypes.func.isRequired,
	id: PropTypes.string.isRequired,
	t: PropTypes.func,
};

ColumnChooserButton.defaultProps = {
	t: getDefaultT(),
};
