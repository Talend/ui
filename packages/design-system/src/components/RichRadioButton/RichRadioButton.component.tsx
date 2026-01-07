import {
	RichRadioButtonProps,
	LogoAsset,
	IllustrationAsset,
	IconAsset,
} from './RichRadioButton.types';
import { StackVertical, StackHorizontal } from '../Stack';
import { getIconWithDeprecatedSupport } from '../Icon/DeprecatedIconHelper';
import style from './RichRadioButton.module.css';
import { Tag } from '../Tag';
import { Icon } from '../Icon';
import { DataAttributes } from 'src/types';

function RichRadioButtonIcon({ asset }: { asset?: LogoAsset | IllustrationAsset | IconAsset }) {
	if (asset?.illustration) {
		return (
			<span className={style['rich-radio-button__illustration']}>
				<asset.illustration />
			</span>
		);
	}
	if (asset?.logo) {
		return <Icon name={asset.logo} className={style['rich-radio-button__logo']} />;
	}
	if (asset?.name) {
		return (
			<span className={style['rich-radio-button__icon']}>
				{getIconWithDeprecatedSupport({
					iconSrc: asset.name || '',
					size: 'L',
					...asset,
				})}
			</span>
		);
	}

	return null;
}
export type { RichRadioButtonProps };
export const RichRadioButton = ({
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
	'data-testid': dataTestId,
	'data-test': dataTest,
}: RichRadioButtonProps & Partial<DataAttributes>) => {
	return (
		<label className={style['rich-radio-button__wrapper']}>
			<input
				className={style['rich-radio-button__input']}
				type="radio"
				id={id}
				name={name}
				disabled={isDisabled}
				readOnly={isReadOnly}
				checked={isChecked}
				data-feature={dataFeature}
				data-testid={dataTestId}
				data-test={dataTest}
				onChange={() => onChange(id)}
				data-checked={isChecked}
				onKeyDown={event => {
					if (event.key === 'Enter') {
						event.preventDefault();
						onChange(id);
					}
				}}
			/>
			<span className={style['rich-radio-button']}>
				<StackVertical as="span" gap="XS">
					<RichRadioButtonIcon asset={asset} />
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
