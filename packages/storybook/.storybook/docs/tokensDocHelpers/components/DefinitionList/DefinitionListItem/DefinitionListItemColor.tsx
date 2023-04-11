import { Token } from '../../../../../../src/tokens/types';
import CardColor from '../../Card/CardColor';
import DefinitionListItem from './DefinitionListItem';

function DefinitionListItemColor({ token }: { token: Token }) {
	if (!token) {
		return null;
	}

	return (
		<DefinitionListItem token={token}>
			<CardColor color={token.value} />
		</DefinitionListItem>
	);
}

export default DefinitionListItemColor;
