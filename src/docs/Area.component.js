import styled from 'styled-components';

import tokens from '../tokens';

const Area = styled.div`
	display: flex;
	flex-basis: 100%;
	align-items: center;
	justify-content: center;
	padding: ${tokens.space.xs};
	min-height: 0;
	font-weight: bold;
	font-size: 2rem;
	color: coral;
	background: cornsilk;
	border: 1px dashed coral;
	border-radius: ${tokens.radii.roundedRadius};
`;

export default Area;
