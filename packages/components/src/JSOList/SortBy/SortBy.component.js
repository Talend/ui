import React from 'react';
import PropTypes from 'prop-types';
import { NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import uuid from 'uuid';
import { translate } from 'react-i18next';

import { ListContext } from '../context';
import getDefaultT from '../../translate';
import I18N_DOMAIN_COMPONENTS from '../../constants';
import theme from './SortBy.scss';

class SortBy extends React.Component {
	static propTypes = {
		sortBy: PropTypes.string,
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
	static defaultProps = {
		id: uuid.v4(),
		isDescending: false,
		t: getDefaultT(),
	};

	constructor(props) {
		super(props);
		this.onFieldChange = this.onFieldChange.bind(this);
		this.onOrderChange = this.onOrderChange.bind(this);
	}

	onFieldChange(field, event) {
		return this.props.onChange(event, {
			sortBy: field.id,
			isDescending: this.props.isDescending,
		});
	}

	onOrderChange(event) {
		return this.props.onChange(event, {
			sortBy: this.props.sortBy,
			isDescending: !this.props.isDescending,
		});
	}

	render() {
		const { sortBy, id, isDescending, options, t } = this.props;

		const selected = sortBy && options.find(item => item.id === sortBy);
		const currentSortByLabel = (selected && selected.name) || sortBy || 'N.C';
		const currentSortOrderLabel = isDescending
			? t('LIST_SELECT_SORT_BY_ORDER_DESC', { defaultValue: 'Descending' })
			: t('LIST_SELECT_SORT_BY_ORDER_ASC', { defaultValue: 'Ascending' });

		return (
			<Nav className={theme['tc-list-toolbar-sort-by']}>
				{options.length === 1 ? (
					<li className="navbar-text">{options[0].name}</li>
				) : (
					<NavDropdown
						id={id}
						className={theme['sort-by-items']}
						onSelect={this.onFieldChange}
						title={currentSortByLabel}
						aria-label={t('LIST_CHANGE_SORT_BY', {
							defaultValue: 'Change sort criteria. Current sort by {{sortBy}}.',
							sortBy: currentSortByLabel,
						})}
					>
						{options.map(option => (
							<MenuItem
								id={`${id}-sortBy-${option.id}`}
								key={option.id}
								eventKey={option}
								aria-label={t('LIST_SELECT_SORT_BY', {
									defaultValue: 'Select {{sortBy}} as current sort criteria.',
									sortBy: option.name || option.id,
								})}
							>
								{option.name || option.id}
							</MenuItem>
						))}
					</NavDropdown>
				)}
				{selected && (
					<NavItem
						id={id && `${id}-order`}
						onClick={this.onOrderChange}
						aria-label={t('LIST_CHANGE_SORT_BY_ORDER', {
							defaultValue: 'Change sort order. Current order: {{sortOrder}}.',
							sortOrder: currentSortOrderLabel,
						})}
					>
						{currentSortOrderLabel}
					</NavItem>
				)}
			</Nav>
		);
	}
}

function ContextualSortBy(props) {
	return (
		<ListContext.Consumer>
			{({ displayMode, sortBy, sortDescending, onSortChange }) => {
				if (displayMode === 'table') {
					return null;
				}
				return (
					<SortBy
						sortBy={sortBy}
						isDescending={sortDescending}
						onChange={onSortChange}
						{...props}
					/>
				);
			}}
		</ListContext.Consumer>
	);
}
ContextualSortBy.displayName = 'ListContext(List.SortBy)';

export default translate(I18N_DOMAIN_COMPONENTS)(ContextualSortBy);
