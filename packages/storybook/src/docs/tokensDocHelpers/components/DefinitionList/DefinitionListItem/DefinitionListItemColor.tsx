import { Token } from '../../../../../../src/tokens/types';
import { getCssName } from '../../../TokenFormatter';
import CardColor from '../../Card/CardColor';
import DefinitionListItem from './DefinitionListItem';

function DefinitionListItemColor({ token }: { token: Token }) {
	if (!token) {
		return null;
	}

	return (
		<DefinitionListItem token={token}>
			<CardColor color={getCssName(token)} />
		</DefinitionListItem>
	);
}

export default DefinitionListItemColor;
