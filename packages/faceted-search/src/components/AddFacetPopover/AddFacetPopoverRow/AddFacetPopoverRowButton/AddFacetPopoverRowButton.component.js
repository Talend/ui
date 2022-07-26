import React from 'react';
import PropTypes from 'prop-types';

import { StackHorizontal, StackItem, SizedIcon } from '@talend/design-system';
import { getTheme, TooltipTrigger } from '@talend/react-components';

import cssModule from './AddFacetPopoverRowButton.scss';

const theme = getTheme(cssModule);

export const AddFacetPopoverRowButton = ({
	id,
	label,
	onClick,
	tabIndex,
	disabledLabel,
	isCategory = false,
}) => {
	const body = (
		<StackHorizontal gap="S" alignContent="baseline">
			<StackItem grow>{label}</StackItem>
			{isCategory && <SizedIcon name="chevron-right" size="S"></SizedIcon>}
		</StackHorizontal>
	);

	if (disabledLabel) {
		return (
			<TooltipTrigger label={disabledLabel} tooltipPlacement="top">
				<div
					className={`${theme('tc-add-facet-popover-row-button')} ${theme(
						'tc-add-facet-popover-row-disabled',
					)}`}
					tabIndex={tabIndex}
				>
					{body}
				</div>
			</TooltipTrigger>
		);
	}

	return (
		<button
			id={id}
			className={theme('tc-add-facet-popover-row-button')}
			onClick={onClick}
			tabIndex={tabIndex}
		>
			{body}
		</button>
	);
};

AddFacetPopoverRowButton.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	tabIndex: PropTypes.number,
	disabledLabel: PropTypes.string,
	isCategory: PropTypes.bool,
};
