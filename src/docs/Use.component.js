import React from 'react';
import styled from 'styled-components';

import Grid from './Grid.component';

import icons from '../icons';
import tokens from '../tokens';

const Block = styled(({ title, children, ...rest }) => (
	<div {...rest}>
		<strong>{title}</strong>
		{children}
	</div>
))`
	strong {
		display: flex;
		align-items: center;
	}

	strong:before {
		display: inline-block;
		content: '';
		margin-right: 1ch;
		height: 1.6rem;
		width: 1.6rem;
		font-weight: ${tokens.fontWeights.semiBold};
		mask-repeat: no-repeat;
	}

	padding: 1rem;
	border-radius: ${tokens.radii.rectRadius};
`;

const Do = styled(props => <Block title="Do" {...props} />)`
	strong:before {
		background-color: ${tokens.colors.rioGrande500};
		mask-image: url(${icons.check.default});
	}

	background: ${tokens.colors.rioGrande100};
	box-shadow: 0 0 0.1rem 0.1rem ${tokens.colors.rioGrande500};
`;

const Dont = styled(props => <Block title="Don't" {...props} />)`
	strong:before {
		background-color: ${tokens.colors.coral500};
		mask-image: url(${icons.warning.default});
	}

	background: ${tokens.colors.coral100};
	box-shadow: 0 0 0.1rem 0.1rem ${tokens.colors.coral500};
`;

const Use = ({ children }) => <Grid columns={2}>{children}</Grid>;

Use.Do = Do;
Use.Dont = Dont;

export default Use;
