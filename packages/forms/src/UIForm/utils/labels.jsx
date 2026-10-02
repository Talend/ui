import classnames from 'classnames';

import { ButtonIcon, Popover, StackHorizontal } from '@talend/design-system';

import styles from './labels.module.css';

const ALLOWED_LABEL_PROPS = ['id', 'title', 'className'];

export const getSafeLabelProps = labelProps => {
	if (!labelProps || typeof labelProps !== 'object') {
		return {};
	}
	return Object.keys(labelProps).reduce((acc, key) => {
		if (ALLOWED_LABEL_PROPS.includes(key) || /^(data|aria)-/.test(key)) {
			acc[key] = labelProps[key];
		}
		return acc;
	}, {});
};

export const getLabelProps = (title, rawLabelProps, hint, required) => {
	const labelProps = getSafeLabelProps(rawLabelProps);
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
