import styled from 'styled-components';

import tokens from '../tokens';

const Grid = styled.div(
	({ columns = 3 }) => `
	display: grid;
    grid-template-columns: repeat(${columns}, minmax(25rem, 1fr));
    grid-gap: 2rem;

    @media only screen and (max-width: ${tokens.breakpoints.l}) {
        grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
    }
`,
);

export default Grid;
