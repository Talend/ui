import React, { forwardRef, Ref } from 'react';

import BadgeBase, { Label, BadgeProps } from './BadgePrimitive';
import { ButtonIcon } from '../../ButtonIcon';

type RemovableBadgeProps = BadgeProps & {
	onRemove: (event: React.MouseEvent<HTMLButtonElement> | KeyboardEvent) => void;
};

const RemoveButton = ({
	onClick,
}: {
	onClick: (event: React.MouseEvent<HTMLButtonElement> | KeyboardEvent) => void;
}) => (
	<ButtonIcon onClick={onClick} data-test="badge.remove" icon="talend-cross" size="XS">
		Remove
	</ButtonIcon>
);

const Badge = forwardRef(({ label, onRemove }: RemovableBadgeProps, ref: Ref<HTMLSpanElement>) => {
	return (
		<BadgeBase ref={ref}>
			<Label>{label}</Label>
			<RemoveButton onClick={onRemove} />
		</BadgeBase>
	);
});

export default Badge;
