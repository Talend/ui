import PropTypes from 'prop-types';
import React from 'react';
import uuid from 'uuid';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

import Icon from '../../../Icon';

import theme from './Pagination.scss';
import getDefaultT from '../../../translate';

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

function Pagination({ id, startIndex, itemsPerPage, totalResults, onChange, t, ...opts }) {
	// eslint-disable-next-line no-console
	console.warn('Warning: Pagination is deprecated and will be removed in the next major version.');
	const { itemsPerPageOptions, paginationIconProps = {} } = opts;
	const {
		first = { name: 'talend-chevron-end' },
		prev = { name: 'talend-chevron-left' },
		next = { name: 'talend-chevron-left', transform: 'rotate-180' },
		last = { name: 'talend-chevron-end', transform: 'rotate-180' },
	} = paginationIconProps;
	const currentPage = Math.ceil(startIndex / itemsPerPage);
	const pagesLength = Math.ceil(totalResults / itemsPerPage);
	const isNavigationShown = itemsPerPage > 0 && pagesLength > 1;
	function onChangeItemsPerPage(value) {
		return onChange(1, value);
	}
	function changePageTo(type) {
		let from;
		switch (type) {
			case FIRST: {
				from = 1;
				break;
			}
			case PREV: {
				from = startIndex - itemsPerPage;
				break;
			}
			case NEXT: {
				from = startIndex + itemsPerPage;
				break;
			}
			case LAST: {
				from = (pagesLength - 1) * itemsPerPage + 1;
				break;
			}
			default:
				return;
		}
		onChange(from, itemsPerPage);
	}
	function getNavigationItems() {
		return [
			<NavItem
				key={FIRST}
				eventKey={FIRST}
				id={id && `${id}-nav-to-first`}
				className="btn-link"
				disabled={startIndex <= 1}
				aria-label={t('LIST_PAGINATION_GOTO_FIRST_PAGE', {
					defaultValue: 'Go to first page.',
				})}
			>
				<Icon {...first} />
			</NavItem>,
			<NavItem
				key={PREV}
				eventKey={PREV}
				id={id && `${id}-nav-to-prev`}
				className="btn-link"
				disabled={startIndex <= 1}
				aria-label={t('LIST_PAGINATION_GOTO_PREVIOUS_PAGE', {
					defaultValue: 'Go to previous page. Current page: {{currentPage}}.',
					currentPage,
				})}
			>
				<Icon {...prev} />
			</NavItem>,
			<li className={theme['page-index']}>
				{currentPage}/{pagesLength}
			</li>,
			<NavItem
				key={NEXT}
				eventKey={NEXT}
				id={id && `${id}-nav-to-next`}
				className="btn-link"
				disabled={startIndex + itemsPerPage > totalResults}
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
				className="btn-link"
				disabled={startIndex + itemsPerPage > totalResults}
				aria-label={t('LIST_PAGINATION_GOTO_LAST_PAGE', {
					defaultValue: 'Go to last page.',
				})}
			>
				<Icon {...last} />
			</NavItem>,
		];
	}
	return (
		<Nav className={theme['tc-pagination']} onSelect={selectedKey => changePageTo(selectedKey)}>
			<NavDropdown
				id={id ? `${id}-size` : uuid.v4()}
				title={getItemsPerPageTitle(itemsPerPage)}
				onSelect={onChangeItemsPerPage}
			>
				{itemsPerPageOptions.map((option, index) => getMenuItem(option, index))}
			</NavDropdown>
			{isNavigationShown && getNavigationItems()}
		</Nav>
	);
}

Pagination.propTypes = {
	id: PropTypes.string,
	startIndex: PropTypes.number,
	itemsPerPage: PropTypes.number,
	totalResults: PropTypes.number.isRequired,
	itemsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
	onChange: PropTypes.func.isRequired,
	t: PropTypes.func,
};

Pagination.defaultProps = {
	itemsPerPage: 5,
	startIndex: 1,
	itemsPerPageOptions: [5, 10, 20, 50],
	t: getDefaultT(),
};

export default Pagination;
