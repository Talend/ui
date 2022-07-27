import React from 'react';

import { Token } from '../../../../../src/tokens/types';
import { TokensProps } from '../../TokensTypes';
import { StackVertical } from '../../../../../src';
import DefinitionListItemTypography from './DefinitionListItem/DefinitionListItemTypography';

import styles from './DefinitionList.module.scss';

const DefinitionListTypography = ({ tokens }: TokensProps) => {
	const filteredTokens = {
		Headings: tokens.filter((token: Token) => token.name.includes('Heading')),
		Paragraphs: tokens.filter((token: Token) => token.name.includes('Paragraph')),
		Data: tokens.filter((token: Token) => token.name.includes('Data')),
	};

	return (
		<StackVertical gap="L" padding={{ x: 0, y: 'L' }}>
			{Object.values(filteredTokens).map((entries: Token[], index) => (
				<StackVertical gap="M" key={index} as="dl">
					<dt className={styles.title}>{Object.keys(filteredTokens)[index]}</dt>
					<StackVertical as="dl" gap="S">
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
