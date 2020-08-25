import React from 'react';

import Layout from '../components/Layout';

export type ListProps = {
	header?: React.ReactElement<any>;
	nav?: React.ReactElement<any>;
	main?: React.ReactElement<any>;
	aside?: React.ReactElement<any>;
};

const List: React.FC<ListProps> = ({ header, nav, main, aside }: ListProps) => (
	<Layout hasScreenHeight header={header} nav={nav} main={main} aside={aside} />
);

export default List;
