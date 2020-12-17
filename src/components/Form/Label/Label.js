import React from 'react';
import styled from 'styled-components';

import tokens from '../../../tokens';

const StyledLabel = styled.label(
	({ theme }) => `
    font-size: ${tokens.fontSizes.small};
`,
);

function Label(props) {
	return <StyledLabel {...props} />;
}

export default Label;
