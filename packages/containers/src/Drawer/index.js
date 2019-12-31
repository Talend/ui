
import { cmfConnect } from '@talend/react-cmf';
import Layout from '@talend/react-components/lib/Layout';

export default cmfConnect({
	omitCMFProps: true,
	withComponentRegistry: true,
})(Layout);
