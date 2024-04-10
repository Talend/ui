import { useTranslation } from 'react-i18next';

import { QualityBar as QualityBarDS, type QualityCommonProps } from '@talend/design-system';

import I18N_DOMAIN_COMPONENTS from '../constants';

export type QualityBarProps = QualityCommonProps & {
	digits?: number;
	split?: boolean;
};

export const QualityBar = ({
	valid,
	invalid,
	empty,
	na,
	placeholder,
	digits = 1,
	split = false,
	...rest
}: QualityBarProps) => {
	const { t } = useTranslation(I18N_DOMAIN_COMPONENTS);

	console.log(QualityBarDS.getQualityPercentagesRounded);
	const percentages = QualityBarDS.getQualityPercentagesRounded(
		digits,
		invalid,
		empty,
		valid,
		na,
		placeholder,
	);
	return (
		<QualityBarDS
			valid={valid}
			invalid={invalid}
			empty={empty}
			na={na}
			placeholder={placeholder}
			tooltipLabels={{
				empty: t('EMPTY_VALUES', {
					defaultValue: '{{value}} empty value ({{percentage}}%)',
					defaultValue_other: '{{value}} empty valuesssss ({{percentage}}%)',
					count: empty,
					percentage: percentages.empty,
					value: QualityBarDS.formatNumber(empty),
				}),
				invalid: t('INVALID_VALUES', {
					defaultValue: '{{value}} invalid value ({{percentage}}%)',
					defaultValue_other: '{{value}} invalid values ({{percentage}}%)',
					count: invalid,
					percentage: percentages.invalid,
					value: QualityBarDS.formatNumber(invalid),
				}),
				na: t('NOT_APPLICABLE_VALUES', {
					defaultValue: '{{value}} not applicable value ({{percentage}}%)',
					defaultValue_other: '{{value}} not applicable values ({{percentage}}%)',
					count: na,
					percentages: percentages.na,
					value: QualityBarDS.formatNumber(na),
				}),
				valid: t('VALID_VALUES', {
					defaultValue: '{{value}} valid value ({{percentage}}%)',
					defaultValue_other: '{{value}} valid values ({{percentage}}%)',
					count: valid,
					percentage: percentages.valid,
					value: QualityBarDS.formatNumber(valid),
				}),
			}}
			{...rest}
		/>
	);
};
