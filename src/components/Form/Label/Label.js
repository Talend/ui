import React from 'react';
import styled from 'styled-components';

import tokens from '../../../tokens';

const StyledLabel = styled.label`
	font-size: ${tokens.fontSizes.small};
	font-weight: ${tokens.fontWeights.semiBold};
`;

function Label(props) {
	return <StyledLabel {...props} />;
}

export default Label;
