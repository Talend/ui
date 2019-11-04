import PropTypes from 'prop-types';
import React from 'react';
import { ButtonGroup, OverlayTrigger } from 'react-bootstrap';
import classNames from 'classnames';
import Action from './Actions/Action';
import Inject from '../Inject';

function getButtonGroupProps(props) {
	const buttonGroupProps = {};
	Object.keys(ButtonGroup.propTypes).forEach(id => {
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
function Actions({ getComponent, ...props }) {
	const buttonGroupProps = getButtonGroupProps(props);
	const Renderers = Inject.getAll(getComponent, { Action });
	return (
		<ButtonGroup className={classNames('tc-actions', props.className)} {...buttonGroupProps}>
			{props.actions.map((action, index) => {
				const params = {
					key: index,
					hideLabel: props.hideLabel,
					link: props.link,
					tooltipPlacement: props.tooltipPlacement,
					...action,
				};

				return <Renderers.Action {...params} />;
			})}
		</ButtonGroup>
	);
}

Actions.displayName = 'Actions';

Actions.propTypes = {
	actions: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.shape(Action.propTypes)])),
	className: PropTypes.string,
	hideLabel: PropTypes.bool,
	tooltipPlacement: OverlayTrigger.propTypes.placement,
	link: PropTypes.bool,
	...ButtonGroup.propTypes,
};

Actions.defaultProps = {
	actions: [],
	renderers: {
		Action,
	},
};

export default Actions;
