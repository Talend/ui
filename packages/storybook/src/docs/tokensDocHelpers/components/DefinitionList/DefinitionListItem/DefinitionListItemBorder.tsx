import { Token } from '../../../../../../src/tokens/types';
import CardBorder from '../../Card/CardBorder';
import DefinitionListItem from './DefinitionListItem';

function DefinitionListItemBorder({ token }: { token: Token }) {
	if (!token) {
		return null;
	}

	return (
		<DefinitionListItem token={token}>
			<CardBorder borderStyle={token.value} />
		</DefinitionListItem>
	);
}

export default DefinitionListItemBorder;
