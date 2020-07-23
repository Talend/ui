import React, { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Action from '@talend/react-components/lib/Actions/Action';
import Icon from '@talend/react-components/lib/Icon';
import Slider, { SLIDER_MODE } from '@talend/react-components/lib/Slider';
import Text from '@talend/react-forms/lib/UIForm/fields/Text';
import { getTheme } from '@talend/react-components/lib/theme';
import RichLayout from '@talend/react-components/lib/RichTooltip/RichLayout';
import { getApplyDataFeature } from '../../../helpers/usage.helpers';

import cssModule from './BadgeSlider.scss';

const theme = getTheme(cssModule);

const getValidator = decimal => value =>
	value >= 0 && value <= 100 && !(!decimal && value % 1 !== 0);

const getSliderMode = ({ name }) => {
	switch (name) {
		case 'greaterThan':
			return SLIDER_MODE.GREATER_THAN;
		case 'equals':
			return SLIDER_MODE.EQUALS;
		default:
			return null;
	}
};

const BadgeSliderForm = ({
	id,
	onChange,
	onSubmit,
	value: initialValue = 0,
	feature,
	t,
	unit,
	icon,
	operator,
	decimal = false,
	min = 0,
	max = 100,
	step = 1,
	errorMessage = '',
}) => {
	const applyDataFeature = useMemo(() => getApplyDataFeature(feature), [feature]);
	const validator = useMemo(() => getValidator(decimal), [decimal]);
	const [value, setValue] = useState(initialValue);
	const [slider, setSlider] = useState(initialValue);
	const [editing, setEditing] = useState(false);

	useEffect(() => onChange(null, value), [onChange, value]);

	const isValid = validator(value);
	const schema = {
		autoFocus: true,
		disabled: false,
		type: 'number',
		schema: {
			minimum: min,
			maximum: max,
			step,
		},
	};
	console.log('[NC] op: ', operator);
	console.log('[NC] getSliderMode(operator): ', getSliderMode(operator));
	console.log('[NC] ----- ');
	return (
		<form className={theme('tc-badge-slider-form')} id={`${id}-slider`} onSubmit={onSubmit}>
			<RichLayout.Body id={`${id}-badge-body`} className={theme('tc-badge-slider-form-body')}>
				<div className={theme('tc-badge-slider-form-body-row')}>
					{icon && <Icon name={icon.name} className={theme('tc-badge-icon', icon.class)} />}
					{editing ? (
						<Text
							id={`${id}-input`}
							onChange={(_, { value: v }) => setValue(v)}
							onFinish={() => {
								setValue(value);
								setSlider(value);
								setEditing(false);
							}}
							schema={schema}
							value={value}
						/>
					) : (
						<span className={theme('tc-badge-value-unit')} onClick={() => setEditing(true)}>
							<span className="sr-only">
								{t('FACETED_SEARCH_VALUES_COUNT', {
									defaultValue: 'Edit directly',
								})}
							</span>
							{value}
							{unit}
						</span>
					)}
				</div>
				<Slider
					value={slider}
					captionTextStepNumber={2}
					mode={getSliderMode(operator)}
					onChange={v => {
						setValue(v);
						setSlider(v);
					}}
					min={min}
					max={max}
					step={step}
					hideTooltip
				/>
			</RichLayout.Body>
			<RichLayout.Footer id={`${id}-badge-footer`}>
				<span className={theme('tc-badge-slider-form-error')}>
					{!isValid ? errorMessage : null}
				</span>
				<Action
					type="submit"
					data-feature={applyDataFeature}
					label={t('APPLY', { defaultValue: 'Apply' })}
					bsStyle="info"
					disabled={!isValid}
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
	unit: PropTypes.string,
	decimal: PropTypes.bool,
	min: PropTypes.number,
	max: PropTypes.number,
	step: PropTypes.number,
	errorMessage: PropTypes.string,
	icon: PropTypes.shape({
		name: PropTypes.string,
		class: PropTypes.string,
	}),
};

// eslint-disable-next-line import/prefer-default-export
export { BadgeSliderForm };
