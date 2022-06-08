import React, { PropsWithChildren } from 'react';

import Card from '../components/Card';
import { Icon } from '../components/Icon';
import Layout from '../components/Layout';
import { StackVertical } from '../components/Stack';

import tokens from '../tokens';

import theme from './Card.scss';

export type CardTemplateProps = PropsWithChildren<any> & {
	title?: string;
	footer?: React.ReactElement;
};

const CardTemplate: React.FC<CardTemplateProps> = ({
	title,
	children,
	footer,
}: CardTemplateProps) => (
	<div className={theme['card-template']}>
		<Layout hasOverflow footer={footer}>
			<div className={theme['card-template__card']}>
				<Card
					header={
						<StackVertical gap={0} align="center">
							<div className={theme['card-template__talend-logo']}>
								<Icon name="talend-logo" />
							</div>
							<h1 style={{ marginTop: tokens.space.s }}>{title}</h1>
						</StackVertical>
					}
				>
					{children}
				</Card>
			</div>
		</Layout>
	</div>
);

export default CardTemplate;
