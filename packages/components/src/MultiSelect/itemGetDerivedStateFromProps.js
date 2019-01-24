export default function getDerivedStateFromProps(props, state) {
	const item = props.parent.props.collection[props.index];
	if (state.item !== item) {
		return { item };
	}
	return null;
}
