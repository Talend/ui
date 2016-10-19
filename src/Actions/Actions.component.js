import React from 'react';
import {
	ButtonGroup,
	Button,
	OverlayTrigger,
	Tooltip,
} from 'react-bootstrap';

function renderAction(props, index) {
	const {
		hideLabel,
		placement,
		onClick,
		link,
		...action,
	} = props;
	const rClick = event => onClick(action, event);
	let bsStyle = props.bsStyle;
	if (!bsStyle) {
		if (link) {
			bsStyle = 'link';
		} else {
			bsStyle = 'default';
		}
	}
	let btn = (
		<Button
			onClick={rClick}
			bsStyle={bsStyle}
			key={hideLabel ? null : index}
			role={link ? 'link' : null}
		>
			{action.icon ? <i className={action.icon} /> : null}
			{hideLabel ? null : <span>{action.label}</span>}
		</Button>
	);
	if (hideLabel) {
		const tooltip = (<Tooltip>{action.label}</Tooltip>);
		btn = (
			<OverlayTrigger placement={placement || 'top'} overlay={tooltip} key={index}>
				{btn}
			</OverlayTrigger>
		);
	}
	return btn;
}

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
			{props.actions.map((action, index) => renderAction({
				hideLabel: props.hideLabel,
				placement: props.placement,
				link: props.link,
				...action,
			}, index))}
		</ButtonGroup>);
}

Actions.propTypes = {
	actions: React.PropTypes.array,
	hideLabel: React.PropTypes.bool,
	placement: OverlayTrigger.propTypes.placement,
	link: React.PropTypes.bool,
	...ButtonGroup.propTypes,
};

export default Actions;
