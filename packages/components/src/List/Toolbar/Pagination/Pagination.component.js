import React from 'react';
import classNames from 'classnames';
import uuid from 'uuid';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

import Icon from '../../../Icon';

import css from './Pagination.scss';

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
	return (<MenuItem key={index} eventKey={option}>
		{getItemsPerPageTitle(option)}
	</MenuItem>);
}

function Pagination({ id, startIndex, itemsPerPage, totalResults, onChange, ...opts }) {
	const { itemsPerPageOptions, paginationIconProps = {} } = opts;
	const {
		first = { name: 'fa fa-backward' },
		prev = { name: 'fa fa-play', transform: 'rotate-180' },
		next = { name: 'fa fa-play' },
		last = { name: 'fa fa-forward' },
	} = paginationIconProps;
	const currentPage = Math.ceil(startIndex / itemsPerPage);
	const pagesLength = Math.ceil(totalResults / itemsPerPage);
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
			from = (pagesLength * (itemsPerPage - 1)) + 1;
			break;
		}
		default:
			return;
		}
		onChange(from, itemsPerPage);
	}
	return (
		<Nav onSelect={selectedKey => changePageTo(selectedKey)}>
			<NavDropdown
				id={id ? `${id}-size` : uuid.v4()}
				title={getItemsPerPageTitle(itemsPerPage)}
				onSelect={onChangeItemsPerPage}
			>
				{itemsPerPageOptions.map((option, index) => getMenuItem(option, index))}
			</NavDropdown>
			{itemsPerPage > 0 && (
				<NavItem
					eventKey={FIRST}
					id={id && `${id}-nav-to-first`}
					className="btn-link"
					disabled={startIndex === 1}
				>
					<Icon {...first} />
				</NavItem>
			)}
			{itemsPerPage > 0 && (
				<NavItem
					eventKey={PREV}
					id={id && `${id}-nav-to-prev`}
					className={classNames('btn-link', css['tc-pagination-ctrl-prev'], 'tc-pagination-ctrl-prev')}
					disabled={startIndex === 1}
				>
					<Icon {...prev} />
				</NavItem>
			)}
			{itemsPerPage > 0 && (
				<NavItem disabled>
					<span className="btn-link">{currentPage}/{pagesLength}</span>
				</NavItem>
			)}
			{itemsPerPage > 0 && (
				<NavItem
					eventKey={NEXT}
					id={id && `${id}-nav-to-next`}
					className="btn-link"
					disabled={startIndex + itemsPerPage > totalResults}
				>
					<Icon {...next} />
				</NavItem>
			)}
			{itemsPerPage > 0 && (
				<NavItem
					eventKey={LAST}
					id={id && `${id}-nav-to-last`}
					className="btn-link"
					disabled={startIndex + itemsPerPage > totalResults}
				>
					<Icon {...last} />
				</NavItem>
			)}
		</Nav>
	);
}

Pagination.propTypes = {
	id: React.PropTypes.string,
	startIndex: React.PropTypes.number,
	itemsPerPage: React.PropTypes.number,
	totalResults: React.PropTypes.number.isRequired,
	itemsPerPageOptions: React.PropTypes.arrayOf(React.PropTypes.number),
	onChange: React.PropTypes.func.isRequired,
};

Pagination.defaultProps = {
	itemsPerPage: 5,
	startIndex: 1,
	itemsPerPageOptions: [5, 10, 20, 50],
};

export default Pagination;
