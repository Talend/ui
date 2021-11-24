import styled from 'styled-components';

import tokens from '../../../tokens';

export const Step = styled.div`
	display: inline-flex;
	max-width: 20rem;

	&[data-index]:before {
		content: attr(data-index) '. ';
		margin-right: ${tokens.space.xxs};
	}

	.step__title {
		margin-right: ${tokens.space.s};
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.step__icon {
		flex-shrink: 0;
		display: block;
		height: ${tokens.space.l};
		width: ${tokens.space.l};

		.tc-svg-icon {
			margin-left: ${tokens.space.xxs};
			margin-top: ${tokens.space.xxs};
			background: ${({ theme }) => theme.colors?.backgroundColor};
			border-radius: ${tokens.radii.circleRadius};
			height: ${tokens.sizes.m};
			width: ${tokens.sizes.m};
		}
	}
`;
