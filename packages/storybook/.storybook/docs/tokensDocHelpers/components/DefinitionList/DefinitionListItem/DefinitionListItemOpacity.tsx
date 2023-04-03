import { Token } from '../../../../../../src/tokens/types';
import CardOpacity from '../../Card/CardOpacity';
import DefinitionListItem from './DefinitionListItem';

function DefinitionListItemOpacity({ token }: { token: Token }) {
	if (!token) {
		return null;
	}

	return (
		<DefinitionListItem token={token}>
			<CardOpacity opacity={token.value} />
		</DefinitionListItem>
	);
}

export default DefinitionListItemOpacity;
