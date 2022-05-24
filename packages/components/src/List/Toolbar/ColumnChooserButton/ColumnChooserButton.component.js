import { ButtonIcon } from '@talend/design-system';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Overlay, Popover } from '@talend/react-bootstrap';
import { useTranslation } from 'react-i18next';
import I18N_DOMAIN_COMPONENTS from '../../../constants';
import ColumnChooser from './ColumnChooser';

export default function ColumnChooserButton({
	children,
	columns,
	initialFilterValue,
	id,
	initialOpenedPopover,
	placement = 'left',
	nbLockedLeftItems,
	onSubmit,
	buttonRenderer,
}) {
	const { t } = useTranslation(I18N_DOMAIN_COMPONENTS);
	const [opened, setOpened] = useState(initialOpenedPopover || false);
	const [buttonRef, setButtonRef] = useState(null);
	const changeOpened = () => setOpened(!opened);
	const closePopover = () => setOpened(false);

	const onSubmitColumnChooser = (event, columnsFromColumnChooser) => {
		onSubmit(event, columnsFromColumnChooser);
		closePopover();
	};

	const ActionButtonRenderer = buttonRenderer || ButtonIcon;

	return (
		<React.Fragment>
			<ActionButtonRenderer
				icon="talend-column-chooser"
				ref={setButtonRef}
				data-feature="column-chooser.open"
				id={`${id}-button`}
				onClick={changeOpened}
				size="S"
			>
				{t('COLUMN_CHOOSER_OVERLAY_BUTTON', 'Open the column chooser')}
			</ActionButtonRenderer>
			<Overlay
				id={`${id}-overlay`}
				onHide={closePopover}
				placement={placement}
				rootClose
				show={opened}
				target={buttonRef}
			>
				<Popover id={`${id}-popover`}>
					{!children ? (
						<ColumnChooser
							columnsFromList={columns}
							initialFilterValue={initialFilterValue}
							id={id}
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
	buttonRenderer: PropTypes.func,
};
