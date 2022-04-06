import styled from 'styled-components';
import DStokens from '@talend/design-tokens';
import tokens from '../../tokens';

export const InlineEditing = styled.div`
	.c-inline-editing--editing {
		position: relative;

		& [data-padding-override='true'] {
			padding-right: 4rem;
		}

		.field__group--input {
			margin: 0;

			.field__control--input {
				padding-right: 4.5rem;
			}
		}

		.c-inline-editing__actions {
			position: absolute;
			display: flex;
			height: 100%;
			bottom: 0;
			right: 0;
			top: 0;
		}
	}

	.c-inline-editing--static {
		&.loading {
			animation: ${tokens.animations.heartbeat};
		}
	}

	.c-inline-editing--static {
		display: flex;

		.c-inline-editing__value {
			display: block;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
			flex: 0 1 auto;

			&[data-placeholder]:empty::before {
				content: attr(data-placeholder);
				color: ${({ theme }) => theme.colors.inputPlaceholderColor};
			}
		}

		.c-inline-editing__action {
			flex: 0 0 auto;
			opacity: 0;
			margin-left: ${DStokens.coralSpacingXxs};
			transition: opacity ${DStokens.coralTransitionFast};

			> * {
				position: relative;
				top: 0.1rem;
			}

			&:hover,
			&:active,
			&:focus {
				opacity: 1;
			}
		}

		&:hover,
		&:active,
		&:focus {
			.c-inline-editing__action {
				opacity: 1;
			}
		}
	}
`;

export const InlineEditingValue = styled.span``;
