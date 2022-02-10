import React from 'react';

import * as S from './Menu.style';
import { LinkableType } from '../Linkable';

type MenuItemProps = Omit<LinkableType, 'as'> & {
	active?: boolean;
};

const MenuItem = React.forwardRef(
	({ children, ...props }: MenuItemProps, ref: React.Ref<HTMLAnchorElement>) => (
		<S.MenuItem ref={ref} {...props}>
			<span className="item__text">{children}</span>
		</S.MenuItem>
	),
);

export default MenuItem;
