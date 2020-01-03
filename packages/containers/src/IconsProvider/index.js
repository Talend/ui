import { cmfConnect } from '@talend/react-cmf';
import IconsProvider from '@talend/react-components/lib/IconsProvider';

export default cmfConnect({
	omitCMFProps: true,
})(IconsProvider);
