import { useContext } from 'react';

import { TreeManagerContext } from '../TreeManagerContext';

import theme from './DataModel.module.scss';

type DataModelDqTypeProps = {
	label?: string;
};

export function DataModelDqType({ label }: DataModelDqTypeProps) {
	const { hasSemanticAwareness } = useContext(TreeManagerContext);
	if (!label || !hasSemanticAwareness) {
		return null;
	}

	return <span className={theme['model-dq-type']}>({label})</span>;
}
