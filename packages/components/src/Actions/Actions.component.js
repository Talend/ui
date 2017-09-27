import PropTypes from 'prop-types';
import React from 'react';
import { ButtonGroup } from 'react-bootstrap';
import classNames from 'classnames';
import Action from './Action';
import ActionDropdown from './ActionDropdown';
import ActionSplitDropdown from './ActionSplitDropdown';


const TYPE_DROPDOWN = 'dropdown';
const TYPE_SPLIT_DROPDOWN = 'splitDropdown';


function getButtonGroupProps(props) {
	const buttonGroupProps = {};
	Object.keys(ButtonGroup.propTypes).forEach((id) => {
		if (props[id] !== undefined) {
			buttonGroupProps[id] = props[id];
		}
	});
	return buttonGroupProps;
}

function getActionComponent(displayMode) {
	switch (displayMode) {
		case TYPE_DROPDOWN:
			return ActionDropdown;
		case TYPE_SPLIT_DROPDOWN:
			return ActionSplitDropdown;
		default:
			return Action;
	}
}

/**
 * @param {object} props react props
 * @example
const actions: [
    {
		label: 'edit',
		icon: 'fa fa-edit',
		onClick: action('onEdit'),
	},
    {
		label: 'delete',
		icon: 'fa fa-trash-o',
		onClick: action('onDelete'),
	},
    {
		displayMode: 'dropdown',
		label: 'related items',
		icon: 'fa fa-file-excel-o',
		items: [
			{
				label: 'document 1',
				onClick: action('document 1 click'),
			},
			{
				label: 'document 2',
				onClick: action('document 2 click'),
			},
		],
	},
	{
		id: 'split-dropdown-id',
		displayMode: 'splitDropdown',
		label: 'add file',
		onClick: action('onClick'),
		items: [
			{
				label: 'file 1',
				onClick: action('file 1 click'),
			},
			{
				label: 'file 2',
				onClick: action('file 2 click'),
			},
		],
	},
 ];
 <Actions actions={actions} tooltipPlacement="right" hideLabel link />
 */
function Actions(props) {
	const buttonGroupProps = getButtonGroupProps(props);

	return (
		<ButtonGroup
			className={classNames('tc-actions', props.className)}
			{...buttonGroupProps}
		>
			{props.actions.map((action, index) => {
				const { displayMode, ...rest } = action;
				const ActionComponent = getActionComponent(displayMode);
				const params = {
					key: index,
					hideLabel: props.hideLabel,
					link: props.link,
					tooltipPlacement: props.tooltipPlacement,
					...rest,
				};

				return <ActionComponent {...params} />;
			})}
		</ButtonGroup>
	);
}

Actions.propTypes = {
	actions: PropTypes.arrayOf(
		PropTypes.oneOfType([
			PropTypes.shape(Action.propTypes),
			PropTypes.shape({
				displayMode: PropTypes.oneOf([TYPE_DROPDOWN, TYPE_SPLIT_DROPDOWN]),
			}),
		]),
	),
	className: PropTypes.string,
	hideLabel: PropTypes.bool,
	tooltipPlacement: Action.propTypes.tooltipPlacement,
	link: PropTypes.bool,
	...ButtonGroup.propTypes,
};

Actions.defaultProps = {
	actions: [],
};

export default Actions;
