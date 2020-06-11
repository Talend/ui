import React from 'react';

function DesignTokens({ tokens }) {
	const designTokens = Object.entries(tokens);

	if (!designTokens.length) {
		return null;
	}

	return (
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
	);
}

export default DesignTokens;
