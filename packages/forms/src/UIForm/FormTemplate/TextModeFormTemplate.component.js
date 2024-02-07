import { StackVertical } from '@talend/design-system';

export default function TextModeFormTemplate({ widgetsRenderer, children }) {
	return (
		<StackVertical gap="S">
			{widgetsRenderer()}
			{children}
		</StackVertical>
	);
}
