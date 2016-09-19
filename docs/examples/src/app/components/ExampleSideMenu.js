import React from 'react';
import { SideMenu } from 'react-cmf-bootstrap';

function ExampleSideMenu(props) {
	return (
		<div>
			<h1>Example with one action</h1>
			<SideMenu actions={['menu:SideMenu']}/>
		</div>
	);
}

export default ExampleSideMenu;
