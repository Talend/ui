import { useContext } from 'react';
import { TreeManagerContext } from '../TreeManagerContext';

import theme from './CommonModel.module.scss';

type ModelDQTypeProps = {
	label?: string;
};

export function ModelDQType({ label }: ModelDQTypeProps) {
	const { hasSemanticAwareness } = useContext(TreeManagerContext);
	if (!label || !hasSemanticAwareness) {
		return null;
	}

	return <span className={theme['model-dq-type']}>({label})</span>;
}
