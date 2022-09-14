import React from 'react';
import { tint } from 'polished';
import styled from 'styled-components';
import { unstable_useId as useId } from 'reakit';
import { Trans, useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import classnames from 'classnames';
import DSTokens from '@talend/design-tokens';
import { ButtonIcon } from '../../../ButtonIcon';
import Link from '../../../Link';
import { Icon } from '../../../Icon';
import VisuallyHidden from '../../../VisuallyHidden';
import Input, { InputProps } from './Input';
import tokens from '../../../../deprecatedTokens';
import Field from '../Field';
import { I18N_DOMAIN_DESIGN_SYSTEM } from '../../../constants';

const FileField = styled.div`
	width: 100%;

	.input {
		&,
		&::-webkit-file-upload-button {
			height: 100%;
			width: 100%;
			cursor: pointer;
		}

		&--filled {
			pointer-events: none;
		}

		&:focus + .input-file__text {
			border: 2px solid ${({ theme }) => theme.colors.inputFocusBorderColor};
			border-radius: ${tokens.radii.inputBorderRadius};
			outline: 0.3rem solid ${({ theme }) => theme.colors.focusColor[500]};
		}
	}

	.input-file {
		position: relative;
		border: 1px dashed ${({ theme }) => theme.colors.inputBorderColor};
		border-radius: ${tokens.radii.inputBorderRadius};

		&:hover {
			border-color: ${({ theme }) => theme.colors.inputHoverBorderColor};

			.text__icon {
				fill: ${({ theme }) => theme.colors.inputHoverBorderColor};
			}
		}

		&--dragging {
			background: ${({ theme }) => tint(0.95, theme.colors.activeColor[500])};
			border: 2px dashed ${({ theme }) => theme.colors.activeColor[500]};

			.text__icon {
				fill: ${({ theme }) => theme.colors.activeColor[500]};
			}
		}

		&__text,
		&__preview,
		&__input {
			min-height: ${tokens.sizes.xxl};
		}

		&__input {
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			opacity: ${tokens.opacity.transparent};
		}
	}

	.text {
		display: flex;
		align-items: center;
		justify-content: center;
		color: ${({ theme }) => theme.colors.inputPlaceholderColor};

		&__icon {
			position: static;
			margin: 0 1rem;
			width: ${tokens.sizes.l};
			color: ${({ theme }) => theme.colors.textColor};
		}
	}

	.preview {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		padding: ${DSTokens.coralSpacingXxs} ${DSTokens.coralSpacingXs};

		&.single-file {
			align-items: center;
		}

		&__button {
			button {
				position: static;

				svg {
					margin: 0;
					fill: currentColor;
				}
			}
		}

		&__list {
			margin: 0;
			padding: 0;
			list-style: none;
			flex-grow: 1;

			&-item {
				color: ${({ theme }) => theme.colors.inputColor};
			}
		}
	}
`;

function getFileSize(size: number, t: TFunction) {
	if (size < 1024) {
		return t('INPUT_FILE_BYTES', '{{size}}bytes', { size });
	} else if (size > 1024 && size < 1048576) {
		return t('INPUT_FILE_KB', '{{size}}KB', { size: (size / 1024).toFixed(1) });
	} else if (size > 1048576) {
		return t('INPUT_FILE_MB', '{{size}}MB', { size: (size / 1048576).toFixed(1) });
	}
	return '';
}

type FileProps = InputProps & {
	files: FileList | null;
};

const InputFile = React.forwardRef((props: FileProps, ref: React.Ref<HTMLInputElement>) => {
	const [drag, setDrag] = React.useState(false);
	const [files, setFiles] = React.useState<FileList | null>(props.files);

	const inputRef = React.useRef<HTMLInputElement | null>(null);
	const { t } = useTranslation(I18N_DOMAIN_DESIGN_SYSTEM);

	function handleChange() {
		const input = inputRef.current;
		if (input) {
			setFiles(() => input.files);
		}
	}

	function clear() {
		const input = inputRef.current;
		if (input) {
			input.value = '';
		}
		setFiles(() => null);
	}

	function handleDragIn(e: DragEvent) {
		if (e.dataTransfer && e.dataTransfer.items && e.dataTransfer.items.length > 0) {
			setDrag(() => true);
		}
	}

	function handleDragOut() {
		setDrag(() => false);
	}

	function handleDrop() {
		setDrag(() => false);
	}

	React.useEffect(() => {
		const input = inputRef.current;
		if (input) {
			input.addEventListener('dragenter', handleDragIn);
			input.addEventListener('dragleave', handleDragOut);
			input.addEventListener('drop', handleDrop);
			input.addEventListener('change', handleChange);
		}

		return () => {
			if (input) {
				input.removeEventListener('dragenter', handleDragIn);
				input.removeEventListener('dragleave', handleDragOut);
				input.removeEventListener('drop', handleDrop);
				input.removeEventListener('change', handleChange);
			}
		};
	}, []);
	const { id: reakitId } = useId();
	const fileInfoId = `info--${reakitId}`;

	return (
		<FileField aria-describedby={fileInfoId} ref={ref}>
			{props.readOnly ? (
				<Input
					{...props}
					value={
						files
							? Array.from(files)
									.map((file: File | string) =>
										typeof file === 'string' ? file : `${file.name} (${getFileSize(file.size, t)})`,
									)
									.join(';')
							: ''
					}
				/>
			) : (
				<div id={fileInfoId} className={`input-file ${drag ? 'input-file--dragging' : ''}`}>
					<input
						{...props}
						type="file"
						className={`input-file__input input ${files ? 'input--filled' : ''}`}
						ref={inputRef}
					/>
					{!files ? (
						<div className="input-file__text text">
							<Icon className="text__icon" name="talend-upload" />{' '}
							<span className="text__span">
								<Trans i18nKey="INPUT_FILE_DROP_OR_BROWSE_FILE">
									Drop your files or {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
									<span className="link">
										<Link href="#">browse</Link>
									</span>
								</Trans>
							</span>
						</div>
					) : (
						<div
							className={classnames('input-file__preview preview', {
								'single-file': Array.from(files).length === 1,
							})}
						>
							<VisuallyHidden>You have selected:</VisuallyHidden>
							{/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
							<ol role="list" className="preview__list">
								{files &&
									Array.from(files).map((file: File | string, index: React.Key) => (
										<li key={index} className="preview__list-item">
											{typeof file === 'string'
												? file
												: `${file.name} (${getFileSize(file.size, t)})`}
										</li>
									))}
							</ol>
							<div className="preview__button">
								<ButtonIcon icon="cross-filled" onClick={() => clear()} size="S">
									{t('INPUT_FILE_CLEAR_SELECTION', 'Clear selection')}
								</ButtonIcon>
							</div>
						</div>
					)}
				</div>
			)}
		</FileField>
	);
});

const FieldFile = React.forwardRef((props: InputProps, ref: React.Ref<HTMLInputElement>) => (
	<Field as={InputFile} {...props} ref={ref} />
));

export default FieldFile;
