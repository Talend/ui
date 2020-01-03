import { cmfConnect } from '@talend/react-cmf';
import CircularProgress from '@talend/react-components/lib/CircularProgress';

export default cmfConnect({
	omitCMFProps: true,
})(CircularProgress);
