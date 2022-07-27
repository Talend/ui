import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { StackHorizontal, StackItem, SizedIcon, Tooltip } from '@talend/design-system';
import { getTheme } from '@talend/react-components';

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
			<Tooltip title={disabledLabel} placement="left">
				<div
					className={classNames(
						theme('tc-add-facet-popover-row-button'),
						theme('tc-add-facet-popover-row-disabled'),
					)}
					tabIndex={tabIndex}
				>
					{body}
				</div>
			</Tooltip>
		);
	}

	return (
		<button
			id={id}
			className={classNames(
				theme('tc-add-facet-popover-row-button'),
				isCategory && theme('tc-add-facet-popover-row-button-category'),
			)}
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
