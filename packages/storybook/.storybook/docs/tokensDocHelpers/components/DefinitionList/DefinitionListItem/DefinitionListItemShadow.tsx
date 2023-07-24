import { Token } from '../../../../../../src/tokens/types';
import CardShadow from '../../Card/CardShadow';
import DefinitionListItem from './DefinitionListItem';

function DefinitionListItemShadow({ token }: { token: Token }) {
	if (!token) {
		return null;
	}

	return (
		<DefinitionListItem token={token}>
			<CardShadow shadow={token.value} />
		</DefinitionListItem>
	);
}

export default DefinitionListItemShadow;
