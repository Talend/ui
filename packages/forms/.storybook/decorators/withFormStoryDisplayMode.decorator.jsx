import { FormStoryWithDisplayMode } from './FormStoryWithDisplayMode.component';

export const withFormStoryDisplayMode = (Story, { parameters: { formStoryDisplayMode }, args }) => {
	if (!formStoryDisplayMode) return <Story />;
	const { doc, category } = formStoryDisplayMode;
	return (
		<FormStoryWithDisplayMode {...{ ...args, doc, category }}>
			{props => <Story args={props} />}
		</FormStoryWithDisplayMode>
	);
};
