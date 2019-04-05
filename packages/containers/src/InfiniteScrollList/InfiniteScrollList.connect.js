import { cmfConnect } from '@talend/react-cmf';
import { InfiniteScrollList } from '@talend/react-components';

const connected = cmfConnect({})(InfiniteScrollList);

export default connected;
