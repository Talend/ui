import React from 'react';
import { MenuItem, Nav, Navbar, ButtonGroup, DropdownButton } from 'react-bootstrap';
import uuid from 'uuid';
import SelectDisplayMode from './SelectDisplayMode';
import SelectSortBy from './SelectSortBy';
import Pagination from './Pagination';
import Filter from './Filter';
import Action from '../../Actions/Action';
import Icon from '../../Icon';

export function getSubProps(props, component) {
	const subProps = {};
	Object.keys(component.propTypes)
		.filter(key => props[key] !== undefined)
		.forEach((key) => {
			subProps[key] = props[key];
		});
	return subProps;
}

/**
 * @param {object} props react props
 * @example
<Toolbar name="Hello world"></Toolbar>
 */
function Toolbar(props) {
	const displayProps = getSubProps(props, SelectDisplayMode);
	const sortProps = getSubProps(props, SelectSortBy);
	const filterProps = getSubProps(props, Filter);
	const paginationProps = getSubProps(props, Pagination);
	const { id, listActions, onClickAdd } = props;
	let add;
	if (onClickAdd) {
		add = {
			id: id && `${id}-add-btn`,
			label: 'Add',
			icon: 'fa fa-plus',
			onClick: onClickAdd,
		};
	}
	const dropdownId = id && `${id}-actions-dropdown`;
	return (
		<Navbar componentClass="div" role="toolbar" fluid>
			{add || listActions ? (
				<Nav>
					{add ? (<Action
						className="navbar-btn"
						bsStyle="success"
						{...add}
					/>) : null}
					<ButtonGroup className="navbar-btn">
						{listActions ? (
							<DropdownButton
								id={dropdownId || uuid.v4()}
								bsStyle="link"
								title="actions"
							>
								{listActions.map((action, index) => {
									const onClick = e => action.onClick(e, action);
									const actionIdentifier = id && action.label.toLowerCase().split(' ').join('-');
									return (
										<MenuItem
											id={id && `${id}-${index}-actions-${actionIdentifier}`}
											key={index}
											onClick={onClick}
											eventKey={index}
										>
											<Icon name={action.icon} />
											{action.label}
										</MenuItem>
									);
								})}
							</DropdownButton>
						) : null}
					</ButtonGroup>
				</Nav>
			) : null}
			<SelectDisplayMode {...displayProps} />
			<SelectSortBy {...sortProps} />
			<Filter {...filterProps} />
			{
				Object.keys(paginationProps).length > 1 ?
					(<Pagination {...paginationProps} />) :
					null
			}
		</Navbar>
	);
}

Toolbar.propTypes = {
	id: React.PropTypes.string,
	onClickAdd: React.PropTypes.func,
	listActions: React.PropTypes.arrayOf(React.PropTypes.object),
	...Filter.propTypes,
	...SelectDisplayMode.propTypes,
	...SelectSortBy.propTypes,
};

export default Toolbar;
