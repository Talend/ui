import React, { ReactElement } from 'react';
import styled from 'styled-components';

import tokens from '@talend/design-tokens';
import Link from './Link';

const Toolbar = styled.ul.attrs({
	role: 'list',
})`
	display: inline-flex;
`;

const ToolbarItem = styled.li`
	padding: ${tokens.coralSizeXxs};
	color: ${tokens.coralColorAccentText};
	border: ${tokens.coralBorderSSolid} ${tokens.coralColorAccentBorder};

	&:first-child {
		border-radius: ${tokens.coralRadiusS} 0 0 ${tokens.coralRadiusS};
	}

	&:last-child {
		border-radius: 0 ${tokens.coralRadiusS} ${tokens.coralRadiusS} 0;
	}

	& + & {
		border-left: none;
	}

	&:hover,
	&:focus {
		color: ${tokens.coralColorAccentTextHover};
		background: ${tokens.coralColorAccentBackgroundHover};
	}

	&:active {
		color: ${tokens.coralColorAccentTextActive};
		background: ${tokens.coralColorAccentBackgroundActive};
	}
`;

const StatusToolbar = ({ children }: React.PropsWithChildren<any>) => {
	return (
		<Toolbar>
			{children.map((child: ReactElement<typeof Link>, key: number) => (
				<ToolbarItem key={key}>{child}</ToolbarItem>
			))}
		</Toolbar>
	);
};

export default StatusToolbar;
