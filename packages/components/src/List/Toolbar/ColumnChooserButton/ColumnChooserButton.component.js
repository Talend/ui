import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Overlay, Popover } from 'react-bootstrap';
import ColumnChooser from './ColumnChooser';
import getDefaultT from '../../../translate';
import ActionButton from '../../../Actions/ActionButton';

export default function ColumnChooserButton({
	children,
	columns,
	id,
	placement = 'left',
	nbLockedLeftItems,
	submit,
	t = getDefaultT(),
}) {
	const [opened, setOpened] = useState(false);
	const [buttonRef, setButtonRef] = useState(null);
	const changeOpened = () => setOpened(!opened);
	const closePopover = () => setOpened(false);
	const colChooserButtonId = `${id}-column-chooser`;

	const onSubmitColumnChooser = (event, columnsChooser) => {
		submit(event, columnsChooser);
		closePopover();
	};

	return (
		<React.Fragment>
			<ActionButton
				buttonRef={setButtonRef}
				data-feature="open-column-chooser-overlay-action"
				hideLabel
				icon="talend-column-chooser"
				id={`${colChooserButtonId}-button`}
				label={t('COLUMN_CHOOSER_OVERLAY_BUTTON', { defaultValue: 'Column chooser button' })}
				link
				onClick={changeOpened}
			/>
			<Overlay
				id={`${colChooserButtonId}-overlay`}
				onHide={closePopover}
				placement={placement}
				rootClose
				show={opened}
				target={buttonRef}
			>
				<Popover id={`${colChooserButtonId}-popover`}>
					{!children ? (
						<ColumnChooser
							columns={columns}
							id={colChooserButtonId}
							nbLockedLeftItems={nbLockedLeftItems}
							submit={onSubmitColumnChooser}
							t={t}
						/>
					) : (
						children
					)}
				</Popover>
			</Overlay>
		</React.Fragment>
	);
}

ColumnChooserButton.propTypes = {
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
	columns: PropTypes.array.isRequired,
	id: PropTypes.string.isRequired,
	nbLockedLeftItems: PropTypes.number,
	placement: PropTypes.oneOf(['top', 'bottom', 'right', 'left']),
	submit: PropTypes.func.isRequired,
	t: PropTypes.func,
};
