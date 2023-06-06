// eslint-disable-next-line @talend/import-depth

import { RichRadioButtonProps } from './RichRadioButton.types';
import { StackVertical, StackHorizontal } from '../Stack';
import { getIconWithDeprecatedSupport } from '../Icon/DeprecatedIconHelper';
import style from './RichRadioButton.module.scss';
import classnames from 'classnames';
import { Tag } from '../Tag';

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
				className={style['rich-radio-button__input']}
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
								className={classnames({
									'rich-radio-button__illustration': asset.illustration,
									'rich-radio-button__icon': !asset.illustration,
								})}
							>
								{asset.illustration ||
									getIconWithDeprecatedSupport({
										iconSrc: asset.name || '',
										size: 'L',
									})}
							</span>
						</>
					)}
					<h4>{title}</h4>

					{description && <p>{description}</p>}
					{tags && (
						<StackHorizontal as="span" gap="XS" wrap="wrap">
							{tags.map(tag => {
								return (
									<Tag variant={tag.variant} key={tag.name}>
										{tag.name}
									</Tag>
								);
							})}
						</StackHorizontal>
					)}
				</StackVertical>
			</span>
		</label>
	);
};

export default RichRadioButton;
