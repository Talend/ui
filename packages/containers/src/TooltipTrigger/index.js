
import { cmfConnect } from '@talend/react-cmf';
import TooltipTrigger from '@talend/react-components/lib/TooltipTrigger';

export default cmfConnect({
	omitCMFProps: true,
})(TooltipTrigger);
