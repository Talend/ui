import React, { PropTypes } from 'react';
import {
	ButtonGroup,
} from 'react-bootstrap';
import Action from '../Action';

/**
 * @param {object} props react props
 * @example
const actions = [
	{
		label: 'Preparations',
		icon: 'fa fa-asterisk',
		onClick: action('Preparations clicked'),
		bsStyle: 'primary'
	},
	{
		label: 'Datasets',
		icon: 'fa fa-file-excel-o',
		onClick: action('Datasets clicked')
	},
	{
		label: 'Favorites',
		icon: 'fa fa-star',
		onClick: action('Favorites clicked')
	},
];
<Actions actions={actions} placement="right" hideLabel link />
 */
function Actions(props) {
	const buttonGroupProps = {};
	Object.keys(ButtonGroup.propTypes).forEach((id) => {
		if (props[id] !== undefined) {
			buttonGroupProps[id] = props[id];
		}
	});
	return (
		<ButtonGroup className="tc-actions" {...buttonGroupProps}>
			{props.actions.map((action, index) => (
				<Action
					hideLabel={props.hideLabel}
					tooltipPlacement={props.tooltipPlacement}
					link={props.link}
					key={index}
					{...action}
				/>
			))}
		</ButtonGroup>);
}

Actions.propTypes = {
	actions: PropTypes.arrayOf(
		PropTypes.object
	),
	hideLabel: PropTypes.bool,
	tooltipPlacement: Action.propTypes.tooltipPlacement,
	link: PropTypes.bool,
	...ButtonGroup.propTypes,
};

export default Actions;
