import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Navbar, NavDropdown, Nav, NavItem, MenuItem } from 'react-bootstrap';
import uuid from 'uuid';

import { DISPLAY_MODE } from '../constants';
import { useListContext } from '../context';

function SortBy(props) {
	const { id, initialValue, options, onChange, value } = props;
	const { displayMode, sortParams, setSortParams, t } = useListContext();

	if (displayMode === DISPLAY_MODE.TABLE) {
		return null;
	}

	const isControlled = onChange;

	useEffect(() => {
		if (!isControlled && initialValue) {
			setSortParams(initialValue);
		}
	}, []);

	const currentValue = isControlled ? value : sortParams;

	// Current selected option
	const selectedOption = options.find(option => option.key === currentValue.sortBy);
	const selectedLabel = selectedOption ? selectedOption.label : 'N.C';
	const orderLabel = currentValue.isDescending
		? t('LIST_SELECT_SORT_BY_ORDER_DESC', { defaultValue: 'Descending' })
		: t('LIST_SELECT_SORT_BY_ORDER_ASC', { defaultValue: 'Ascending' });

	const performChange = (event, nextValue) => {
		if (isControlled) {
			onChange(event, nextValue);
		} else {
			setSortParams(nextValue);
		}
	};

	// Sort field
	const onSortByChange = (val, event) => performChange(event, { ...currentValue, sortBy: val });

	// Sort order
	const onOrderChange = event =>
		performChange(event, { ...currentValue, isDescending: !currentValue.isDescending });

	return (
		<React.Fragment>
			<Navbar.Text>
				<label htmlFor={id}>{t('LIST_TOOLBAR_SORT_BY', { defaultValue: 'Sort by:' })}</label>
			</Navbar.Text>
			<Nav>
				<NavDropdown
					id={id}
					title={selectedLabel}
					onSelect={onSortByChange}
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
					onClick={onOrderChange}
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
	value: {},
};

if (process.env.NODE_ENV !== 'production') {
	SortBy.propTypes = {
		id: PropTypes.string,
		options: PropTypes.arrayOf(
			PropTypes.shape({
				key: PropTypes.string,
				label: PropTypes.string,
			}),
		).isRequired,
		initialValue: PropTypes.shape({
			sortBy: PropTypes.string,
			isDescending: PropTypes.bool,
		}),
		onChange: PropTypes.func,
		value: PropTypes.shape({
			sortBy: PropTypes.string,
			isDescending: PropTypes.bool,
		}),
	};
}

export default SortBy;
