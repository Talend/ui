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
 * letting the user to choose the file he which to upload.
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
		className: PropTypes.string,
		disabled: PropTypes.bool,
		hideLabel: PropTypes.bool,
		iconPosition: PropTypes.oneOf([LEFT, RIGHT]),
		label: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.element.isRequired]),
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
		if (event.target.files.length > 0) {
			this.props.onChange(event, event.target.files[0]);
			// clear inout value
			event.target.value = null; /* eslint no-param-reassign: ["error", { "props": false }] */
		}
	}

	render() {
		const {
			id,
			bsStyle,
			name,
			className,
			available,
			disabled,
			inProgress,
			hideLabel,
			tooltip,
			tooltipLabel,
			label,
			tooltipPlacement,
			accept,
		} = this.props;
		if (!available) {
			return null;
		}
		const localId = id || uuid.v4();
		const buttonContent = getButtonContent(this.props);
		const labelClasses = classNames(
			`btn btn-${bsStyle}`,
			theme['btn-file'],
			(disabled || inProgress) && 'disabled',
			(hideLabel || !label) && 'btn-icon-only',
		);
		const btn = (
			<span className={className}>
				<input
					onChange={this.handleChange}
					type="file"
					accept={accept}
					name={name}
					id={localId}
					disabled={inProgress || disabled}
					className={classNames(theme['action-file-input'], 'sr-only')}
				/>
				<label htmlFor={localId} className={labelClasses}>
					{buttonContent}
				</label>
			</span>
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
