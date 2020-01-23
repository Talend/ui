import { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import { useValidationTrigger } from './useTriggers';
import schemaRules from '../internal/validation/schemaRules';

import { I18N_DOMAIN_FORMS } from '../../constants';

export default function useSchemaWidget(schema) {
	const { t } = useTranslation(I18N_DOMAIN_FORMS);
	const { customFormats, customValidation, language, ...rhf } = useFormContext();
	const validationTrigger = useValidationTrigger(schema);

	return useMemo(
		() =>
			schemaRules({ customFormats, customValidation, validationTrigger, language, rhf, schema, t }),
		[customFormats, customValidation, validationTrigger, language, rhf, schema, t],
	);
}
