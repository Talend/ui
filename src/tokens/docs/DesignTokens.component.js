import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
	table {
		border: 1px solid;
		border-collapse: collapse;
		border-radius: 0.75rem;
		text-align: left;
		overflow: hidden;
	}

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

function DesignTokens({ tokens }) {
	const designTokens = Object.entries(tokens);

	if (!designTokens.length) {
		return null;
	}

	return (
		<Div>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Value</th>
					</tr>
				</thead>
				<tbody>
					{designTokens.map(([name, value], index) => (
						<tr key={index}>
							<td>{name}</td>
							<td>{value}</td>
						</tr>
					))}
				</tbody>
			</table>
		</Div>
	);
}

export default DesignTokens;
