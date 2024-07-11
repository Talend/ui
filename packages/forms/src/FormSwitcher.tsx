import FormSkeleton from './FormSkeleton';
import { ActionProps, DisplayMode, FormDefinition } from './types';
import { UIForm } from './UIForm';

type FormSwitcherProps = {
	loading?: boolean;
	actions?: ActionProps[];
	displayMode?: DisplayMode;
	data?: FormDefinition;
	// We'll be typing this later on
} & any;

export default function FormSwitcher(props: FormSwitcherProps) {
	if (props.loading) {
		return (
			<FormSkeleton
				actions={props.actions}
				displayMode={props.displayMode}
				anchorButtonsToFooter={props.anchorButtonsToFooter}
			/>
		);
	}
	return <UIForm {...props} />;
}
