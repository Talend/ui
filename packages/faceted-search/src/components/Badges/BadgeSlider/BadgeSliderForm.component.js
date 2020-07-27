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

const getErrorMessage = (t, decimal, min, max, value) => {
	if (!decimal && value % 1 !== 0) {
		return t('FACETED_SEARCH_VALUE_SHOULD_BE_AN_INTEGER', {
			defaultValue: 'Please fill with an integer value',
		});
	}
	if (value < min || value > max) {
		return t('FACETED_SEARCH_VALUES_OUT_OF_RANGE', {
			defaultValue: 'The value must be between {{min}} and {{max}}',
			min,
			max,
		});
	}
	return null;
};

const BadgeSliderForm = ({
	id,
	onChange,
	onSubmit,
	feature,
	t,
	unit,
	icon,
	operator = {},
	decimal = false,
	min = 0,
	max = 100,
	step = 1,
	value: initialValue = min,
	defaultValue,
}) => {
	const applyDataFeature = useMemo(() => getApplyDataFeature(feature), [feature]);
	const [value, setValue] = useState(initialValue);
	const [slider, setSlider] = useState(initialValue);
	const [input, setInput] = useState(initialValue);
	const [editing, setEditing] = useState(false);
	const error = useMemo(() => getErrorMessage(t, decimal, min, max, input), [t, decimal, min, max, input]);


	useEffect(() => onChange(null, value), [onChange, value]);
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

	return (
		<form className={theme('tc-badge-slider-form')} id={`${id}-slider`} onSubmit={onSubmit}>
			<RichLayout.Body id={`${id}-badge-body`} className={theme('tc-badge-slider-form-body')}>
				<div className={theme('tc-badge-slider-form-body-row')}>
					{icon && <Icon name={icon.name} className={theme('tc-badge-icon', icon.class)} />}
					{editing ? (
						<Text
								id={`${id}-input`}
								onChange={(_, { value: v }) => {
									console.log('[NC]  v: ', v);
									console.log('[NC] error: ', error);
									console.log('[NC] v != null: ',  v != null);
									console.log('[NC] v != null && !error ? v : defaultValue: ', v != null && !error ? v : defaultValue);
									console.log('[NC] --- ');
									setInput(v);
									setValue(v != null && !error ? v : defaultValue);
								}}
								onFinish={() => {
									setInput(value);
									setValue(value);
									setSlider(value);
									setEditing(false);
								}}
								schema={schema}
								value={input}
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
						setInput(v);
						setSlider(v);
					}}
					min={min}
					max={max}
					step={step}
					hideTooltip
				/>
			</RichLayout.Body>
			<RichLayout.Footer id={`${id}-badge-footer`}>
				<span className={theme('tc-badge-slider-form-error')}>{error}</span>
				<Action
					type="submit"
					data-feature={applyDataFeature}
					label={t('APPLY', { defaultValue: 'Apply' })}
					bsStyle="info"
					disabled={!!error}
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
	defaultValue: PropTypes.number,
	icon: PropTypes.shape({
		name: PropTypes.string,
		class: PropTypes.string,
	}),
	operator: PropTypes.shape({
		name: PropTypes.string,
	}),
};

// eslint-disable-next-line import/prefer-default-export
export { BadgeSliderForm };
