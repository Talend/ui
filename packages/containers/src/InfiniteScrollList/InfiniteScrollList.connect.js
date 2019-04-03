import { cmfConnect } from '@talend/react-cmf';

import Container from './InfiniteScrollList.container';

const connected = cmfConnect({})(Container);

export default connected;
