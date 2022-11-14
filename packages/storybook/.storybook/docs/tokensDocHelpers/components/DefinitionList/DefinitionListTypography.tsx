import React from 'react';

import { Token } from '../../../../../src/tokens/types';
import { TokensProps } from '../../TokensTypes';
import { StackVertical } from '@talend/design-system';
import DefinitionListItemTypography from './DefinitionListItem/DefinitionListItemTypography';

import styles from './DefinitionList.module.scss';

const DefinitionListTypography = ({ tokens }: TokensProps) => {
	const filteredTokens = {
		Headings: tokens.filter((token: Token) => token.name.includes('Heading')),
		Paragraphs: tokens.filter((token: Token) => token.name.includes('Paragraph')),
		Data: tokens.filter((token: Token) => token.name.includes('Data')),
	};

	return (
		<StackVertical gap="L">
			{Object.values(filteredTokens).map((entries: Token[], index) => (
				<StackVertical gap="M" key={index}>
					<h2 className={styles.title}>{Object.keys(filteredTokens)[index]}</h2>
					<StackVertical gap="S">
						{entries.map((token, index) => (
							<DefinitionListItemTypography key={`${token.name}-${index}`} token={token} />
						))}
					</StackVertical>
				</StackVertical>
			))}
		</StackVertical>
	);
};

export default DefinitionListTypography;
