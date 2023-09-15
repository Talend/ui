import { useTranslation } from 'react-i18next';

import { Divider, StackVertical } from '@talend/design-system';

import I18N_DOMAIN_COMPONENTS from '../../constants';
import { CommonSchemaSampled, FieldMetadata } from '../CommonDataViewer.types';
import { renderModelNode } from './DataModel.utils';

import theme from './DataModel.module.scss';

type DataModelProps = {
	metadata?: FieldMetadata[];
	schema: CommonSchemaSampled;
};

export function DataModel({ metadata, schema }: DataModelProps) {
	const { t } = useTranslation(I18N_DOMAIN_COMPONENTS);
	const path: string[] = [];
	return (
		<div className={theme['tc-common-model']}>
			<header className={theme['tc-common-model_header']}>
				{t('MODEL_VIEWER_HEADER_TITLE', 'Data model')}
			</header>
			<Divider />
			<div style={{ overflow: 'auto' }}>
				<StackVertical gap={0} height="100%" justify="start" padding="S">
					{schema.fields.map(field => renderModelNode(field, path, metadata))}
				</StackVertical>
			</div>
		</div>
	);
}
