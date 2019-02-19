import PropTypes from 'prop-types';
import React from 'react';
import uuid from 'uuid';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { translate } from 'react-i18next';

import { ListContext } from '../context';
import Icon from '../../Icon';
import getDefaultT from '../../translate';
import I18N_DOMAIN_COMPONENTS from '../../constants';

import theme from './Pagination.scss';

const FIRST = 'first';
const PREV = 'prev';
const NEXT = 'next';
const LAST = 'last';

function getItemsPerPageTitle(option) {
	if (option > 0) {
		return option;
	}
	return 'All';
}

function getMenuItem(option, index) {
	return (
		<MenuItem key={index} eventKey={option}>
			{getItemsPerPageTitle(option)}
		</MenuItem>
	);
}

function Pagination({ id, currentPage, itemsPerPage, nbItems, onChange, t, ...opts }) {
	const { itemsPerPageOptions, paginationIconProps = {} } = opts;
	const {
		first = { name: 'talend-chevron-end' },
		prev = { name: 'talend-chevron-left' },
		next = { name: 'talend-chevron-left', transform: 'rotate-180' },
		last = { name: 'talend-chevron-end', transform: 'rotate-180' },
	} = paginationIconProps;
	const nbPages = Math.ceil(nbItems / itemsPerPage);

	function changeItemsPerPage(value) {
		if (value !== itemsPerPage) {
			onChange(null, { currentPage: 1, itemsPerPage: value });
		}
	}

	function changePage(type) {
		let nextCurrent;
		switch (type) {
			case FIRST: {
				nextCurrent = 1;
				break;
			}
			case PREV: {
				nextCurrent = currentPage - 1;
				break;
			}
			case NEXT: {
				nextCurrent = currentPage + 1;
				break;
			}
			case LAST: {
				nextCurrent = nbPages;
				break;
			}
			default:
				return;
		}
		onChange(null, { currentPage: nextCurrent, itemsPerPage });
	}

	return (
		<Nav className={theme['tc-pagination']} onSelect={changePage}>
			<Navbar.Text>
				<label htmlFor={id}>{t('LIST_TOOLBAR_PAGINATION_SHOW', { defaultValue: 'Show:' })}</label>
			</Navbar.Text>
			<NavDropdown
				id={id ? `${id}-size` : uuid.v4()}
				title={getItemsPerPageTitle(itemsPerPage)}
				onSelect={changeItemsPerPage}
			>
				{itemsPerPageOptions.map((option, index) => getMenuItem(option, index))}
			</NavDropdown>
			{itemsPerPage > 0 &&
				nbPages > 1 && [
					<NavItem
						key={FIRST}
						eventKey={FIRST}
						id={id && `${id}-nav-to-first`}
						className={'btn-link'}
						disabled={currentPage === 1}
						aria-label={t('LIST_PAGINATION_GOTO_FIRST_PAGE', { defaultValue: 'Go to first page.' })}
					>
						<Icon {...first} />
					</NavItem>,
					<NavItem
						key={PREV}
						eventKey={PREV}
						id={id && `${id}-nav-to-prev`}
						className={'btn-link'}
						disabled={currentPage === 1}
						aria-label={t('LIST_PAGINATION_GOTO_PREVIOUS_PAGE', {
							defaultValue: 'Go to previous page. Current page: {{currentPage}}.',
							currentPage,
						})}
					>
						<Icon {...prev} />
					</NavItem>,
					<li className={theme['page-index']}>
						{currentPage}/{nbPages}
					</li>,
					<NavItem
						key={NEXT}
						eventKey={NEXT}
						id={id && `${id}-nav-to-next`}
						className={'btn-link'}
						disabled={currentPage === nbPages}
						aria-label={t('LIST_PAGINATION_GOTO_NEXT_PAGE', {
							defaultValue: 'Go to next page. Current page: {{currentPage}}.',
							currentPage,
						})}
					>
						<Icon {...next} />
					</NavItem>,
					<NavItem
						key={LAST}
						eventKey={LAST}
						id={id && `${id}-nav-to-last`}
						className={'btn-link'}
						disabled={currentPage === nbPages}
						aria-label={t('LIST_PAGINATION_GOTO_LAST_PAGE', { defaultValue: 'Go to last page.' })}
					>
						<Icon {...last} />
					</NavItem>,
				]}
		</Nav>
	);
}

Pagination.propTypes = {
	id: PropTypes.string,
	currentPage: PropTypes.number,
	itemsPerPage: PropTypes.number,
	nbItems: PropTypes.number.isRequired,
	itemsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
	onChange: PropTypes.func.isRequired,
	t: PropTypes.func.isRequired,
};

Pagination.defaultProps = {
	currentPage: 1,
	itemsPerPage: 5,
	itemsPerPageOptions: [5, 10, 20, 50],
	t: getDefaultT(),
};

function ContextualPagination(props) {
	return (
		<ListContext.Consumer>
			{({ nbItems, onPageChange, page }) => (
				<Pagination onChange={onPageChange} nbItems={nbItems} {...page} {...props} />
			)}
		</ListContext.Consumer>
	);
}
ContextualPagination.displayName = 'ListContext(List.Pagination)';

export default translate(I18N_DOMAIN_COMPONENTS)(ContextualPagination);
