import { ButtonIcon, Popover, StackHorizontal } from '@talend/design-system';

export const getLabelProps = (title, labelProps, hint, required) => {
	if (!hint) {
		return {
			children: title,
			...labelProps,
		};
	}
	return {
		children: (
			<StackHorizontal gap="XXS" align="center">
				{title}
				{required && '*'}
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
