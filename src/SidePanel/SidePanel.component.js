import classNames from 'classnames';
import React from 'react';
import { Button } from 'react-bootstrap';
import LinkDispatcher from '../LinkDispatcher';

/**
 * Checkout the {@link http://talend.github.io/react-cmf-bootstrap/examples/build/#/SidePanel|examples}
 * @param {object} props react props
 */
class SidePanel extends React.Component {
	constructor(props) {
		super(props);
		this.state = { docked: false };
		this.toggleDock = this.toggleDock.bind(this);
	}
	toggleDock() {
		this.setState({ docked: !this.state.docked });
	}
	render() {
		const theme = this.props.theme || {};
		const actions = this.props.actions || [];
		const iconClass = classNames('fa', {
			'fa-arrow-left': !this.state.docked,
			'fa-arrow-right': this.state.docked,
		});
		return (
			<div className={theme.sidePanel}>
				<Button onClick={this.toggleDock} bsStyle="link" className={theme.toggleBtn}>
					|<i className={iconClass} />
				</Button>
				<div className="btn-group-vertical">
					{actions.map(action => (
						<LinkDispatcher
							key={action}
							action={action}
							icon
							hideLabel={this.state.docked}
							className={theme.sidePanelLink}
						/>
					))}
				</div>
			</div>
		);
	}
}

SidePanel.propTypes = {
	actions: React.PropTypes.arrayOf(
		React.PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.object,
		])
	),
	theme: React.PropTypes.shape({
		sidePanel: React.PropTypes.string,
		sidePanelLink: React.PropTypes.string,
	}),
};

export default SidePanel;
