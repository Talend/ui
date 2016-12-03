import React, { PropTypes } from 'react';
import classNames from 'classnames';
import uuid from 'uuid';
import { Nav, NavDropdown, MenuItem, ButtonGroup, Button } from 'react-bootstrap';
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
		<Nav>
			<label className="navbar-text" htmlFor={paginationSizeId}>Show:</label>
			<NavDropdown
				id={paginationSizeId || uuid.v4()}
				title={realPageSize}
				onSelect={changeSize}
			>
				{sizeOptions.map((option, index) => (
					<MenuItem key={index} eventKey={option}>{option}</MenuItem>
				))}
			</NavDropdown>
			<ButtonGroup className="navbar-btn">
				<Button
					id={id && `${id}-nav-to-first`}
					bsStyle="link"
					onClick={() => navTo(FIRST)}
					disabled={activePage === 0}
				>
					<Icon name="fa fa-backward" />
				</Button>
				<Button
					id={id && `${id}-nav-to-prev`}
					bsClass={classNames('btn btn-link', css['tc-pagination-ctrl-prev'], 'tc-pagination-ctrl-prev')}
					onClick={() => navTo(PREV)} disabled={activePage === 0}
				>
					<Icon name="fa fa-play" />
				</Button>
				<span className="btn btn-link">{activePage + 1}/{total}</span>
				<Button
					id={id && `${id}-nav-to-next`}
					bsStyle="link"
					onClick={() => navTo(NEXT)} disabled={activePage === (total - 1)}
				>
					<Icon name="fa fa-play" />
				</Button>
				<Button
					id={id && `${id}-nav-to-last`}
					bsStyle="link"
					onClick={() => navTo(LAST)} disabled={activePage === (total - 1)}
				>
					<Icon name="fa fa-forward" />
				</Button>
			</ButtonGroup>
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
