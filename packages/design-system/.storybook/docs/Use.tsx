import React from 'react';
import styled from 'styled-components';

import tokens from '@talend/design-tokens';
import { Icon } from '../../src';

import Grid from './Grid';

const Block = styled(({ title, icon, children, ...rest }) => (
	<div {...rest}>
		<strong>
			<Icon name={icon} /> {title}
		</strong>
		{children}
	</div>
))`
	strong {
		display: flex;
		align-items: center;
	}

	svg {
		margin: 0 ${tokens.coralSizeXs};
	}

	padding: 1rem;
	border-radius: ${tokens.coralRadiusS};
`;

const Do = styled(props => <Block title="Do" icon="talend-check" {...props} />)`
	background: ${tokens.coralColorSuccessBackgroundWeak};
	box-shadow: 0 0 0.1rem 0.1rem ${tokens.coralColorSuccessBorder};

	svg {
		fill: ${tokens.coralColorSuccessIcon};
	}
`;

const Dont = styled(props => <Block title="Don't" icon="talend-block" {...props} />)`
	background: ${tokens.coralColorDangerBackgroundWeak};
	box-shadow: 0 0 0.1rem 0.1rem ${tokens.coralColorDangerBorder};

	svg {
		fill: ${tokens.coralColorDangerIcon};
	}
`;

export const Use = ({ children }: React.PropsWithChildren<HTMLDivElement>) => (
	<Grid columns={2}>{children}</Grid>
);

Use.Do = Do;
Use.Dont = Dont;
