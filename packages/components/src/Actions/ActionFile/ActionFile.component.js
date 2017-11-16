import PropTypes from 'prop-types';
import React from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import classNames from 'classnames';
import uuid from 'uuid';

import TooltipTrigger from '../../TooltipTrigger';
import CircularProgress from '../../CircularProgress';
import Icon from '../../Icon';
import theme from './ActionFile.scss';

const LEFT = 'left';
const RIGHT = 'right';

function getIcon({ icon, iconTransform, inProgress }) {
	if (inProgress) {
		return <CircularProgress size="small" key="icon" />;
	}

	if (icon) {
		return <Icon name={icon} transform={iconTransform} key="icon" />;
	}

	return null;
}
getIcon.propTypes = {
	icon: PropTypes.string,
	iconTransform: PropTypes.string,
	inProgress: PropTypes.bool,
};

function getLabel({ hideLabel, label }) {
	if (hideLabel) {
		return null;
	}
	return <span key="label">{label}</span>;
}

getLabel.propTypes = {
	label: PropTypes.string,
	hideLabel: PropTypes.bool,
};

function adjustContentPlacement(icon, label, iconPosition) {
	if (iconPosition === RIGHT) {
		return [label, icon];
	}
	return [icon, label];
}

function getButtonContent(props) {
	return adjustContentPlacement(getIcon(props), getLabel(props), props.iconPosition);
}

/**
 * Purpose of this component is to provide a simple direct upload button.
 * When the user click on this component a file picker is open,
 * letting the user to choose the file he wich to upload.
 * When the user select a file, the onChange props is executed and get
 * passed the react syntetic event and the selected file.
 * subsequently the field get emptied.
 * @param {Object} props
 */
class ActionFile extends React.Component {
	static displayName = 'ActionFile';

	static propTypes = {
		...getIcon.propTypes,
		id: PropTypes.string,
		bsStyle: PropTypes.string,
		disabled: PropTypes.bool,
		hideLabel: PropTypes.bool,
		iconPosition: PropTypes.oneOf([LEFT, RIGHT]),
		label: PropTypes.string.isRequired,
		link: PropTypes.bool,
		model: PropTypes.object,
		name: PropTypes.string,
		onChange: PropTypes.func.isRequired,
		tooltipPlacement: OverlayTrigger.propTypes.placement,
		tooltip: PropTypes.bool,
		tooltipLabel: PropTypes.string,
	};

	static defaultProps = {
		available: true,
		bsStyle: 'default',
		tooltipPlacement: 'top',
		inProgress: false,
		disabled: false,
	};

	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(event) {
		event.preventDefault();
		this.props.onChange(event, event.target.files[0]);
		this.form.reset();
	}

	render() {
		const {
			id,
			name,
			available,
			disabled,
			inProgress,
			hideLabel,
			tooltip,
			tooltipLabel,
			label,
			tooltipPlacement,
		} = this.props;
		if (!available) {
			return null;
		}
		const localId = id || uuid.v4();
		const buttonContent = getButtonContent(this.props);
		const labelClasses = classNames(
			'btn',
			theme['btn-file'],
			(disabled || inProgress) && 'disabled',
		);
		const btn = (
			<form
				ref={form => {
					this.form = form;
				}}
			>
				<input
					onChange={this.handleChange}
					type="file"
					name={name}
					id={localId}
					disabled={inProgress || disabled}
					className={theme['action-file-label']}
				/>
				<label htmlFor={localId} className={labelClasses}>
					{buttonContent}
				</label>
			</form>
		);
		if (hideLabel || tooltip || tooltipLabel) {
			return (
				<TooltipTrigger label={tooltipLabel || label} tooltipPlacement={tooltipPlacement}>
					{btn}
				</TooltipTrigger>
			);
		}
		return btn;
	}
}

export default ActionFile;
