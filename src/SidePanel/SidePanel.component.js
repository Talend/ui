import classNames from 'classnames';
import React from 'react';
import {Button} from 'react-bootstrap';
import LinkDispatcher from '../LinkDispatcher';

/**
 * Checkout the {@link http://talend.github.io/react-cmf-bootstrap/examples/build/#/SidePanel|examples}
 * @param {object} props react props
 */
class SidePanel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {docked: false};
		this.toggleDock = this.toggleDock.bind(this);
	}

	toggleDock() {
		this.setState({docked: !this.state.docked});
	}

	render() {
		const theme = this.props.theme || {};
		const actions = this.props.actions || [];
		const docked = {};
		docked[theme.docked] = this.state.docked;
		const className = classNames(theme.sidePanel, docked);

		return (
			<nav className={className}>
				<Button className={theme.toggleBtn}
				        bsStyle="link"
				        onClick={this.toggleDock}
				        aria-hidden="true"
				        title="Toggle side panel">
					<i className="fa fa-arrow-left"/>
				</Button>
				<ul className="nav nav-pills nav-stacked">
					{actions.map(action => (
						<li key={action}>
							<LinkDispatcher
								action={action}
								icon
								className={theme.sidePanelLink}
							/>
						</li>
					))}
				</ul>
			</nav>
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
