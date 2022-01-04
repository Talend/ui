import React from 'react';

import Header from './blocks/HeaderBar';
import Menu from './blocks/Menu';

import Template from '../templates';

interface Props {
	aside?: React.ReactElement;
}

const Home = (props: Props) => <Template.List header={<Header />} nav={<Menu />} {...props} />;

export default Home;
