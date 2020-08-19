import React from 'react';

import Header from './blocks/HeaderBar';
import Menu from './blocks/Menu';

import Template from '../templates';

const Home = ({ children }) => (
	<Template.Home header={<Header />} nav={<Menu />}>
		{children}
	</Template.Home>
);

export default Home;
