import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { MenuItem, NavDropdown, Nav, Button } from 'react-bootstrap';
import uuid from 'uuid';
import Icon from '../../../Icon';
import theme from './SortBy.scss';

import { DISPLAY_MODE } from '../constants';
import { useListContext } from '../context';

const AscendingDescendingButton = ({ id, isDescending, orderLabel, t, onClick }) => (
	<Button
		aria-label={t('LIST_CHANGE_SORT_BY_ORDER', {
			defaultValue: 'Change sort order. Current order: {{sortOrder}}.',
			sortOrder: orderLabel,
		})}
		bsStyle=""
		className={classNames(theme['tc-list-toolbar-order-chooser'], 'tc-list-toolbar-order-chooser')}
		id={`${id}-order-chooser`}
		onClick={onClick}
	>
		<Icon name={isDescending ? 'talend-sort-desc' : 'talend-sort-asc'} />
		<Icon
			className={classNames(
				'tc-list-toolbar-order-indicator',
				theme['tc-list-toolbar-order-indicator'],
			)}
			name="talend-caret-down"
			transform={!isDescending ? 'rotate-180' : null}
		/>
	</Button>
);

AscendingDescendingButton.propTypes = {
	id: PropTypes.string.isRequired,
	isDescending: PropTypes.bool.isRequired,
	onClick: PropTypes.func.isRequired,
	orderLabel: PropTypes.string.isRequired,
	t: PropTypes.func.isRequired,
};

function SortBy({ id, initialValue, options, onChange, value }) {
	const { displayMode, sortParams, setSortParams, t } = useListContext();
	const isControlled = onChange;

	useEffect(() => {
		if (!isControlled && initialValue) {
			setSortParams(initialValue);
		}
	}, []);
	if (displayMode === DISPLAY_MODE.TABLE) {
		return null;
	}
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
		<Nav className={theme['tc-list-toolbar-sort-by']}>
			{options.length === 1 ? (
				<li className="navbar-text">{options[0].name}</li>
			) : (
				<NavDropdown
					aria-label={t('LIST_CHANGE_SORT_BY', {
						defaultValue: 'Change sort criteria. Current sort by {{sortBy}}.',
						sortBy: selectedLabel,
					})}
					className={theme['sort-by-items']}
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
			{selectedLabel && (
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

	// return (
	// 	<React.Fragment>
	// 		<Navbar.Text>
	// 			<label htmlFor={id}>{t('LIST_TOOLBAR_SORT_BY', { defaultValue: 'Sort by:' })}</label>
	// 		</Navbar.Text>
	// 		<Nav>
	// 			<NavDropdown
	// 				id={id}
	// 				title={selectedLabel}
	// 				onSelect={onSortByChange}
	// 				aria-label={t('LIST_CHANGE_DISPLAY_MODE', {
	// 					defaultValue: 'Change sorting option. Current sorting: {{sortBy}}.',
	// 					sortBy: selectedLabel,
	// 				})}
	// 			>
	// 				{options.map(({ key, label }) => (
	// 					<MenuItem id={`${id}-${key}`} key={key} eventKey={key} aria-label={label}>
	// 						{label}
	// 					</MenuItem>
	// 				))}
	// 			</NavDropdown>
	// 			<NavItem
	// 				id={`${id}-order`}
	// 				onClick={onOrderChange}
	// 				aria-label={t('LIST_CHANGE_SORT_BY_ORDER', {
	// 					defaultValue: 'Change sort order. Current order: {{sortOrder}}.',
	// 					sortOrder: orderLabel,
	// 				})}
	// 			>
	// 				{orderLabel}
	// 			</NavItem>
	// 		</Nav>
	// 	</React.Fragment>
	// );
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
