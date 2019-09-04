import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { MenuItem, NavDropdown, Nav, Button } from 'react-bootstrap';
import uuid from 'uuid';
import Icon from '../../../Icon';
import theme from './SortBy.scss';

import { DISPLAY_MODE } from '../constants';
import { useListContext } from '../context';

function SortByItem({ option, index, id, t }) {
	const optionLabel = option.label || option.key;
	return (
		<MenuItem
			id={id && `${id}-by-item-${option.key}`}
			key={index}
			eventKey={option}
			aria-label={t('LIST_SELECT_SORT_BY', {
				defaultValue: 'Select {{sortBy}} as current sort criteria.',
				sortBy: optionLabel,
			})}
		>
			{optionLabel}
		</MenuItem>
	);
}
SortByItem.propTypes = {
	option: PropTypes.shape({
		id: PropTypes.string,
		name: PropTypes.string,
	}),
	index: PropTypes.number,
	id: PropTypes.string,
	t: PropTypes.func,
};

function SortBy(props) {
	const { id, initialValue, options, onChange, value } = props;
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

	console.log({ currentValue });

	// Current selected option
	const selectedOption = options.find(option => option.key === currentValue.sortBy);
	const selectedLabel = selectedOption ? selectedOption.label : 'N.C';
	const isDescending = currentValue.isDescending;
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
	const onSortByChange = (val, event) => {
		console.log({ val });
		performChange(event, { ...currentValue, sortBy: val });
	};

	// Sort order
	const onOrderChange = event =>
		performChange(event, { ...currentValue, isDescending: !currentValue.isDescending });

	const getMenuItem = SortByItem;

	return (
		<Nav className={theme['tc-list-toolbar-sort-by']}>
			{options.length === 1 ? (
				<li className="navbar-text">{options[0].name}</li>
			) : (
				<NavDropdown
					id={`${id}-by`}
					title={selectedLabel}
					onSelect={onSortByChange}
					className={theme['sort-by-items']}
					aria-label={t('LIST_CHANGE_SORT_BY', {
						defaultValue: 'Change sort criteria. Current sort by {{sortBy}}.',
						sortBy: selectedLabel,
					})}
				>
					{options.map((option, index) =>
						getMenuItem({
							option,
							index,
							id,
							t,
						}),
					)}
				</NavDropdown>
			)}
			{selectedLabel && (
				<li>
					<Button
						id={`${id}-order-chooser`}
						aria-label={t('LIST_CHANGE_SORT_BY_ORDER', {
							defaultValue: 'Change sort order. Current order: {{sortOrder}}.',
							sortOrder: orderLabel,
						})}
						onClick={onOrderChange}
						bsStyle=""
						className={classNames(
							theme['tc-list-toolbar-order-chooser'],
							'tc-list-toolbar-order-chooser',
						)}
					>
						<Icon name={isDescending ? 'talend-sort-desc' : 'talend-sort-asc'} />
						<Icon
							name="talend-caret-down"
							transform={!isDescending && 'rotate-180'}
							className={classNames(
								'tc-list-toolbar-order-indicator',
								theme['tc-list-toolbar-order-indicator'],
							)}
						/>
					</Button>
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
