const toString = require('mdast-util-to-string');

function groupByDetails(groups, nodes) {
	let groupNodes = [];
	groups.forEach(group => {
		const node = nodes[group.start];
		const label = toString(node);
		groupNodes.push({
			type: 'jsx',
			value: `<details>`,
		});
		groupNodes.push({
			type: 'jsx',
			value: `<summary>${label}</summary>`,
		});
		groupNodes.push(...nodes.slice(group.start + 1, group.end));
		groupNodes.push({
			type: 'jsx',
			value: `</details>`,
		});
	});
	return groupNodes;
}

module.exports = groupByDetails;
