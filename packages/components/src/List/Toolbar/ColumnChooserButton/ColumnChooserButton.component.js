import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Nav, Overlay, Popover } from 'react-bootstrap';
import ColumnChooser from './ColumnChooser';
import getDefaultT from '../../../translate';
import ActionButton from '../../../Actions/ActionButton';

/*
const DefaultColumnChooser = (
	<React.Fragment>
		<ColumnChooser.Header />
		<ColumnChooser.Body />
		<ColumnChooser.Footer />
	</React.Fragment>
);
*/

export default function ColumnChooserButton({
	ariaLabel,
	children,
	columns,
	id,
	nbLockedLeftItems,
	submitColumnChooser,
	t,
}) {
	const [opened, setOpened] = useState(false);
	const [buttonRef, setButtonRef] = useState(null);
	const changeOpened = () => {
		setOpened(!opened);
	};
	/*
	const onHide = () => {
		setOpened(false)
		add transition, copy from overlay trigger
	}
	*/
	return (
		<Nav>
			<ActionButton
				aria-label={
					ariaLabel || t('COLUMN_CHOOSER_OVERLAY_BUTTON', { defaultValue: 'Column chooser button' })
				}
				buttonRef={target => setButtonRef(target)}
				data-feature="open-column-chooser-overlay-action"
				icon="talend-column-chooser"
				id={`${id}-column-chooser-button`}
				label=""
				link
				onClick={changeOpened}
				overlayPlacement="bottom"
			/>
			<Overlay
				id={`${id}-column-chooser-overlay`}
				onHide={() => setOpened(false)}
				placement="right"
				rootClose
				show={opened}
				target={buttonRef}
			>
				<Popover id={`${id}-column-chooser-popover`}>
					{!children ? (
						<ColumnChooser
							columns={columns}
							id={`${id}-column-chooser`}
							nbLockedLeftItems={nbLockedLeftItems}
							onClose={changeOpened}
							submit={submitColumnChooser}
							t={t}
						/>
					) : (
						children
					)}
				</Popover>
			</Overlay>
		</Nav>
	);
}

ColumnChooserButton.propTypes = {
	ariaLabel: PropTypes.string,
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
	columns: PropTypes.array.isRequired,
	id: PropTypes.string.isRequired,
	nbLockedLeftItems: PropTypes.number,
	submitColumnChooser: PropTypes.func.isRequired,
	t: PropTypes.func,
};

ColumnChooserButton.defaultProps = {
	t: getDefaultT(),
};
