import { Token } from '../../../../../../src/tokens/types';
import DefinitionListItem from './DefinitionListItem';

function DefinitionListItemCharts({ token }: { token: Token }) {
	if (!token) {
		return null;
	}

	return <DefinitionListItem token={token} />;
}

export default DefinitionListItemCharts;
