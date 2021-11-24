import styled from 'styled-components';
import tokens from '../../tokens';

export const Status = styled.span.attrs({
	className: 'status',
})`
	font-weight: ${tokens.fontWeights.semiBold};
	color: var(--t-status-color);

	&,
	.status__icon,
	.status__text {
		display: inline-flex;
		align-items: center;
	}

	.status__icon {
		width: ${tokens.sizes.l};
	}

	.status__text {
		white-space: nowrap;
		margin-left: ${tokens.space.xs};
	}
`;
