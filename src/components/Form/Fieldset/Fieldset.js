import React from 'react';
import styled from 'styled-components';

const StyledFieldset = styled.fieldset(
	({ theme }) => `
	display: flex;
	flex-direction: column;
	padding: 2rem;
`,
);

const StyledLegend = styled.legend(
	({ theme }) => `
	color: ${theme.colors.textColor};
`,
);

function Fieldset({ legend, children }) {
	return (
		<StyledFieldset>
			<StyledLegend>{legend}</StyledLegend>
			{children}
		</StyledFieldset>
	);
}

export default Fieldset;
