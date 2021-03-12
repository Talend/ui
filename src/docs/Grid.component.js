import styled from 'styled-components';

import tokens from '../tokens';

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(${({ columns = 3 }) => columns}, minmax(25rem, 1fr));
	gap: 2.5rem 5rem;

	@media only screen and (max-width: ${tokens.breakpoints.m}) {
		grid-template-columns: 1fr;
	}
`;

export default Grid;
