import React from 'react';
import styled from 'styled-components';

import tokens from '../../../tokens';

const StyledLabel = styled.label(
	({ theme }) => `
    font-size: ${tokens.fontSize.small};
`,
);

function Label(props) {
	return <StyledLabel {...props} />;
}

export default Label;
