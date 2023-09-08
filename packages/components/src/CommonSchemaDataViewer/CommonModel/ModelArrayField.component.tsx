import { ButtonIcon, StackHorizontal, StackVertical } from '@talend/design-system';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import I18N_DOMAIN_COMPONENTS from '../../constants';
import {
	ArrayType,
	CommonSchemaSampledField,
	CommonSchemaSampledFieldType,
	FieldMetadata,
} from '../CommonDataViewer.types';
import { DataViewerDivider } from '../DataViewerDivider.component';
import { TreeManagerContext } from '../TreeManagerContext';
import { renderField } from './CommonModel.utils';

type ModelArrayFieldProps = {
	field: CommonSchemaSampledField<ArrayType>;
	path: string[];
	metadata?: FieldMetadata[];
};

function getArrayType(field: CommonSchemaSampledField<ArrayType>): ArrayType {
	if (Array.isArray(field.type)) {
		return field.type.find(type => type !== 'null' && type.type === 'array') as ArrayType;
	}
	return field.type;
}

export function ModelArrayField({ field, path, metadata }: ModelArrayFieldProps) {
	const { t } = useTranslation(I18N_DOMAIN_COMPONENTS);
	const { isPathExpanded, togglePath } = useContext(TreeManagerContext);
	const fieldPath = [...path, field.name];

	const isCurrentPathExpanded = isPathExpanded(fieldPath.join('.'));

	const arrayType = getArrayType(field);

	return (
		<StackVertical gap={0} noGrow>
			<StackHorizontal noGrow gap="XS" align="center">
				<DataViewerDivider path={path} />
				<StackHorizontal noGrow gap="XS" align="center">
					<ButtonIcon
						size="XS"
						icon={isCurrentPathExpanded ? 'chevron-down' : 'chevron-right'}
						onClick={() => togglePath(fieldPath.join('.'))}
					>
						{isCurrentPathExpanded
							? t('MODEL_VIEWER_COLLAPSE_NODE', 'Collapse')
							: t('MODEL_VIEWER_EXPAND_NODE', 'Expand')}
					</ButtonIcon>
					{field.name}
				</StackHorizontal>
			</StackHorizontal>
			{isCurrentPathExpanded
				? arrayType.items
						.filter(item => item !== 'null')
						.map(item => renderField(item as CommonSchemaSampledFieldType, fieldPath, metadata))
				: null}
		</StackVertical>
	);
}
