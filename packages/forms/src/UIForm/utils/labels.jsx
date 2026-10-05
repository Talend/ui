import classnames from 'classnames';

import { ButtonIcon, Popover, StackHorizontal } from '@talend/design-system';
import { sanitizeReactProps } from '@talend/utils';

import styles from './labels.module.css';

export const getLabelProps = (title, rawLabelProps, hint, required) => {
	const labelProps = sanitizeReactProps(rawLabelProps || {}, [
		'style',
		'htmlFor',
		'for',
		'children',
		'required',
	]);
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
