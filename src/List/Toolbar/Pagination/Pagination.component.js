import React, { PropTypes } from 'react';
import classNames from 'classnames';
import uuid from 'uuid';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import Icon from '../../../Icon';

import css from './Pagination.scss';
/**
 * @param {object} props react props
 * @example
 <Pagination {...props}></Pagination>
 */

function Pagination({ id, itemsLength, sizeOptions, pageSize, activePage, onChangePagination }) {
	let realPageSize = pageSize;
	if (!pageSize || sizeOptions.indexOf(pageSize) < 0) {
		realPageSize = sizeOptions[0];
	}
	const total = Math.ceil(itemsLength / realPageSize);

	const changeSize = (value) => {
		onChangePagination(0, value);
	};

	const NEXT = 'next';
	const PREV = 'prev';
	const FIRST = 'first';
	const LAST = 'last';

	const navTo = (type) => {
		let from = activePage;
		switch (type) {
		case PREV: {
			if (from === 0) {
				return;
			}
			from -= 1;
			break;
		}
		case NEXT: {
			if (from === total - 1) {
				return;
			}
			from += 1;
			break;
		}
		case FIRST: {
			if (from === 0) {
				return;
			}
			from = 0;
			break;
		}
		case LAST: {
			if (from === total - 1) {
				return;
			}
			from = total - 1;
			break;
		}
		default:
			return;
		}
		onChangePagination(from * realPageSize, realPageSize);
	};
	const paginationSizeId = id && `${id}-pagination-size`;
	return (
		<Nav onSelect={selectedKey => navTo(selectedKey)}>
			<NavDropdown
				id={paginationSizeId || uuid.v4()}
				title={realPageSize}
				onSelect={changeSize}
			>
				{sizeOptions.map((option, index) => (
					<MenuItem key={index} eventKey={option}>{option}</MenuItem>
				))}
			</NavDropdown>
			<NavItem
				eventKey={FIRST}
				id={id && `${id}-nav-to-first`}
				className="btn-link"
				disabled={activePage === 0}
			>
				<Icon name="fa fa-backward" />
			</NavItem>
			<NavItem
				eventKey={PREV}
				id={id && `${id}-nav-to-prev`}
				className={classNames('btn-link', css['tc-pagination-ctrl-prev'], 'tc-pagination-ctrl-prev')}
				disabled={activePage === 0}
			>
				<Icon name="fa fa-play" />
			</NavItem>
			<NavItem disabled>
				<span className="btn-link">{activePage + 1}/{total}</span>
			</NavItem>
			<NavItem
				eventKey={NEXT}
				id={id && `${id}-nav-to-next`}
				className="btn-link"
				disabled={activePage === (total - 1)}
			>
				<Icon name="fa fa-play" />
			</NavItem>
			<NavItem
				eventKey={LAST}
				id={id && `${id}-nav-to-last`}
				className="btn-link"
				disabled={activePage === (total - 1)}
			>
				<Icon name="fa fa-forward" />
			</NavItem>
		</Nav>
	);
}

Pagination.propTypes = {
	id: PropTypes.string,
	activePage: PropTypes.number,
	itemsLength: PropTypes.number.isRequired,
	onChangePagination: PropTypes.func.isRequired,
	pageSize: PropTypes.number,
	sizeOptions: PropTypes.arrayOf(PropTypes.number),
};

Pagination.defaultProps = {
	activePage: 0,
	sizeOptions: [5, 10, 20, 50],
};

export default Pagination;
