import { Divider, StackVertical } from '@talend/design-system';
import { useTranslation } from 'react-i18next';
import I18N_DOMAIN_COMPONENTS from '../../constants';
import { CommonSchemaSampled, FieldMetadata } from '../CommonDataViewer.types';

import theme from './CommonModel.module.scss';
import { renderField } from './CommonModel.utils';

type CommonModelProps = {
	metadata?: FieldMetadata[];
	schema: CommonSchemaSampled;
};

export function CommonModel({ metadata, schema }: CommonModelProps) {
	const { t } = useTranslation(I18N_DOMAIN_COMPONENTS);
	const path: string[] = [];
	return (
		<div className={theme['tc-common-model']}>
			<header className={theme['tc-common-model_header']}>
				{t('MODEL_VIEWER_HEADER_TITLE', 'Data model')}
			</header>
			<Divider />
			<StackVertical gap={0} height="100%" justify="start" padding="S">
				{schema.fields.map(field => renderField(field, path, metadata))}
			</StackVertical>
		</div>
	);
}
