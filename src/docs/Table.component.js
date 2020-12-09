import React from 'react';
import styled from 'styled-components';

const StyledTable = styled.table`
	width: 100%;
	border: 1px solid;
	border-collapse: collapse;
	border-radius: 0.4rem;
	text-align: left;
	overflow: hidden;

	thead {
		color: white;
		background: #333;
	}

	th,
	td {
		padding: 1rem 2rem;
		width: 50%;
	}

	tbody tr:nth-child(even) {
		background-color: #efefef99;
	}
`;

function Table({ data }) {
	const entries = Object.entries(data);

	if (!entries.length) {
		return null;
	}

	return (
		<StyledTable>
			<thead>
				<tr>
					<th>Name</th>
					<th>Value</th>
				</tr>
			</thead>
			<tbody>
				{entries.map(([name, value], index) => (
					<tr key={index}>
						<td>{name}</td>
						<td>{value}</td>
					</tr>
				))}
			</tbody>
		</StyledTable>
	);
}

export default Table;
