import React from 'react';

import Header from './blocks/HeaderBar';
import Menu from './blocks/Menu';

import Template from '../templates';

const Home = (props: React.PropsWithChildren<any>) => (
	<Template.List header={<Header />} nav={<Menu />} {...props} />
);

export default Home;
