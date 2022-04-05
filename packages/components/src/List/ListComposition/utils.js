export const columnsFromChildrens = children => {
	return Array.isArray(children)
		? children.filter(column => column.props?.dataKey).map(column => column.props)
		: null;
};
