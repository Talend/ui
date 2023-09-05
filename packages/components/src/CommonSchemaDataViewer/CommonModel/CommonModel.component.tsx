import { Divider } from '@talend/design-system';
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
	return (
		<div className={theme['tc-common-model']}>
			<header className={theme['tc-common-model_header']}>
				{t('MODEL_VIEWER_HEADER_TITLE', 'Data model')}
			</header>
			<Divider />
			{schema.fields.map(renderField)}
		</div>
	);
}
