/* eslint-disable jsx-a11y/no-autofocus */
import React, { createRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import isNull from 'lodash/isNull';

import { ButtonIcon } from '@talend/design-system';
import { FilterBar, getTheme, Rich } from '@talend/react-components';

import { getTabIndex } from '../addFacetPopover.utils';
import cssModule from './AddFacetPopoverHeader.scss';

const theme = getTheme(cssModule);

export const AddFacetPopoverHeader = ({
	category,
	onCategoryChange,
	id,
	resetFilter,
	onFilter,
	filterValue,
	t,
	isFocusable,
}) => (
	<Rich.Layout.Header className={theme('tc-add-facet-popover-header')} id={`${id}-header`}>
		{!isNull(category) && (
			<div className={theme('tc-add-facet-popover-header-category')}>
				<ButtonIcon
					icon="chevron-left"
					size="S"
					onClick={() => onCategoryChange(null)}
					tabIndex={getTabIndex(isFocusable)}
				>
					{t('ADD_FACET_FILTER_BACK', 'Back')}
				</ButtonIcon>
				<span className={theme('tc-add-facet-popover-header-category-title')}>{category}</span>
			</div>
		)}
		<FilterBar
			autoFocus={false}
			className={theme('tc-add-facet-popover-filter')}
			dockable={false}
			docked={false}
			iconAlwaysVisible
			id={`${id}-filter`}
			placeholder={t('ADD_FACET_FILTER_PLACEHOLDER', 'Find a filter')}
			onToggle={resetFilter}
			onFilter={onFilter}
			value={filterValue}
			disabled={!isFocusable}
		/>
	</Rich.Layout.Header>
);

AddFacetPopoverHeader.propTypes = {
	category: PropTypes.string,
	onCategoryChange: PropTypes.func.isRequired,
	id: PropTypes.string.isRequired,
	resetFilter: PropTypes.func.isRequired,
	onFilter: PropTypes.func.isRequired,
	filterValue: PropTypes.string.isRequired,
	isFocusable: PropTypes.bool.isRequired,
	t: PropTypes.func.isRequired,
};
