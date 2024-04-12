import { ReactNode } from 'react';
import { Trans } from 'react-i18next';

import { RatioBar as RatioBarDS } from '@talend/design-system';

type RatioBarProps = {
	amount?: number;
	errors?: number;
	hideLabel?: boolean;
	notApplicableLabel?: ReactNode;
	total: number;
};

export const RatioBar = ({
	amount,
	total,
	errors = 0,
	hideLabel = false,
	notApplicableLabel,
}: RatioBarProps) => (
	<RatioBarDS
		amount={amount}
		errors={errors}
		hideLabel={hideLabel}
		notApplicableLabel={
			notApplicableLabel || (
				<Trans i18nKey="tui-components:NA">
					<strong>N</strong>/A
				</Trans>
			)
		}
		total={total}
	/>
);
