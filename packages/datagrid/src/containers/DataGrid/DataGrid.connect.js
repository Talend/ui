import { cmfConnect } from '@talend/react-cmf';
import Container from './DataGrid.container';

export default cmfConnect({
	omitCMFProps: true,
	withComponentRegistry: true,
})(Container);
