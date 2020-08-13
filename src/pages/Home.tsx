import React from 'react';
import Layout from '../components/Layout';
import Header from '../components/Layout/Header';
import Menu from '../components/Layout/Menu';

const Home = () => (
	<Layout
		hasScreenHeight
		header={<Header />}
		nav={
			<Menu>
				<Menu.Item iconBefore="information" href="#A" active>
					Link A
				</Menu.Item>
				<Menu.Item iconBefore="warning" href="#B">
					Link B
				</Menu.Item>
				<Menu.Item iconBefore="cross" href="#C">
					Link C
				</Menu.Item>
			</Menu>
		}
		main={null}
	/>
);

export default Home;
