import React from 'react';

function Table({ data }: { data: { [key: string]: string } }) {
	const entries = Object.entries(data);

	if (!entries.length) {
		return null;
	}

	return (
		<table className="sbdocs sbdocs-table">
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
		</table>
	);
}

export default Table;
