import React from 'react';
import Titles from './GridTitles.component';
import Rows from './GridRows.component';

import theme from './Grid.scss';

function Layout({ children }) {
	return <div className={theme.grid}>{children}</div>;
}

function ScrollableLayout({ children }) {
	return <div className={theme.scrollable}>{children}</div>;
}

export default function Grid(props) {
	return (
		<Layout>
			<Titles />
			<ScrollableLayout>
				<Rows />
			</ScrollableLayout>
		</Layout>
	);
}

Grid.Layout = Layout;
Grid.ScrollableLayout = ScrollableLayout;
Grid.Titles = Titles;
Grid.Rows = Rows;
