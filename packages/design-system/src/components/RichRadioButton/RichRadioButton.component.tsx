// eslint-disable-next-line @talend/import-depth

import { RichRadioButtonProps } from './RichRadioButton.types';
import { StackVertical, StackHorizontal } from '../Stack';
import { getTagVariant } from './RichRadioButton.utils';
import { getIconWithDeprecatedSupport } from '../Icon/DeprecatedIconHelper';
import style from './RichRadioButton.module.scss';

const RichRadioButton = ({
	dataFeature,
	description,
	asset,
	id,
	isChecked = false,
	isDisabled = false,
	isReadOnly = false,
	name,
	onChange,
	tags,
	title,
}: RichRadioButtonProps) => {
	return (
		<label className={style['rich-radio-button__wrapper']}>
			<input
				type="radio"
				id={id}
				name={name}
				disabled={isDisabled}
				readOnly={isReadOnly}
				data-feature={dataFeature}
				checked={isChecked}
				onClick={() => onChange(id)}
			/>
			<span className={style['rich-radio-button']}>
				<StackVertical as="span" gap="XS">
					{asset && (
						<>
							<span
								className={
									style[`rich-radio-button__${asset.illustration ? 'illustration' : 'icon'}`]
								}
							>
								{!asset.illustration
									? getIconWithDeprecatedSupport({
											iconSrc: asset.name || '',
											size: 'L',
									  })
									: asset.illustration}
							</span>
						</>
					)}
					<h4>{title}</h4>

					{description && <p>{description}</p>}
					{tags && (
						<StackHorizontal as="span" gap="XS" wrap="wrap">
							{tags.map(tag => {
								const Tag = getTagVariant(tag);
								return <Tag key={tag.name}>{tag.name}</Tag>;
							})}
						</StackHorizontal>
					)}
				</StackVertical>
			</span>
		</label>
	);
};

export default RichRadioButton;
