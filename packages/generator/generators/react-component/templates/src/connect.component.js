import { cmfConnect } from '@talend/react-cmf';
import { <%= props.name %> } from '<%= props.purePath %>';

export function mapStateToProps(state) {
	return {};
}

export default cmfConnect({
	mapStateToProps,
})(<%= props.name %>);
