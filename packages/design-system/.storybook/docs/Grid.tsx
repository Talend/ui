import styled from 'styled-components';
import tokens from '@talend/design-tokens';

const Grid = styled.div<{ columns?: number }>`
	display: grid;
	grid-template-columns: repeat(${({ columns = 3 }) => columns}, minmax(0, 1fr));
	gap: 2.5rem 5rem;

	@media only screen and (max-width: ${tokens.coralBreakpointM}) {
		grid-template-columns: 1fr;
	}
`;

export default Grid;
