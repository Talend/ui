import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Nav, Overlay, Popover } from 'react-bootstrap';
import ColumnChooser from './Content';
import getDefaultT from '../../../translate';
import ActionButton from '../../../Actions/ActionButton';

const DefaultColumnChooser = (
	<React.Fragment>
		<ColumnChooser.Header />
		<ColumnChooser.Body />
		<ColumnChooser.Footer />
	</React.Fragment>
);

export default function ColumnChooserButton({
	ariaLabel,
	children,
	columns,
	id,
	lockedLeftItems,
	submitColumnChooser,
	t,
}) {
	const [open, setOpen] = useState(false);
	const [buttonRef, setButtonRef] = useState(null);
	return (
		<Nav>
			<ActionButton
				aria-label={
					ariaLabel || t('COLUMN_CHOOSER_OVERLAY_BUTTON', { defaultValue: 'Column chooser button' })
				}
				id={`${id}-column-chooser-button`}
				label=""
				icon="talend-column-chooser"
				data-feature="open-column-chooser-overlay-action"
				overlayPlacement="bottom"
				link
				buttonRef={target => setButtonRef(target)}
				onClick={() => setOpen(!open)}
			/>
			<Overlay
				show={open}
				target={buttonRef}
				placement="right"
				container={this}
				rootClose
				onHide={() => setOpen(!open)}
			>
				<Popover id={`${id}-column-chooser-popover`}>
					<ColumnChooser
						columns={columns}
						id={`${id}-column-chooser`}
						lockedLeftItems={lockedLeftItems}
						onClose={() => setOpen(!open)}
						submit={submitColumnChooser}
						t={t}
					>
						{!children ? DefaultColumnChooser : children}
					</ColumnChooser>
				</Popover>
			</Overlay>
		</Nav>
	);
}

ColumnChooserButton.propTypes = {
	ariaLabel: PropTypes.string,
	columns: PropTypes.array.isRequired,
	id: PropTypes.string.isRequired,
	lockedLeftItems: PropTypes.number,
	submitColumnChooser: PropTypes.func.isRequired,
	t: PropTypes.func,
};

ColumnChooserButton.defaultProps = {
	t: getDefaultT(),
};
