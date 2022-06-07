import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

import Card from '../components/Card';
import { Icon } from '../components/Icon';
import Layout from '../components/Layout';

import tokens from '../tokens';

import Datachaos from '../images/datachaos.png';

const SWrapper = styled.div`
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;

	@media only screen and (min-width: 468px) {
		background-image: url(${Datachaos}), linear-gradient(134deg, #19426c, #2c1f56);
		overflow: auto;
	}

	.layout__main {
		background: none;

		@media only screen and (min-width: 768px) {
			flex: 1 1 auto;
			padding: 5rem;
		}
	}
`;

export type CardTemplateProps = PropsWithChildren<any> & {
	title?: string;
	footer?: React.ReactElement;
};

const LogoWrapper = styled.div`
	svg {
		height: 3.2rem;
		width: auto;
		max-width: 100%;
	}
`;

const CardTemplate: React.FC<CardTemplateProps> = ({
	title,
	children,
	footer,
}: CardTemplateProps) => (
	<SWrapper>
		<Layout hasOverflow footer={footer}>
			<div
				style={{
					width: '100vw',
					margin: '0 auto',
					maxWidth: '65rem',
					minHeight: '60rem',
				}}
			>
				<Card
					header={
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
							}}
						>
							<LogoWrapper>
								<Icon name="talend-logo" />
							</LogoWrapper>
							<h1 style={{ marginTop: tokens.space.s }}>{title}</h1>
						</div>
					}
				>
					{children}
				</Card>
			</div>
		</Layout>
	</SWrapper>
);

export default CardTemplate;
