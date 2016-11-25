import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { Nav, NavDropdown, MenuItem, ButtonGroup, Button } from 'react-bootstrap';
import Icon from '../../../Icon';

import css from './Pagination.scss';
/**
 * @param {object} props react props
 * @example
 <Pagination {...props}></Pagination>
 */

function Pagination({ itemsLength, sizeOptions, pageSize, activePage, onChangePagination, id }) {
	if (!pageSize || sizeOptions.indexOf(pageSize) < 0) {
		pageSize = sizeOptions[0];
	}
	const total = Math.ceil(itemsLength / pageSize);

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
		onChangePagination(from * pageSize, pageSize);
	};
	const context = id ? `${id}-` : '';
	return (
		<Nav>
			<label className="navbar-text" htmlFor={`${context}pagination-size`}>Show:</label>
			<NavDropdown
				id={`${context}pagination-size`}
				title={pageSize}
				onSelect={changeSize}
			>
				{sizeOptions.map((option, index) => (
					<MenuItem key={index} eventKey={option}>{option}</MenuItem>
				))}
			</NavDropdown>
			<ButtonGroup className="navbar-btn">
				<Button
					id={`${context}nav-to-first`}
					bsStyle="link"
					onClick={() => navTo(FIRST)}
					disabled={activePage === 0}
				>
					<Icon name="fa fa-backward" />
				</Button>
				<Button
					id={`${context}nav-to-prev`}
					bsClass={classNames('btn btn-link', css['tc-pagination-ctrl-prev'], 'tc-pagination-ctrl-prev')}
					onClick={() => navTo(PREV)} disabled={activePage === 0}
				>
					<Icon name="fa fa-play" />
				</Button>
				<span className="btn btn-link">{activePage + 1}/{total}</span>
				<Button
					id={`${context}nav-to-next`}
					bsStyle="link"
					onClick={() => navTo(NEXT)} disabled={activePage === (total - 1)}
				>
					<Icon name="fa fa-play" />
				</Button>
				<Button
					id={`${context}nav-to-last`}
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
	itemsLength: PropTypes.number.isRequired,
	sizeOptions: PropTypes.arrayOf(PropTypes.number),
	pageSize: PropTypes.number,
	activePage: PropTypes.number,
	onChangePagination: PropTypes.func.isRequired,
	id: PropTypes.string,
};

Pagination.defaultProps = {
	sizeOptions: [5, 10, 20, 50],
	activePage: 0,
};

export default Pagination;
