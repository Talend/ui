import React from 'react';
import styled from 'styled-components';

import { Icon } from './../index';
import Grid from './Grid.component';

import tokens from '../tokens';

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
		margin: 0 ${tokens.space.xs};
	}

	padding: 1rem;
	border-radius: ${tokens.radii.rectRadius};
`;

const Do = styled(props => <Block title="Do" icon="talend-check" {...props} />)`
	background: ${tokens.colors.rioGrande[100]};
	box-shadow: 0 0 0.1rem 0.1rem ${tokens.colors.rioGrande[500]};

	svg {
		fill: ${tokens.colors.rioGrande[500]};
	}
`;

const Dont = styled(props => <Block title="Don't" icon="talend-block" {...props} />)`
	background: ${tokens.colors.coral[100]};
	box-shadow: 0 0 0.1rem 0.1rem ${tokens.colors.coral[500]};

	svg {
		fill: ${tokens.colors.coral[500]};
	}
`;

export const Use = ({ children }) => <Grid columns={2}>{children}</Grid>;

Use.Do = Do;
Use.Dont = Dont;
