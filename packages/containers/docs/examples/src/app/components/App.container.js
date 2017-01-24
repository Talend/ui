import React from 'react';
import { connect } from 'react-redux';
import { AppHeaderBar, SidePanel } from 'react-talend-containers';
import theme from './App.scss';

const ConnectedSidePanel = connect(
	(state) => state.cmf.settings.views.sidePanel || {}
)(SidePanel);

const App = (props) => (
	<div>
		<AppHeaderBar />
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
