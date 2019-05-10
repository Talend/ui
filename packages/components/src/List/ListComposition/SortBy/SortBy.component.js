import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, NavDropdown, Nav, NavItem, MenuItem } from 'react-bootstrap';
import uuid from 'uuid';
import isUndefined from 'lodash/isUndefined';

import { useListContext } from '../context';

function SortBy(props) {
	const {
		id,
		options,
		selected,
		isDescending: isDescendingProp,
		initialSortParams,
		onChange,
		onOrderChange,
	} = props;
	const { sortParams: sortParamsContext, setSortParams, t } = useListContext();

	const isControlled = !isUndefined(onChange);

	let sortParams;

	if (isControlled) {
		sortParams = { sortBy: selected, isDescending: isDescendingProp };
	} else {
		sortParams = { ...initialSortParams, ...sortParamsContext };
	}

	// Current selected option
	const selectedOption = options.find(option => option.key === sortParams.sortBy);
	const selectedLabel = selectedOption ? selectedOption.label : '';

	// Sort field
	const onSelect = isControlled
		? (value, event) => onChange(event, value)
		: value => setSortParams({ ...sortParams, sortBy: value });

	// Sort order
	const onOrderClick = isControlled
		? event => onOrderChange(event, { isDescending: !sortParams.isDescending })
		: () => setSortParams({ ...sortParams, isDescending: !sortParams.isDescending });

	const orderLabel = sortParams.isDescending
		? t('LIST_SELECT_SORT_BY_ORDER_DESC', { defaultValue: 'Descending' })
		: t('LIST_SELECT_SORT_BY_ORDER_ASC', { defaultValue: 'Ascending' });

	return (
		<React.Fragment>
			<Navbar.Text>
				<label htmlFor={id}>{t('LIST_TOOLBAR_SORT_BY', { defaultValue: 'Sort by:' })}</label>
			</Navbar.Text>
			<Nav>
				<NavDropdown
					id={id}
					title={selectedLabel}
					onSelect={onSelect}
					aria-label={t('LIST_CHANGE_DISPLAY_MODE', {
						defaultValue: 'Change sorting option. Current sorting: {{sortBy}}.',
						sortBy: selectedLabel,
					})}
				>
					{options.map(({ key, label }) => (
						<MenuItem id={`${id}-${key}`} key={key} eventKey={key} aria-label={label}>
							{label}
						</MenuItem>
					))}
				</NavDropdown>
				<NavItem
					id={`${id}-order`}
					onClick={onOrderClick}
					aria-label={t('LIST_CHANGE_SORT_BY_ORDER', {
						defaultValue: 'Change sort order. Current order: {{sortOrder}}.',
						sortOrder: orderLabel,
					})}
				>
					{orderLabel}
				</NavItem>
			</Nav>
		</React.Fragment>
	);
}

SortBy.defaultProps = {
	id: uuid.v4(),
	initialSortParams: {},
};

if (process.env.NODE_ENV !== 'production') {
	SortBy.propTypes = {
		id: PropTypes.string,
		isDescending: PropTypes.bool,
		onOrderChange: PropTypes.func,
		options: PropTypes.arrayOf(
			PropTypes.shape({
				key: PropTypes.string,
				label: PropTypes.string,
			}),
		).isRequired,
		selected: PropTypes.string,
		initialSortParams: PropTypes.shape({
			sortBy: PropTypes.string,
			isDescending: PropTypes.bool,
		}),
		onChange: PropTypes.func,
	};
}

export default SortBy;
