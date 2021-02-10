import React from 'react';
import styled from 'styled-components';

import Card from '../components/Card';
import { Icon } from '../components/Icon';
import Layout from '../components/Layout';

import tokens from '../tokens';

import Datachaos from '../images/datachaos.png';

const SWrapper = styled.div(
	({ theme }) => `
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

	.card__heading {
		display: flex;
		flex-direction: column;
		justify-content: center;
				
		svg {
            height: 3.2rem;
            width: auto;
			max-width: 100%;
		}

		h1 {
			margin: 1.5rem 0;
			font-size: 2.1rem;
			font-family: ${tokens.fonts.sansSerif};
			font-weight: ${tokens.fontWeights.semiBold};
		}
	}

	.card__body {
		.cookie-disclaimer,
		.form__buttons,
		.signup-cta {
			text-align: center;
			justify-content: center;
		}

		.form__buttons,
		.cookie-disclaimer__button {
			padding: 2rem 0;
		}
	}

	.footer {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding: 0.5rem 0;

		@media only screen and (min-width: 468px) {
			color: ${tokens.colors.gray[0]};
			flex-direction: row;
		}

		.footer__links {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			flex-wrap: wrap;
			margin: 0;
			padding: 0;

			&-item {
				display: inline-flex;
				padding: 0 1rem;
				border-right: 1px solid ${tokens.colors.gray[75]};

				&:last-child {
					border-right-color: transparent;
				}

				@media only screen and (min-width: 468px) {
					&,
					&:last-child {
						border-right-color: ${tokens.colors.gray[0]};
					}
				}
			}
		}

		.footer__link {
			color: ${theme.colors.textColor};

			&:hover,
			&:focus {
				// color: $footer-link-hover-color;
			}

			&:active {
				// color: $footer-link-active-color;
			}

			@media only screen and (min-width: 468px) {
				color: ${tokens.colors.gray[0]};
			}
		}

		.footer__copyright {
			padding: 0 1rem;
			font-weight: 300;
		}
	}
`,
);

export type CardTemplateProps = {
	title?: string;
	main?: React.ReactElement<any>;
	footer?: React.ReactElement<any>;
};

const CardTemplate: React.FC<CardTemplateProps> = ({ title, main, footer }: CardTemplateProps) => (
	<SWrapper>
		<Layout
			hasOverflow
			main={
				<Card>
					{title && (
						<Card.Heading>
							<Icon name="talend-logo" />
							<h1>{title}</h1>
						</Card.Heading>
					)}
					<Card.Body>{main}</Card.Body>
				</Card>
			}
			footer={footer}
		/>
	</SWrapper>
);

export default CardTemplate;
