import React, { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Action from '@talend/react-components/lib/Actions/Action';
import Icon from '@talend/react-components/lib/Icon';
import Slider from '@talend/react-components/lib/Slider';
import Text from '@talend/react-forms/lib/UIForm/fields/Text';
import { getTheme } from '@talend/react-components/lib/theme';
import RichLayout from '@talend/react-components/lib/RichTooltip/RichLayout';
import { getApplyDataFeature } from '../../../helpers/usage.helpers';

import cssModule from './BadgeSlider.scss';

const theme = getTheme(cssModule);

const BadgeSliderForm = ({ id, onChange, onSubmit, value: initialValue, feature, t }) => {
	const applyDataFeature = useMemo(() => getApplyDataFeature(feature), [feature]);
	const [value, setValue] = useState(initialValue);
	useEffect(() => onChange(null, value), [value]);

	const schema = {
		autoFocus: true,
		disabled: false,
		type: 'number',
		placeholder: t('TYPE_HERE', { defaultValue: 'Type here' }),
	};

	return (
		<form className={theme('tc-badge-slider-form')} id={`${id}-slider`} onSubmit={onSubmit}>
			<RichLayout.Body id={`${id}-badge-body`} className={theme('tc-badge-slider-form-body')}>
				<div className={theme('tc-badge-slider-form-body-row')}>
					<Icon name="talend-pie-charts" />
					<Text
						id={`${id}-input`}
						onChange={(_, { value }) => setValue(value)}
						onFinish={() => {}}
						schema={schema}
						value={value}
					/>
					<span className={theme('tc-badge-value-symbol')} >%</span>
				</div>
				<Slider value={value} captionTextStepNumber={2} onChange={setValue} />
			</RichLayout.Body>
			<RichLayout.Footer id={`${id}-badge-footer`}>
				<Action
					type="submit"
					data-feature={applyDataFeature}
					label={t('APPLY', { defaultValue: 'Apply' })}
					bsStyle="info"
				/>
			</RichLayout.Footer>
		</form>
	);
};

BadgeSliderForm.propTypes = {
	id: PropTypes.string.isRequired,
	onChange: PropTypes.func,
	onSubmit: PropTypes.func.isRequired,
	value: PropTypes.string,
	feature: PropTypes.string.isRequired,
	t: PropTypes.func.isRequired,
};

// eslint-disable-next-line import/prefer-default-export
export { BadgeSliderForm };
