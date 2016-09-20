import React from 'react';
import { connect } from 'react-redux';
import { AppHeaderBar, SidePanel } from 'react-cmf-bootstrap';
import theme from './App.scss';

const mapStateToProps = (state) => state.cmf.settings.views.appmenu || {};
const Menu = connect(
  mapStateToProps
)(AppHeaderBar);

const ConnectedSidePanel = connect(
	(state) => state.cmf.settings.views.sidePanel || {}
)(SidePanel)

const App = (props) => (
	<div>
		<Menu />
		<div className={theme.container}>
			<ConnectedSidePanel />
			<div className={theme.main}>
				{props.children}
			</div>
		</div>
	</div>
);
App.propTypes = {
	//store: React.PropTypes.object.isRequired,
};

export default App;
