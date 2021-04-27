import styled, { keyframes } from 'styled-components';

const progress = keyframes`
	0% { width: 0; height: 0; }
`;

export const Progress = styled.div.attrs({
	className: 'progress-bar',
})`
	position: absolute;

	div {
		position: absolute;
		top: 0;
		background: ${({ theme }) => theme.colors?.activeColor[500]};
		animation: ${progress} 1s ease-in-out;
	}
`;
