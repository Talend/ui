import React from 'react';
import PropTypes from 'prop-types';

import { StackHorizontal, StackItem, SizedIcon } from '@talend/design-system';
import { getTheme } from '@talend/react-components';

import cssModule from './AddFacetPopoverRowButton.scss';

const theme = getTheme(cssModule);

export const AddFacetPopoverRowButton = ({
	id,
	onClick,
	tabIndex,
	disabled = false,
	isCategory = false,
	children,
}) => (
	<button
		id={id}
		className={theme('row-button')}
		onClick={onClick}
		disabled={disabled}
		tabIndex={tabIndex}
	>
		<StackHorizontal gap="S" alignContent="baseline">
			<StackItem grow>{children}</StackItem>
			{isCategory && <SizedIcon name="chevron-right" size="S"></SizedIcon>}
		</StackHorizontal>
	</button>
);

AddFacetPopoverRowButton.propTypes = {
	id: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	tabIndex: PropTypes.number,
	disabled: PropTypes.bool,
	isCategory: PropTypes.bool,
	children: PropTypes.oneOfType([
		PropTypes.element,
		PropTypes.arrayOf(PropTypes.element),
		PropTypes.func,
	]).isRequired,
};
