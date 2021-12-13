import React from 'react';
import styled from 'styled-components';

export type RowProps = {
	children?: any;
};

const SRow = styled.div.attrs({ className: 'layout__row' })`
	display: flex;
	width: 100%;
	flex-wrap: wrap;
`;

const Row: React.FC<RowProps> = ({ children }) => {
	return <SRow>{children}</SRow>;
};

export default Row;
