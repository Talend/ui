import React from 'react';

import * as S from './Menu.style';

const MenuItem = React.forwardRef((props, ref) => <S.MenuItem ref={ref} {...props} />);

export default MenuItem;
