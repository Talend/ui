import classnames from 'classnames';

import { ButtonIcon, Popover, StackHorizontal } from '@talend/design-system';
import { sanitizeReactProps } from '@talend/utils';

import styles from './labels.module.css';

/**
 * Label props come from the UI schema (untrusted data). `is` turns the label into a custom element
 * for React, which then writes any `on*` string value as an inline event handler attribute.
 * Only function handlers are kept.
 */
const isInlineHandler = (key, value) => /^on/i.test(key) && typeof value !== 'function';

export const getLabelProps = (title, rawLabelProps, hint, required) => {
	const labelProps = Object.fromEntries(
		Object.entries(
			sanitizeReactProps(rawLabelProps || {}, [
				'style',
				'htmlFor',
				'for',
				'children',
				'required',
				'is',
			]),
		).filter(([key, value]) => !isInlineHandler(key, value)),
	);
	if (!hint) {
		return {
			children: title,
			...labelProps,
		};
	}
	return {
		children: (
			<StackHorizontal gap="XXS" align="center">
				<span className={classnames({ [styles.required]: required })}>{title}</span>
				<Popover
					position={hint.overlayPlacement || 'auto'}
					data-test={hint['data-test']}
					isFixed={hint.overlayIsFixed}
					disclosure={
						<ButtonIcon
							data-test={hint['icon-data-test']}
							size="XS"
							icon={hint.icon || 'talend-info-circle'}
						></ButtonIcon>
					}
				>
					{hint.overlayComponent}
				</Popover>
			</StackHorizontal>
		),
		...labelProps,
		required: false,
	};
};
