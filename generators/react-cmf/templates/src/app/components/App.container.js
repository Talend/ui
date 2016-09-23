import React from 'react';

const App = (props) => (
	<div>
		<h1>Hello</h1>
		{props.children}
	</div>
);
App.propTypes = {
	//store: React.PropTypes.object.isRequired,
};

export default App;
