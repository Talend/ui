import styled from 'styled-components';

import tokens from '../../../deprecatedTokens';

export const Buttons = styled.div`
	display: flex;
	justify-content: flex-end;
	padding: ${tokens.space.xl} ${tokens.space.none};

	> button + button,
	> span + span {
		margin-left: ${tokens.space.m};
	}

	button:first-child,
	span:first-child {
		margin-left: 0;
		margin-right: auto;
	}
`;
