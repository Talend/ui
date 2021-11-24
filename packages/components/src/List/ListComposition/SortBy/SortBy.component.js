import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, MenuItem, NavDropdown, Nav, Button } from 'react-bootstrap';
import uuid from 'uuid';
import Icon from '../../../Icon';

import { useListContext } from '../context';

import cssModule from './SortBy.scss';
import { getTheme } from '../../../theme';

const theme = getTheme(cssModule);

const AscendingDescendingButton = ({ id, isDescending, orderLabel, t, onClick }) => (
	<Button
		aria-label={t('LIST_CHANGE_SORT_BY_ORDER', {
			defaultValue: 'Change sort order. Current order: {{sortOrder}}.',
			sortOrder: orderLabel,
		})}
		bsStyle="link"
		className={theme('tc-sort-by-order-chooser')}
		id={`${id}-order-chooser`}
		onClick={onClick}
	>
		<Icon name={isDescending ? 'talend-sort-desc' : 'talend-sort-asc'} />
		<Icon
			className={theme('tc-sort-by-order-chooser-indicator')}
			name="talend-caret-down"
			transform={!isDescending ? 'rotate-180' : null}
		/>
	</Button>
);

AscendingDescendingButton.propTypes = {
	id: PropTypes.string.isRequired,
	isDescending: PropTypes.bool,
	onClick: PropTypes.func.isRequired,
	orderLabel: PropTypes.string.isRequired,
	t: PropTypes.func.isRequired,
};

function SortBy({ id, options, onChange, value }) {
	const { sortParams, setSortParams, t } = useListContext();
	const isControlled = onChange && value;
	const currentValue = isControlled ? value : sortParams;
	const isDescending = currentValue.isDescending;
	// Current selected option
	const selectedOption = options.find(option => option.key === currentValue.sortBy);
	const selectedLabel = selectedOption ? selectedOption.label : 'N.C';
	const orderLabel = isDescending
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
	const onSortByChange = (val, event) => {
		performChange(event, { ...currentValue, sortBy: val });
	};

	// Sort order
	const onOrderChange = event =>
		performChange(event, { ...currentValue, isDescending: !isDescending });

	return (
		<Nav className={theme('tc-sort-by')}>
			<li>
				<Navbar.Text>
					<label className={theme('tc-sort-by-label')} htmlFor={id}>
						{t('LIST_TOOLBAR_SORT_BY', { defaultValue: 'Sort by:' })}
					</label>
				</Navbar.Text>
			</li>
			{options.length === 1 ? (
				<li className="navbar-text">{options[0].name}</li>
			) : (
				<NavDropdown
					aria-label={t('LIST_CHANGE_SORT_BY', {
						defaultValue: 'Change sort criteria. Current sort by {{sortBy}}.',
						sortBy: selectedLabel,
					})}
					className={theme('tc-sort-by-items')}
					id={`${id}-by`}
					onSelect={onSortByChange}
					title={selectedLabel}
				>
					{options.map(({ key, label }, index) => (
						<MenuItem
							aria-label={t('LIST_SELECT_SORT_BY', {
								defaultValue: 'Select {{sortBy}} as current sort criteria.',
								sortBy: label,
							})}
							eventKey={key}
							key={`${key}-${index}`}
							id={`${id}-${key}`}
						>
							{label}
						</MenuItem>
					))}
				</NavDropdown>
			)}
			{selectedOption && (
				<li>
					<AscendingDescendingButton
						id={id}
						isDescending={isDescending}
						onClick={onOrderChange}
						orderLabel={orderLabel}
						t={t}
					/>
				</li>
			)}
		</Nav>
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
				name: PropTypes.string,
			}),
		).isRequired,
		onChange: PropTypes.func,
		value: PropTypes.shape({
			sortBy: PropTypes.string,
			isDescending: PropTypes.bool,
		}),
	};
}

export default SortBy;
