import React from 'react';
import styled from 'styled-components';

const StyledLabel = styled.label(
	({ theme }) => `
    font-size: 1.2rem;
`,
);

function Label(props) {
	return <StyledLabel {...props} />;
}

export default Label;
