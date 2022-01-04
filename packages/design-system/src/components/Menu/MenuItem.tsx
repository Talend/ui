import React from 'react';

import * as S from './Menu.style';
import { LinkProps } from '../Link/Link';

type MenuItemProps = LinkProps & {
	active?: boolean;
};

const MenuItem = React.forwardRef((props: MenuItemProps, ref: React.Ref<any>) => (
	<S.MenuItem ref={ref} {...props} />
));

export default MenuItem;
