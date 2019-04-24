import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Navbar, NavDropdown, Nav, NavItem, MenuItem } from 'react-bootstrap';
import uuid from 'uuid';
import isUndefined from 'lodash/isUndefined';

import { useListContext } from '../context';

function SortBy(props) {
	const { id, options, selected, isDescending: isDescendingProp, onChange, onOrderChange } = props;
	const { sortParams, setSortParams, t } = useListContext();

	// Sort by
	let selectedOption;
	if (selected) {
		selectedOption = selected;
	} else if (sortParams.sortBy) {
		selectedOption = sortParams.sortBy;
	} else {
		selectedOption = options[0].key;

		useEffect(() => {
			setSortParams({ ...sortParams, sortBy: selectedOption });
		});
	}

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
		).required,
		selected: PropTypes.string,
		onChange: PropTypes.func,
	};
}

export default SortBy;
