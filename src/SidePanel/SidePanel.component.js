import classNames from 'classnames';
import React from 'react';
import { Button } from 'react-bootstrap';
import LinkDispatcher from '../LinkDispatcher';

/**
 * @param {object} props react props
 * @example
const actions = ['menu:home', 'menu:myarticle', 'menu:archive'];
<SidePanel actions={actions}></SidePanel>
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
		return (
			<div className={theme.sidePanel}>
				<Button onClick={this.toggleDock} bsStyle="link" className={theme.toggleBtn}>x</Button>
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
