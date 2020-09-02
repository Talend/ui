import styled from 'styled-components';

const Grid = styled.div(
	({ columns = 3 }) => `
	display: grid;
	grid-template-columns: repeat(${columns}, 1fr);
	grid-gap: 2rem;
	margin: 5rem 0;
`,
);

export default Grid;
