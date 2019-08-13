import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Overlay, Popover } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import ColumnChooser from './ColumnChooser';
import ActionButton from '../../../Actions/ActionButton';

export default function ColumnChooserButton({
	children,
	columns,
	initialFilterValue,
	id,
	initialOpenedPopover,
	placement = 'left',
	nbLockedLeftItems,
	onSubmit,
}) {
	const { t } = useTranslation();
	const [opened, setOpened] = useState(initialOpenedPopover || false);
	const [buttonRef, setButtonRef] = useState(null);
	const changeOpened = () => setOpened(!opened);
	const closePopover = () => setOpened(false);
	const colChooserButtonId = `${id}-column-chooser`;

	const onSubmitColumnChooser = (event, columnsChooser) => {
		onSubmit(event, columnsChooser);
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
				label={t('COLUMN_CHOOSER_OVERLAY_BUTTON', { defaultValue: 'Open the column chooser' })}
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
							initialFilterValue={initialFilterValue}
							id={colChooserButtonId}
							nbLockedLeftItems={nbLockedLeftItems}
							onSubmit={onSubmitColumnChooser}
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
	initialFilterValue: PropTypes.string,
	initialOpenedPopover: PropTypes.bool,
	nbLockedLeftItems: PropTypes.number,
	placement: PropTypes.oneOf(['top', 'bottom', 'right', 'left']),
	onSubmit: PropTypes.func.isRequired,
};
