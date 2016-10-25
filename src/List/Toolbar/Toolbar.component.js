import React from 'react';
import { MenuItem, Nav, Navbar, ButtonGroup, DropdownButton } from 'react-bootstrap';
import SelectDisplayMode from './SelectDisplayMode';
import SelectSortBy from './SelectSortBy';
import Filter from './Filter';
import Action from '../../Action';
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
	let add;
	if (props.onClickAdd) {
		add = {
			label: 'Add',
			icon: 'fa fa-plus',
			onClick: props.onClickAdd,
		};
	}
	return (
		<Navbar componentClass="div" role="toolbar" fluid>
			{add || props.listActions ? (
				<Nav>
					{add ? (<Action
						className="navbar-btn"
						bsStyle="success"
						{...add}
					/>) : null}
					<ButtonGroup className="navbar-btn">
						{props.listActions ? (
							<DropdownButton id="tc-list-toolbar-add-dropdown" bsStyle="link">
								{props.listActions.map((action, index) => {
									const onClick = e => action.onClick(e, action);
									return (
										<MenuItem
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
			<SelectDisplayMode
				key="1"
				{...displayProps}
			/>
			<SelectSortBy
				key="2"
				{...sortProps}
			/>
			<Filter key="3" {...filterProps} />
		</Navbar>
	);
}

Toolbar.propTypes = Object.assign(
	{
		onClickAdd: React.PropTypes.func,
		listActions: React.PropTypes.arrayOf(
			React.PropTypes.object
		),
	},
	SelectSortBy.propTypes,
	SelectDisplayMode.propTypes,
	Filter.propTypes,
);

export default Toolbar;
