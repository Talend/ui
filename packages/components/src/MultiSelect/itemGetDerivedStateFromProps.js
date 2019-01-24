export default function getDerivedStateFromProps(props, state) {
	const item = props.parent.props.collection[props.index];
	if (state.item === item) {
		return null;
	}
	const areEqual = ['selected', 'value', 'name'].every(
		attr => state.item[attr] === item[attr]
	);
	if (!areEqual) {
		return { item };
	}
	return null;
}
