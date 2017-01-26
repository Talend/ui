import React, { PropTypes } from 'react';
import { ButtonGroup } from 'react-bootstrap';
import Action from './Action';
import ActionDropdown from './ActionDropdown';

const TYPE_DROPDOWN = 'dropdown';

function getButtonGroupProps(props) {
	const buttonGroupProps = {};
	Object.keys(ButtonGroup.propTypes).forEach((id) => {
		if (props[id] !== undefined) {
			buttonGroupProps[id] = props[id];
		}
	});
	return buttonGroupProps;
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
	}
 ];
<Actions actions={actions} tooltipPlacement="right" hideLabel link />
 */
function Actions(props) {
	const buttonGroupProps = getButtonGroupProps(props);
	return (
		<ButtonGroup className="tc-actions" {...buttonGroupProps}>
			{props.actions.map((action, index) => {
				const { displayMode, ...rest } = action;
				switch (displayMode) {
				case TYPE_DROPDOWN:
					return (
						<ActionDropdown
							hideLabel={props.hideLabel}
							key={index}
							link={props.link}
							tooltipPlacement={props.tooltipPlacement}
							{...rest}
						/>
					);
				default:
					return (
						<Action
							hideLabel={props.hideLabel}
							key={index}
							link={props.link}
							tooltipPlacement={props.tooltipPlacement}
							{...rest}
						/>
					);
				}
			})}
		</ButtonGroup>
	);
}

Actions.propTypes = {
	actions: PropTypes.arrayOf(
		PropTypes.oneOfType([
			PropTypes.shape(Action.propTypes),
			PropTypes.shape({
				displayMode: PropTypes.oneOf([TYPE_DROPDOWN]),
				...ActionDropdown.propTypes,
			}),
		])
	),
	hideLabel: PropTypes.bool,
	tooltipPlacement: Action.propTypes.tooltipPlacement,
	link: PropTypes.bool,
	...ButtonGroup.propTypes,
};

Actions.defaultProps = {
	actions: [],
};

export default Actions;
