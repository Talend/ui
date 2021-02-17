import React, { PropsWithChildren } from 'react';

import Layout from '../components/Layout';

export type ListProps = PropsWithChildren<any> & {
	header?: React.ReactElement<any>;
	nav?: React.ReactElement<any>;
	aside?: React.ReactElement<any>;
};

const List: React.FC<ListProps> = ({ header, nav, children, aside }: ListProps) => (
	<Layout hasScreenHeight header={header} nav={nav} aside={aside}>
		{children}
	</Layout>
);

export default List;
