import React, { ReactElement } from 'react';
import styled from 'styled-components';
import tokens from '@talend/design-tokens';

import Link from './Link';

const UL = styled.ul.attrs({
	role: 'list',
})`
	position: fixed;
	top: 40px;
	left: calc(50% - 500px - 170px);
	padding: 10px;
	width: 150px;
	z-index: 9999;
	transition: all 0.3s ease-in;
	display: flex;
	gap: ${tokens.coralSizeXxs};
	flex-direction: column;
	align-items: end;
`;

const StatusList = ({ children }: React.PropsWithChildren<any>) => {
	return (
		<UL>
			{children.map((child: ReactElement<typeof Link>, key: number) => (
				<li key={key}>{child}</li>
			))}
		</UL>
	);
};

export default StatusList;
