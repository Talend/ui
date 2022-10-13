import React, { forwardRef, Key, Ref, useEffect, useRef, useState } from 'react';
import { unstable_useId as useId } from 'reakit';
import { Trans, useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import classnames from 'classnames';
import { I18N_DOMAIN_DESIGN_SYSTEM } from '../../../constants';
import { ButtonIcon } from '../../../ButtonIcon';
import { SizedIcon } from '../../../Icon';
import VisuallyHidden from '../../../VisuallyHidden';
import {
	FieldPrimitive,
	FieldPropsPrimitive,
	InputPrimitive,
	InputPrimitiveProps,
} from '../../Primitives/index';

import styles from './Input.File.module.scss';

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

type InputType = Omit<InputPrimitiveProps, 'type' | 'className' | 'style' | 'prefix' | 'suffix'>;
type FileProps = InputType & {
	files?: string[] | FileList;
};

const InputFile = forwardRef((props: FileProps, ref: Ref<HTMLInputElement>) => {
	const [drag, setDrag] = useState(false);
	const [files, setFiles] = useState(props.files || null);

	const inputRef = useRef<HTMLInputElement | null>(null);
	const { t } = useTranslation(I18N_DOMAIN_DESIGN_SYSTEM);

	const { hasError, ...rest } = props;

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

	useEffect(() => {
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

	const filesValue = () => {
		if (files) {
			const isFileList = files[0].hasOwnProperty('name');
			const iterable = isFileList ? [...files] : (files as string[]);

			return iterable
				.map((file: File | string) => {
					if (typeof file === 'string') {
						return file;
					}
					return `${file.name} (${getFileSize(file.size, t)})`;
				})
				.join('; ');
		}
		return '';
	};

	return (
		<div aria-describedby={fileInfoId} ref={ref} className={styles.wrapper}>
			{props.readOnly ? (
				<InputPrimitive type="text" {...props} value={filesValue()} />
			) : (
				<div
					id={fileInfoId}
					className={classnames(styles.inputFile, {
						[styles.inputFile_dragging]: drag,
						[styles.inputFile_disabled]: props.disabled,
						[styles.inputFile_error]: hasError,
					})}
				>
					<input
						{...rest}
						type="file"
						className={classnames(styles.inputFile__input, styles.input, {
							[styles.input_filled]: files,
						})}
						ref={inputRef}
					/>
					{!files ? (
						<div className={classnames(styles.inputFile__text, styles.text)}>
							<SizedIcon size="S" name="upload" />{' '}
							<span>
								<Trans i18nKey="INPUT_FILE_DROP_OR_BROWSE_FILE">
									Drop your files or <span className={styles.text__fakeLink}>browse</span>
								</Trans>
							</span>
						</div>
					) : (
						<div
							className={classnames(styles.inputFile__preview, styles.preview, {
								[styles.preview_single]: [...files].length === 1,
							})}
						>
							<VisuallyHidden>You have selected:</VisuallyHidden>
							{/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
							<ol role="list" className={styles.preview__list}>
								{files &&
									[...files].map((file: File | string, index: Key) => (
										<li key={index} className={styles.preview__list__listItem}>
											{typeof file === 'string'
												? file
												: `${file.name} (${getFileSize(file.size, t)})`}
										</li>
									))}
							</ol>
							<div className={styles.preview__button}>
								<ButtonIcon icon="cross-filled" onClick={() => clear()} size="S">
									{t('INPUT_FILE_CLEAR_SELECTION', 'Clear selection')}
								</ButtonIcon>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
});
InputFile.displayName = 'InputFile';

const FieldFile = forwardRef(
	(
		props: FileProps & Omit<FieldPropsPrimitive, 'style' | 'className'>,
		ref: Ref<HTMLInputElement>,
	) => {
		const { label, hasError, link, description, id, name, hideLabel, required, ...rest } = props;
		return (
			<FieldPrimitive
				label={label}
				hasError={hasError || false}
				link={link}
				description={description}
				id={id}
				name={name}
				hideLabel={hideLabel}
				required={required}
			>
				<InputFile {...rest} ref={ref} />
			</FieldPrimitive>
		);
	},
);

FieldFile.displayName = 'FieldFile';

export default FieldFile;
