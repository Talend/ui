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
		accept: PropTypes.string,
		available: PropTypes.bool,
		bsStyle: PropTypes.string,
		className: PropTypes.string,
		disabled: PropTypes.bool,
		hideLabel: PropTypes.bool,
		icon: PropTypes.string,
		iconPosition: PropTypes.oneOf([LEFT, RIGHT]),
		iconTransform: PropTypes.string,
		id: PropTypes.string,
		inProgress: PropTypes.bool,
		label: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.element.isRequired]),
		name: PropTypes.string,
		onChange: PropTypes.func.isRequired,
		tooltipPlacement: OverlayTrigger.propTypes.placement,
		tooltip: PropTypes.bool,
		tooltipLabel: PropTypes.string,
		'data-feature': PropTypes.string,
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
			accept,
			available,
			bsStyle,
			className,
			'data-feature': dataFeature,
			disabled,
			inProgress,
			hideLabel,
			icon,
			iconPosition,
			iconTransform,
			id,
			label,
			name,
			tooltip,
			tooltipLabel,
			tooltipPlacement,
		} = this.props;
		if (!available) {
			return null;
		}
		const localId = id || uuid.v4();
		const iconInstance = inProgress ? (
			<CircularProgress size="small" key="icon" />
		) : (
			icon && <Icon name={icon} transform={iconTransform} key="icon" />
		);
		const labelInstance = hideLabel ? null : <span key="label">{label}</span>;
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
				<label htmlFor={localId} className={labelClasses} data-feature={dataFeature}>
					{iconPosition === RIGHT ? [labelInstance, iconInstance] : [iconInstance, labelInstance]}
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
