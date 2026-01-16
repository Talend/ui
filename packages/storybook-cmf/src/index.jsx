import { makeDecorator } from 'storybook/preview-api';
import CMFStory from './CMFStory';
import CMFDecorator from './CMFDecorator';
import register from './register';

export default makeDecorator({
	name: 'withCMF',
	parameterName: 'cmf',
	skipIfNoParametersOrOptions: false,
	wrapper: (getStory, context, { parameters = {} }) => (
		<CMFStory
			state={parameters.state}
			reducer={parameters.reducer}
			enhancer={parameters.enhancer}
			middleware={parameters.middleware}
			sagaMiddleware={parameters.sagaMiddleware}
		>
			{getStory(context)}
		</CMFStory>
	),
});

export { CMFDecorator, CMFStory, register };
