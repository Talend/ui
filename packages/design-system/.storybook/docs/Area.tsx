import styled from 'styled-components';
import tokens from '@talend/design-tokens';

const Area = styled.div`
	display: flex;
	flex-basis: 100%;
	align-items: center;
	justify-content: center;
	margin: ${tokens.coralSizeXs} ${tokens.coralSizeM};
	padding: ${tokens.coralSizeXs};
	min-height: 0;
	font-weight: bold;
	font-size: 2rem;
	color: coral;
	background: cornsilk;
	border: 1px dashed coral;
	border-radius: ${tokens.coralRadiusS};
`;

export default Area;
