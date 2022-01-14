import styled from 'styled-components';

const Grid = styled.div<{ columns?: number }>`
	display: grid;
	grid-template-columns: repeat(
		auto-fit,
		minmax(${({ columns = 3 }) => Math.floor(100 / columns) - 10}rem, 1fr)
	);
	gap: 2.5rem 5rem;
`;

export default Grid;
