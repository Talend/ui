import { cmfConnect } from '@talend/react-cmf';
import Container from './FabricDataGrid.container';

export default cmfConnect({
	omitCMFProps: true,
	withComponentRegistry: true,
})(Container);
