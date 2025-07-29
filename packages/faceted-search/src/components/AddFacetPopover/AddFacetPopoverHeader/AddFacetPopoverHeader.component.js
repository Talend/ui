import isNull from 'lodash/isNull';
import PropTypes from 'prop-types';

import { ButtonTertiary, Form } from '@talend/design-system';

export const AddFacetPopoverHeader = ({
	category,
	onCategoryChange,
	id,
	onFilter,
	filterValue,
	t,
}) => (
	<div id={`${id}-header`}>
		{!isNull(category) && (
			<ButtonTertiary
				data-test="add-facet-popover-header-goback"
				data-testid="add-facet-popover-header-goback"
				icon="chevron-left"
				size="S"
				onClick={() => onCategoryChange(null)}
			>
				{t('ADD_FACET_FILTER_BACK', 'Back')}
			</ButtonTertiary>
		)}
		<Form.Search
			id={`${id}-filter`}
			placeholder={t('ADD_FACET_FILTER_PLACEHOLDER', 'Find a filter')}
			onChange={onFilter}
			value={filterValue}
		/>
	</div>
);

AddFacetPopoverHeader.propTypes = {
	category: PropTypes.string,
	onCategoryChange: PropTypes.func.isRequired,
	id: PropTypes.string.isRequired,
	onFilter: PropTypes.func.isRequired,
	filterValue: PropTypes.string.isRequired,
	t: PropTypes.func.isRequired,
};
