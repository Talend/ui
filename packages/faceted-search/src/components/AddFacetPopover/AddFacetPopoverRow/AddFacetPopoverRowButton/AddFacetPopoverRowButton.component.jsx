import PropTypes from 'prop-types';

import { ButtonTertiary, SizedIcon, StackHorizontal } from '@talend/design-system';

export const AddFacetPopoverRowButton = ({
	id,
	label,
	onClick,
	disabledLabel,
	isCategory = false,
}) => {
	const body = (
		<StackHorizontal gap="0" align="center" justify="spaceBetween">
			<span>{label}</span>
			{isCategory && (
				<span
					data-test="add-facet-popover-row-button-chevron"
					data-testid="add-facet-popover-row-button-chevron"
				>
					<SizedIcon name="chevron-right" size="S"></SizedIcon>
				</span>
			)}
		</StackHorizontal>
	);

	return (
		<ButtonTertiary
			data-test="add-facet-popover-row-button"
			data-testid="add-facet-popover-row-button"
			id={id}
			onClick={onClick}
			disabled={!!disabledLabel}
		>
			{body}
		</ButtonTertiary>
	);
};

AddFacetPopoverRowButton.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	disabledLabel: PropTypes.string,
	isCategory: PropTypes.bool,
};
