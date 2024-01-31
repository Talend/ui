import { forwardRef, Ref } from 'react';
import { useTranslation } from 'react-i18next';

import classnames from 'classnames';
import { DataAttributes } from 'src/types';

import { I18N_DOMAIN_DESIGN_SYSTEM } from '../../constants';
import { Dropdown, DropdownItemType } from '../../Dropdown';
import { SizedIcon } from '../../Icon';
import { StackHorizontal } from '../../Stack';
import BadgeButton from '../button/BadgeButton';
import BadgePrimitive, {
	BadgeDropdownItem,
	BadgePrimitiveProps,
} from '../primitive/BadgePrimitive';

import styles from './BadgeDropdown.module.scss';

// --------------------------------------------------
// Badge Dropdown button
// --------------------------------------------------

type BadgeDropdownButtonProps = {
	children?: string;
} & Partial<DataAttributes>;

// Note : need to use forwardRef and pass destructuring unknown parameters to be able using with dropdown component
const BadgeDropdownButton = forwardRef(
	({ children, ...rest }: BadgeDropdownButtonProps, ref: Ref<HTMLButtonElement>) => {
		return (
			<BadgeButton componentId="badgedropdown-button" ref={ref} {...rest}>
				<StackHorizontal gap="XS" as="span" align="center">
					{children}

					<span className={classnames(styles['badge-dropdown__button__caret'])}>
						<SizedIcon size="S" name="chevron-down" />
					</span>
				</StackHorizontal>
			</BadgeButton>
		);
	},
);

BadgeDropdownButton.displayName = 'BadgeDropdownButton';

// --------------------------------------------------
// Badge Dropdown
// --------------------------------------------------

/**
 * Return callback to map a Badge Item to a Dropdown compatible item.
 * @param setSelectedValue React.Dispatch action called when click on one Dropdown item
 * @returns Dropdown compatible item
 */
function mapBadgeItemToDropdownItem(onChange?: (selectedId: string) => void) {
	return (item: BadgeDropdownItem): DropdownItemType => ({
		type: 'button',
		label: item.label,
		onClick: () => {
			if (onChange) {
				onChange(item.id);
			}
		},
	});
}

export type BadgeDropdownProps = Omit<BadgePrimitiveProps, 'children'> &
	Partial<DataAttributes> & {
		/**
		 * Listener for item selection.
		 */
		onChange: (selectedId: string) => void;

		/**
		 * (Optional) ID of selected item. If not filled, first one is selected.
		 */
		selectedId?: string;

		/**
		 * List of items available in dropdown menu.
		 */
		value: BadgeDropdownItem[];
	};

const BadgeDropdown = forwardRef((props: BadgeDropdownProps, ref: Ref<HTMLSpanElement>) => {
	const {
		onChange,
		selectedId,
		value,
		'data-testid': dataTestId,
		'data-test': dataTest,
		'data-feature': dataFeature,
	} = props;
	const { t } = useTranslation(I18N_DOMAIN_DESIGN_SYSTEM);

	const selectedValue = value.find(v => v.id === selectedId) || value[0];

	return (
		<BadgePrimitive {...props} ref={ref}>
			<Dropdown
				aria-label={t('BADGE_ARIA_lABEL_SELECT_ITEM', 'Select item')}
				items={value.map(mapBadgeItemToDropdownItem(onChange))}
				data-testid={dataTestId}
				data-test={dataTest}
				data-feature={dataFeature}
			>
				<BadgeDropdownButton
					data-testid={dataTestId}
					data-test={dataTest}
					data-feature={dataFeature}
				>
					{selectedValue?.label}
				</BadgeDropdownButton>
			</Dropdown>
		</BadgePrimitive>
	);
});

BadgeDropdown.displayName = 'BadgeDropdown';

export default BadgeDropdown;
