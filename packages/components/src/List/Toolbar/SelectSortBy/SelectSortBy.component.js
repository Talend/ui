import classNames from 'classnames';
import PropTypes from 'prop-types';

import { Button, MenuItem, Nav, NavDropdown } from '@talend/react-bootstrap';
import { randomUUID } from '@talend/utils';

import Icon from '../../../Icon';
import getDefaultT from '../../../translate';

import theme from './SelectSortBy.module.scss';

function SortByItem({ option, id, t, onSelect }) {
	const optionLabel = option.name || option.id;
	return (
		<MenuItem
			id={id && `${id}-by-item-${option.id}`}
			eventKey={option}
			aria-label={t('LIST_SELECT_SORT_BY', {
				defaultValue: 'Select {{sortBy}} as current sort criteria.',
				sortBy: optionLabel,
			})}
			onSelect={onSelect}
		>
			{optionLabel}
		</MenuItem>
	);
}
SortByItem.propTypes = {
	onSelect: PropTypes.func,
	option: PropTypes.shape({
		id: PropTypes.string,
		name: PropTypes.string,
	}),
	id: PropTypes.string,
	t: PropTypes.func,
};

function SelectSortBy({ field, id, isDescending, onChange, options, t }) {
	const order = isDescending || false;
	const selected = field && options.find(item => item.id === field);

	function onChangeField(newField, event) {
		return onChange(event, { field: newField.id, isDescending: order });
	}

	function onChangeOrder(event) {
		return onChange(event, { field: selected.id, isDescending: !order });
	}

	const currentSortByLabel = selected ? selected.name || selected.id : 'N.C';
	const currentSortOrderLabel = order
		? t('LIST_SELECT_SORT_BY_ORDER_DESC', { defaultValue: 'Descending' })
		: t('LIST_SELECT_SORT_BY_ORDER_ASC', { defaultValue: 'Ascending' });
	return (
		<Nav className={theme['tc-list-toolbar-sort-by']}>
			{options.length === 1 ? (
				<li className="navbar-text">{options[0].name}</li>
			) : (
				<NavDropdown
					id={id ? `${id}-by` : randomUUID()}
					title={currentSortByLabel}
					onSelect={onChangeField}
					className={theme['sort-by-items']}
					aria-label={t('LIST_CHANGE_SORT_BY', {
						defaultValue: 'Change sort criteria. Current sort criteria: {{sortBy}}.',
						sortBy: currentSortByLabel,
					})}
				>
					{options.map(option => (
						<SortByItem option={option} key={id} id={id} t={t} />
					))}
				</NavDropdown>
			)}
			{selected && (
				<li>
					<Button
						id={id && `${id}-order-chooser`}
						aria-label={t('LIST_CHANGE_SORT_BY_ORDER', {
							defaultValue: 'Change sort order. Current order: {{sortOrder}}.',
							sortOrder: currentSortOrderLabel,
						})}
						onClick={onChangeOrder}
						bsStyle="link"
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
}

SelectSortBy.propTypes = {
	field: PropTypes.string,
	id: PropTypes.string,
	isDescending: PropTypes.bool,
	onChange: PropTypes.func.isRequired,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			name: PropTypes.string,
		}),
	).isRequired,
	t: PropTypes.func,
};

SelectSortBy.defaultProps = {
	t: getDefaultT(),
};

export default SelectSortBy;
