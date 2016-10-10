import React from 'react';
import classNames from 'classnames';
import { api, Icon } from 'react-cmf';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

/**
 * This component show an action creator and dispatch it to redux
 */
class LinkAction extends React.Component {

	/**
	 * @param	{object} props
	 */
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}
	onClick(event) {
		if (this.props.onClick) {
			this.props.onClick(event, this.props, this.context);
		}
	}
	render() {
		const linkCSS = classNames(
			'btn btn-link',
			this.props.className
		);
		let { action, icon } = this.props;
		let label;
		if (action) {
			if (typeof action === 'string') {
				action = api.action.getActionInfo(this.context, action);
			}
			label = action.name;
			if (icon) {
				icon = action.icon;
			}
		}
		let link = (
			<a className={linkCSS} onClick={this.onClick}>
				{icon ? <Icon name={icon} className="fa-fw" /> : null}
				{this.props.hideLabel ? null : <span>{label}</span>}
			</a>
		);
		if (this.props.hideLabel) {
			const tooltip = (<Tooltip>{label}</Tooltip>);
			link = (
				<OverlayTrigger placement="top" overlay={tooltip}>
					{link}
				</OverlayTrigger>
			);
		}
		return link;
	}
}
LinkAction.propTypes = Object.assign(
	{
		action: React.PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.object,
		]),
		icon: React.PropTypes.bool,
		model: React.PropTypes.object,
		onClick: React.PropTypes.func,
		hideLabel: React.PropTypes.bool,
	}, {
		displayMode: React.PropTypes.string,

		active: React.PropTypes.bool,
		count: React.PropTypes.number,

		className: React.PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.object,
		]),
	}
);
LinkAction.contextTypes = {
	router: React.PropTypes.object,
	store: React.PropTypes.object,
	registry: React.PropTypes.object,
};

export default LinkAction;
