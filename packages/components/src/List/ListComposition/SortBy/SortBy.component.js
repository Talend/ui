import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Navbar, NavDropdown, Nav, NavItem, MenuItem } from 'react-bootstrap';
import uuid from 'uuid';
import isUndefined from 'lodash/isUndefined';

import { useListContext } from '../context';

/**
 * Get the component's selected sort by option
 * @param {object} props Props passed to the component
 * @param {object} sortParams Current value of the context's `sortParams`
 * @returns {string}
 */
function getSelectedOption(props, sortParams) {
	if (props.selected) {
		return props.selected; // From props (controlled mode)
	} else if (sortParams.sortBy) {
		return sortParams.sortBy; // From context (uncontrolled)
	}
	return props.options[0].key; // Default to first available option
}

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
	const { sortParams, setSortParams, t } = useListContext(initialSortParams);

	const selectedOption = getSelectedOption(props, sortParams);

	useEffect(() => {
		if (!selected && !sortParams.sortBy) {
			// Set context's sortBy parameter if there's no value provided (prop or context)
			setSortParams({ ...sortParams, sortBy: selectedOption });
		}
	});

	const onSelect = onChange
		? (value, event) => onChange(event, value)
		: value => setSortParams({ ...sortParams, sortBy: value });

	const selectedLabel = options.find(option => option.key === selectedOption).label;

	// Sort order
	const isDescending = !isUndefined(isDescendingProp) ? isDescendingProp : sortParams.isDescending;

	const onOrderClick = event => {
		if (onOrderChange) {
			onOrderChange(event, { isDescending: !isDescending });
		} else {
			setSortParams({ ...sortParams, isDescending: !isDescending });
		}
	};

	const orderLabel = isDescending
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
